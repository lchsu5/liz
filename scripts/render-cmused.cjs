// Usage: node scripts/render-cmused.cjs [path-to-playwright]
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { chromium } = require(process.argv[2] || 'playwright');

const root = path.join(__dirname, '..');
const sourceCommit = '9f0f1efd954c6f3739db916ab061e33bab911913';
const scenes = [
  { name: 'Log in', width: 1280, height: 830, end: 2.5, actions: [[2.2, 300, 498]] },
  { name: 'Onboarding (buyer-seller)', width: 1280, height: 830, end: 5.6, actions: [[3.6, 948, 532], [5.3, 640, 708]] },
  { name: 'Onboarding (categories)', width: 1280, height: 830, end: 9.5, actions: [[6.4, 290, 410], [7.2, 640, 410], [8, 940, 410], [9.2, 640, 689]] },
  { name: 'Onboarding (Media)', width: 1280, height: 830, end: 11.5, actions: [[11.2, 640, 696]] },
  { name: 'Onboarding (policy)', width: 1280, height: 830, end: 13.7, actions: [[13.4, 418, 622]] },
  { name: 'Discovery feed', width: 1600, height: 980, end: 16.7, actions: [[15.0, 493, 50]] },
  { name: 'Search Result - no filters', width: 1318, height: 820, end: 19.3, actions: [[19.0, 208, 471]] },
  { name: 'Product Detail-1', width: 1600, height: 1000, end: 22, actions: [[21.7, 1055, 649]] },
  { name: 'Contact Seller Pop-up', width: 1600, height: 1250, end: 26, actions: [[23.1, 730, 980]] },
];

async function render() {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.setContent('<body style="margin:0"><canvas width="1280" height="720"></canvas>');
    const frames = scenes.map(scene => {
      const image = execFileSync('git', ['show', `${sourceCommit}:public/cmused/${scene.name}.jpg`], { cwd: root });
      return { ...scene, src: `data:image/jpeg;base64,${image.toString('base64')}` };
    });
    const [video] = await Promise.all([
      page.waitForEvent('download', { timeout: 50000 }),
      page.evaluate(async frames => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d', { alpha: false });
        const width = canvas.width;
        const height = canvas.height;
        const startPoint = { x: 460, y: 390 };
        const shots = await Promise.all(frames.map(async frame => {
          const image = new Image();
          image.src = frame.src;
          await image.decode();
          const scale = Math.min(width / frame.width, height / frame.height);
          const left = (width - frame.width * scale) / 2;
          const top = (height - frame.height * scale) / 2;
          return { ...frame, image, scale, left, top };
        }));
        const clicks = shots.flatMap(shot => shot.actions.map(([time, x, y]) => ({
          time, x: shot.left + x * shot.scale, y: shot.top + y * shot.scale,
        })));
        const path = [{ time: 0, ...startPoint }, ...clicks, { time: 26, ...startPoint }];

        function draw(time) {
          const shot = shots.find(item => time < item.end) ?? shots.at(-1);
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(shot.image, 0, 0, shot.width, shot.height, shot.left, shot.top,
            shot.width * shot.scale, shot.height * shot.scale);

          if (shot.name === 'Discovery feed' && time >= 15.25) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(shot.left + 418 * shot.scale, 31 * shot.scale, 140 * shot.scale, 38 * shot.scale);
            ctx.fillStyle = '#242424';
            ctx.font = '16px Arial';
            ctx.fillText('big sofa'.slice(0, Math.ceil((time - 15.25) * 10)), shot.left + 425 * shot.scale, 55 * shot.scale);
          }

          const next = Math.max(1, path.findIndex(point => time <= point.time));
          const from = path[next - 1];
          const to = path[next];
          const movementStart = Math.max(from.time + 0.28, to.time - 0.85);
          const progress = Math.max(0, Math.min(1, (time - movementStart) / (to.time - movementStart)));
          const eased = progress * progress * (3 - 2 * progress);
          const x = from.x + (to.x - from.x) * eased;
          const y = from.y + (to.y - from.y) * eased;
          const click = clicks.find(point => time >= point.time && time < point.time + 0.42);
          if (click) {
            const ripple = (time - click.time) / 0.42;
            ctx.beginPath();
            ctx.arc(click.x, click.y, 5 + 14 * ripple, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(194, 10, 49, ${1 - ripple})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.save();
          ctx.translate(x, y);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, 24);
          ctx.lineTo(7, 18);
          ctx.lineTo(12, 28);
          ctx.lineTo(16, 26);
          ctx.lineTo(11, 16);
          ctx.lineTo(20, 16);
          ctx.closePath();
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.strokeStyle = '#222';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          const fade = Math.max(0, 1 - time / 0.32, (time - 25.3) / 0.7);
          if (fade > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
            ctx.fillRect(0, 0, width, height);
          }
        }

        await new Promise((resolve, reject) => {
          const stream = canvas.captureStream(30);
          const recorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 1800000,
          });
          const chunks = [];
          recorder.ondataavailable = event => chunks.push(event.data);
          recorder.onerror = event => reject(event.error);
          recorder.onstop = () => {
            stream.getTracks().forEach(track => track.stop());
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
            link.download = 'cmused-journey-v4.webm';
            link.click();
            resolve();
          };
          draw(0);
          recorder.start();
          const start = performance.now();
          function frame(now) {
            const time = Math.min(26, (now - start) / 1000);
            draw(time);
            if (time < 26) requestAnimationFrame(frame);
            else recorder.stop();
          }
          requestAnimationFrame(frame);
        });
      }, frames),
    ]);
    await video.saveAs(path.join(root, 'public', 'cmused-journey-v4.webm'));
  } finally {
    await browser.close();
  }
}

render().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
