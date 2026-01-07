let audioCtx=null;
let droneOsc=null;
let droneGain=null;
const getAudioContext=()=>{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx};
const playAlarmBeep=()=>{const ctx=getAudioContext();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type='square';osc.frequency.setValueAtTime(800,ctx.currentTime);osc.frequency.exponentialRampToValueAtTime(400,ctx.currentTime+0.1);gain.gain.setValueAtTime(0.3,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.1);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.1)};
const playStaticNoise=()=>{const ctx=getAudioContext();const bufferSize=ctx.sampleRate*0.1;const buffer=ctx.createBuffer(1,bufferSize,ctx.sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<bufferSize;i++)data[i]=Math.random()*2-1;const source=ctx.createBufferSource();const gain=ctx.createGain();source.buffer=buffer;source.connect(gain);gain.connect(ctx.destination);gain.gain.setValueAtTime(0.2,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.1);source.start();source.stop(ctx.currentTime+0.1)};
const playSiren=()=>{const ctx=getAudioContext();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type='sawtooth';osc.frequency.setValueAtTime(300,ctx.currentTime);osc.frequency.linearRampToValueAtTime(600,ctx.currentTime+0.15);osc.frequency.linearRampToValueAtTime(300,ctx.currentTime+0.3);gain.gain.setValueAtTime(0.2,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.3)};
const playWarningTone=()=>{const ctx=getAudioContext();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type='sine';osc.frequency.setValueAtTime(150,ctx.currentTime);gain.gain.setValueAtTime(0.4,ctx.currentTime);for(let i=0;i<4;i++){gain.gain.setValueAtTime(0.4,ctx.currentTime+i*0.1);gain.gain.setValueAtTime(0.1,ctx.currentTime+i*0.1+0.05)}gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.5);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.5)};
const startBackgroundDrone=()=>{const ctx=getAudioContext();droneOsc=ctx.createOscillator();droneGain=ctx.createGain();const lfo=ctx.createOscillator();const lfoGain=ctx.createGain();droneOsc.type='sawtooth';droneOsc.frequency.setValueAtTime(55,ctx.currentTime);lfo.type='sine';lfo.frequency.setValueAtTime(0.5,ctx.currentTime);lfoGain.gain.setValueAtTime(10,ctx.currentTime);lfo.connect(lfoGain);lfoGain.connect(droneOsc.frequency);droneOsc.connect(droneGain);droneGain.connect(ctx.destination);droneGain.gain.setValueAtTime(0.15,ctx.currentTime);droneOsc.start();lfo.start()};
const playRandomScarySound=()=>{const sounds=[playAlarmBeep,playStaticNoise,playSiren,playWarningTone];sounds[Math.floor(Math.random()*sounds.length)]()};
const scarySentences=[
{text:"Your personal files are being encrypted...",icon:'<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>'},
{text:"Uploading browser history to public server...",icon:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>'},
{text:"Webcam access granted to remote user...",icon:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>'},
{text:"Critical system failure detected...",icon:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'},
{text:"Firewall disabled. Network exposed...",icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m14.5 9-5 5"/><path d="m9.5 9 5 5"/>'},
{text:"Installing rootkit... 87% complete",icon:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'},
{text:"Password database compromised...",icon:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'},
{text:"Remote shell connection established...",icon:'<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>'},
{text:"Keylogger activated. Recording input...",icon:'<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>'},
{text:"System32 files corrupted...",icon:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>'},
{text:"Banking credentials extracted...",icon:'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>'},
{text:"Identity theft in progress...",icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>'}
];
let windowId=0;
let chaosInterval;
let bgFlashInterval;
let soundInterval;
const createWindow=(x,y)=>{const id=++windowId;const msg=scarySentences[Math.floor(Math.random()*scarySentences.length)];const win=document.createElement('div');win.className='fake-window';win.id='window-'+id;win.style.left=x+'px';win.style.top=y+'px';win.style.zIndex=100+id;
win.innerHTML=`<div class="fake-window-header"><div class="window-controls"><span class="window-btn red" onclick="shakeWindow(${id})"></span><span class="window-btn yellow"></span><span class="window-btn green"></span></div><div class="fake-address-bar"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/></svg><span>system://alert/critical-${id}</span></div></div><div class="fake-window-content"><div class="alert-box"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${msg.icon}</svg><p>${msg.text}</p></div><div class="error-box" style="display:none"><p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>ERROR: Cannot terminate process</p></div></div>`;
let isDragging=false,startX,startY,origX,origY;
const header=win.querySelector('.fake-window-header');
header.onmousedown=(e)=>{if(e.target.classList.contains('window-btn'))return;isDragging=true;startX=e.clientX;startY=e.clientY;origX=win.offsetLeft;origY=win.offsetTop;win.style.zIndex=1000+windowId};
document.addEventListener('mousemove',(e)=>{if(!isDragging)return;win.style.left=(origX+e.clientX-startX)+'px';win.style.top=(origY+e.clientY-startY)+'px'});
document.addEventListener('mouseup',()=>{isDragging=false});
document.getElementById('windows-container').appendChild(win);playRandomScarySound()};
const shakeWindow=(id)=>{const win=document.getElementById('window-'+id);if(!win)return;win.classList.add('shake');win.querySelector('.error-box').style.display='block';playAlarmBeep();setTimeout(()=>win.classList.remove('shake'),300)};
const startChaos=()=>{document.getElementById('gift-screen').classList.add('hidden');document.getElementById('countdown-screen').classList.add('hidden');document.getElementById('chaos-screen').classList.remove('hidden');
startBackgroundDrone();
const colors=['#1a0000','#000','#0a0000','#000a00','#00000a'];
bgFlashInterval=setInterval(()=>{document.getElementById('chaos-bg').style.background=colors[Math.floor(Math.random()*colors.length)]},80);
chaosInterval=setInterval(()=>{const x=Math.random()*(window.innerWidth-420);const y=Math.random()*(window.innerHeight-300);createWindow(x,y)},20);
soundInterval=setInterval(playRandomScarySound,200);
const bars=document.getElementById('glitch-bars');for(let i=0;i<10;i++){const bar=document.createElement('div');bar.className='glitch-bar';bar.style.top=Math.random()*100+'%';bar.style.animationDelay=Math.random()+'s';bars.appendChild(bar)}};
let countdownValue=3;
const startCountdown=()=>{document.getElementById('gift-screen').classList.add('hidden');document.getElementById('countdown-screen').classList.remove('hidden');document.documentElement.requestFullscreen?.().catch(()=>{});
countdownValue=3;
const numEl=document.getElementById('countdown-number');
const alertEl=document.getElementById('countdown-alert');
let glitchOn=false;
const glitchInterval=setInterval(()=>{glitchOn=!glitchOn;alertEl.style.opacity=glitchOn?'0.3':'1';numEl.classList.toggle('glitch',glitchOn)},50);
const countInterval=setInterval(()=>{countdownValue--;if(countdownValue<=0){clearInterval(countInterval);clearInterval(glitchInterval);startChaos()}else{numEl.textContent=countdownValue}},1000)};
