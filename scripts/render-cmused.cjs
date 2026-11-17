// Chrome renders the film in real time using a small local asset server.
const { spawn } = require('node:child_process');
const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs');
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = url === '/film' ? path.resolve('scripts/cmused-film.html') : path.resolve('public', '.' + url);
  if (url !== '/film' && !file.startsWith(path.resolve('public') + path.sep)) { res.writeHead(403).end(); return; }
  res.setHeader('Content-Type', url === '/film' ? 'text/html' : 'image/jpeg');
  fs.createReadStream(file).on('error', () => res.writeHead(404).end()).pipe(res);
}).listen(5173, '127.0.0.1');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
  '--remote-debugging-port=9223', `--user-data-dir=${path.resolve('.cmused-render-profile')}`, 'about:blank'
], { stdio: 'ignore' });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  let info;
  for (let i=0;i<50;i++) { try { info=await (await fetch('http://127.0.0.1:9223/json/version')).json(); break; } catch { await sleep(200); } }
  if (!info) throw Error('Chrome did not start');
  const ws=new WebSocket(info.webSocketDebuggerUrl); await new Promise(resolve => ws.addEventListener('open',resolve,{once:true}));
  let id=0; const pending=new Map();
  ws.addEventListener('message',event=>{const message=JSON.parse(event.data); if(message.id && pending.has(message.id)){pending.get(message.id)(message); pending.delete(message.id);}});
  const send=(method,params={})=>new Promise(resolve=>{const n=++id; pending.set(n,resolve); ws.send(JSON.stringify({id:n,method,params}));});
  await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:path.resolve('public')});
  await send('Target.createTarget',{url:'http://127.0.0.1:5173/film'});
  await sleep(55000);
  ws.close(); chrome.kill();
  server.close();
})().catch(error=>{console.error(error);chrome.kill();server.close();process.exitCode=1;});
