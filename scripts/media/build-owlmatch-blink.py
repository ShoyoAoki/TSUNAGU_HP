"""Canvas-only eye animation of the unchanged approved OwlMatch symbol; ffmpeg encodes 6s MP4."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import base64, subprocess, tempfile
root=Path(__file__).resolve().parents[2]
source=root/'public/videos/owlmatch-blink-source.png'
with tempfile.TemporaryDirectory(prefix='owlmatch-blink-') as temp, sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':512,'height':272})
 page.set_content('<canvas id="c" width="512" height="272"></canvas>')
 page.evaluate('''async src=>{window.logo=new Image();logo.src=src;await logo.decode();window.render=(frame)=>{const ctx=document.querySelector('canvas').getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,512,272);ctx.drawImage(logo,0,0);let amount=1;const t=frame/30;if(t>=2.8&&t<=3.066667)amount=Math.abs((t-2.933333)/.133333);amount=Math.min(1,Math.max(.025,amount));if(amount<1){for(const [x,y,r] of [[141,133,36],[388,134,36]]){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle='white';ctx.fillRect(x-r,y-r,r*2,r*2);ctx.drawImage(logo,x-r,y-r,r*2,r*2,x-r,y-r*amount,r*2,r*2*amount);if(amount<.15){ctx.strokeStyle="#00182b";ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x-25,y);ctx.quadraticCurveTo(x,y+8,x+25,y);ctx.stroke();}ctx.restore();}}return document.querySelector('canvas').toDataURL('image/png').split(',')[1];};}''','data:image/png;base64,'+base64.b64encode(source.read_bytes()).decode())
 for i in range(180):
  data=base64.b64decode(page.evaluate('(i)=>render(i)',i));Path(temp,f'{i:04}.png').write_bytes(data)
  if i==0:(root/'public/videos/owlmatch-blink-poster.png').write_bytes(data)
 b.close()
 subprocess.run(['ffmpeg','-y','-framerate','30','-i',temp+'/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart','-an',str(root/'public/videos/owlmatch-blink.mp4')],check=True)
