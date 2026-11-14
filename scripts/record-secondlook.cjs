// Usage: node scripts/record-secondlook.cjs <path-to-playwright>
const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const output = path.resolve('public');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1,
    recordVideo: { dir: path.join(output, 'secondlook-recording'), size: { width: 1440, height: 1000 } },
  });
  const page = await context.newPage();
  await page.goto('https://lizhhsu.github.io/SecondLook/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    html { scroll-behavior: smooth !important; }
    #demo-caption { position:fixed; bottom:22px; left:50%; transform:translateX(-50%); z-index:99999;
      width:960px; padding:18px 26px; border-radius:16px; background:rgba(17,24,39,.96);
      box-shadow:0 8px 40px #0002; color:white; font:500 21px/1.4 Inter,Arial,sans-serif;
      display:flex; align-items:center; gap:22px; pointer-events:none; }
    #demo-caption small { color:#79b8ff; font-size:11px; letter-spacing:2px; white-space:nowrap; }
    #demo-title { position:fixed; inset:0; z-index:100000; background:#f8fafc; display:flex;
      flex-direction:column; justify-content:center; align-items:center; font-family:Inter,Arial,sans-serif;
      transition:opacity .7s; color:#17212f; }
    #demo-title b { font-size:92px; letter-spacing:-5px; } #demo-title p { font-size:26px; color:#64748b; }
    #demo-title small { margin-top:48px; font-size:12px; text-transform:uppercase; letter-spacing:3px; color:#0075ed; }
  ` });
  const caption = async (step, text) => page.evaluate(({step,text}) => {
    let el = document.getElementById('demo-caption');
    if (!el) { el = document.createElement('div'); el.id = 'demo-caption'; document.body.append(el); }
    el.replaceChildren(); const label = document.createElement('small'); label.textContent=step;
    const copy=document.createElement('span'); copy.textContent=text; el.append(label,copy);
  }, {step,text});
  const pause = ms => page.waitForTimeout(ms);
  await page.evaluate(() => {
    const el=document.createElement('div'); el.id='demo-title';
    el.innerHTML='<b>SecondLook<span style="color:#0075ed">.</span></b><p>A second set of eyes for your mathematical reasoning.</p><small>Product walkthrough &middot; Interactive examples</small>';
    document.body.append(el);
  });
  await pause(3200);
  await page.evaluate(() => document.getElementById('demo-title').style.opacity='0');
  await pause(750);
  await page.evaluate(() => document.getElementById('demo-title').remove());
  await caption('01 / THE IDEA', 'Catch the step where the reasoning starts to break down.');
  await pause(3500);
  await page.evaluate(() => window.scrollTo({top:380,behavior:'smooth'}));
  await pause(1200);
  await caption('02 / NOTICE', 'A reasoning mismatch brings attention back to step 03.');
  await pause(5000);
  await caption('03 / REFLECT', 'A focused question helps the student revisit the mistake.');
  await pause(5500);
  await page.getByRole('button',{name:'Simulate student correction'}).click();
  await caption('04 / CORRECT', 'The student corrects the expression. The example verifies the reasoning.');
  await pause(5000);
  await page.getByRole('button',{name:'AP Physics',exact:true}).click();
  await caption('05 / EXPLORE', 'Explore the same guided review flow in another subject.');
  await pause(4000);
  await page.getByRole('button',{name:'Simulate student correction'}).click();
  await pause(2500);
  await page.locator('#how-it-works').evaluate(el => el.scrollIntoView({behavior:'smooth',block:'start'}));
  await pause(1200);
  await page.getByRole('button',{name:/Work through it/}).click();
  await caption('06 / UNDERSTAND', 'Work through the problem. Pause, reflect, and make the connection.');
  await pause(3000);
  await page.getByRole('button',{name:/Pause at the right step/}).click();
  await pause(3500);
  await page.getByRole('button',{name:/Make the connection/}).click();
  await pause(4500);
  await page.evaluate(() => {
    document.getElementById('demo-caption').remove();
    const el=document.createElement('div');el.id='demo-title';
    el.innerHTML='<b>Your thinking.<br><span style="color:#0075ed">A second look.</span></b><p>lizhhsu.github.io/SecondLook/</p><small>Interactive product demonstration</small>';
    document.body.append(el);
  });
  await pause(3500);
  const video=page.video();
  await context.close();
  await video.saveAs(path.join(output,'secondlook-demo.webm'));
  await browser.close();
  await fs.rm(path.join(output,'secondlook-recording'),{recursive:true,force:true});
  console.log('Saved public/secondlook-demo.webm');
})().catch(error=>{console.error(error);process.exit(1);});


