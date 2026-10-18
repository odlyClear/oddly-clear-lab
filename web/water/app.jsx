import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Globe} from '../../video-engine/src/visual-kit/Globe';
import {City} from './City';
import {COPY} from './copy';
import {PRESETS,initial,sanitize,rates,advance,forecast,condition,clamp} from './model.mjs';

const StaticGlobe=React.memo(Globe);
const Icon=({name,size=20,...rest})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
  {name==='play'?<path d="M8 4l12 8-12 8z" fill="currentColor" stroke="none"/>:name==='pause'?<path d="M8 5v14M16 5v14" strokeWidth="4"/>:name==='reset'?<><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/></>:name==='film'?<><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/></>:name==='sound'?<><path d="M3 9h4l5-4v14l-5-4H3zM16 8q5 4 0 8M19 5q8 7 0 14"/></>:name==='mute'?<><path d="M3 9h4l5-4v14l-5-4H3zM17 9l5 6M22 9l-5 6"/></>:name==='share'?<><path d="M8 12l8-5M8 12l8 5"/><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/></>:name==='drop'?<path d="M12 2c-2 4-8 9-8 13a8 8 0 0 0 16 0c0-4-6-9-8-13z" fill="currentColor" stroke="none"/>:name==='close'?<path d="M5 5l14 14M19 5L5 19"/>:<path d="M5 12h14m-5-5 5 5-5 5"/>}
</svg>;

function Outlook({sim,settings,copy}){
  const net=rates(settings).net;
  const points=Array.from({length:61},(_,i)=>{
    const elapsed=i/2;return {x:10+elapsed/30*580,y:118-clamp(sim.stock+net*elapsed,0,100)/100*104};
  });
  const path=points.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ');
  const color=points.at(-1).y>100?'#C05B46':'#188DA6';
  return <svg className="outlook-chart" viewBox="0 0 600 145" role="img" aria-label={copy.projectionLabel}>
    {[14,66,118].map(y=><path key={y} d={`M10 ${y}H590`} stroke="#12393E" strokeOpacity=".1" strokeDasharray="2 6"/>)}
    <path d={path+' L590 118L10 118Z'} fill={color} fillOpacity=".08"/>
    <path d={path} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    <circle cx="10" cy={points[0].y} r="4" fill={color}/>
    <text x="10" y="141" fill="#536B64" fontSize="13" fontFamily="DM Sans, sans-serif">{copy.legendNow}</text>
    <text x="590" y="141" textAnchor="end" fill="#536B64" fontSize="13" fontFamily="DM Sans, sans-serif">+30 {copy.forecastDay}</text>
  </svg>;
}

function App(){
  const query=useMemo(()=>new URLSearchParams(location.search),[]);
  const lang='en';const c=COPY.en;
  const [settings,setSettings]=useState(()=>sanitize(Object.fromEntries(query)));
  const [sim,setSim]=useState(initial);const [running,setRunning]=useState(false);const [speed,setSpeed]=useState(1);
  const [preset,setPreset]=useState(()=>Object.keys(PRESETS).find(key=>Object.entries(PRESETS[key]).every(([k,v])=>settings[k]===v))||'custom');const [sound,setSound]=useState(false);const [shared,setShared]=useState(false);const [fallback,setFallback]=useState('');
  const modal=useRef(null),video=useRef(null),audio=useRef(null);
  const r=rates(settings),f=forecast(sim,settings),status=condition(sim,settings);
  const n=(v,digits=1)=>v.toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits});
  const tone=(frequency=650)=>{
    if(!sound)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return;
      const ctx=audio.current||(audio.current=new Audio());ctx.resume();
      const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;
      osc.type='sine';osc.frequency.setValueAtTime(frequency,now);osc.frequency.exponentialRampToValueAtTime(frequency*.55,now+.16);
      gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.045,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+.2);
      osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+.22);
    }catch{}
  };
  useEffect(()=>{
    document.documentElement.lang=lang;document.title='Oddly Clear · Water Lab';
    const p=new URLSearchParams({lang,rain:String(settings.rain),demand:String(settings.demand),saving:settings.saving?'1':'0',desal:settings.desal?'1':'0'});
    history.replaceState(null,'',location.pathname+'?'+p.toString());setShared(false);
  },[lang,settings]);
  useEffect(()=>{
    if(!running)return;
    let frame,last=0;
    const tick=now=>{
      if(document.hidden){last=now;frame=requestAnimationFrame(tick);return;}
      if(!last)last=now;
      const delta=now-last;
      if(delta>=80){last=now;setSim(s=>advance(s,settings,Math.min(delta/1000,.25)*speed));}
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[running,speed,settings]);
  useEffect(()=>{
    if(running&&(sim.day>=30||(sim.stock<=.0001&&r.net<0))){setRunning(false);tone(sim.stock<=0?260:900);}
  },[sim.day,sim.stock,running,r.net]);
  const change=(key,value)=>{setSettings(s=>({...s,[key]:value}));setPreset('custom');};
  const reset=()=>{setRunning(false);setSim(initial());setSettings({...PRESETS.balanced});setPreset('balanced');setSpeed(1);tone(450);};
  const choose=p=>{setSim(initial());setSettings({...PRESETS[p]});setPreset(p);setRunning(true);tone(700);};
  const togglePlay=()=>{if(sim.day>=30){setSim(initial());}setRunning(x=>!x);tone(550);};
  const bringRain=()=>{change('rain',100);if(sim.day>=30)setSim(initial());setRunning(true);tone(900);};
  const openFilm=()=>{setRunning(false);modal.current.showModal();};
  const copyLink=async()=>{
    try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(location.href);setShared(true);setFallback('');}
    catch{setFallback(location.href);}
  };
  const slider=(key,label,help,min,max,left,right)=><div className="slider-field">
    <div className="slider-heading"><label htmlFor={key}>{label}</label><output htmlFor={key}>{settings[key]}<span>%</span></output></div>
    <p>{help}</p>
    <input id={key} type="range" min={min} max={max} step="1" value={settings[key]} aria-label={label} aria-valuetext={`${settings[key]}%`} onInput={e=>change(key,Number(e.currentTarget.value))} style={{'--fill':`${(settings[key]-min)/(max-min)*100}%`}}/>
    <div className="range-ends"><span>{left}</span><span>{right}</span></div>
  </div>;
  return <>
    <header className="masthead"><a className="brand" href="../" aria-label="Oddly Clear home"><span className="brand-mark"><Icon name="drop" size={17}/></span>{c.lab}<span className="brand-lab"> / LAB</span></a>
      <a className="all-episodes" href="../">All episodes <Icon name="arrow" size={16}/></a>
    </header>
    <main id="top">
      <section className="intro"><div><p className="eyebrow">{c.edition}</p><h1>{c.titleA}<br/><span>{c.titleB}</span></h1><p className="intro-copy">{c.intro}</p></div><button className="watch-link" onClick={openFilm}><span className="watch-icon"><Icon name="play" size={14}/></span>{c.watch}<Icon name="arrow" size={16}/></button></section>
      <section className="experiment" id="simulation" aria-label={c.experiment} data-stock={sim.stock.toFixed(5)} data-day={sim.day.toFixed(5)} data-running={running} data-status={status}>
        <div className="world-column">
          <div className={'world '+status}>
            <div className="world-top"><div className="stock-number"><span className="tiny-label">{c.stock}</span><strong>{Math.round(sim.stock)}<span>%</span></strong></div><div className="day-marker"><span className="tiny-label">{c.day}</span><strong>{String(Math.min(30,Math.floor(sim.day)+1)).padStart(2,'0')}<span> / 30</span></strong><div className="day-track"><span style={{width:`${sim.day/30*100}%`}}/></div></div></div>
            <City stock={sim.stock} rain={settings.rain} demand={settings.demand} saving={settings.saving} desal={settings.desal} running={running} t={sim.day} onRain={bringRain} copy={c}/>
            <div className="world-bottom"><span className="live-label"><i className={running?'live':''}/>{running?'EXPERIMENT LIVE':'YOUR MOVE'}</span><button className="sound-button" onClick={()=>setSound(x=>!x)} aria-label={sound?c.soundOn:c.soundOff} aria-pressed={sound}><Icon name={sound?'sound':'mute'} size={18}/></button></div>
          </div>
          <div className="transport"><button className="play-button" onClick={togglePlay} aria-label={running?c.pause:sim.day>0?c.resume:c.play}><Icon name={running?'pause':'play'} size={17}/><span>{running?c.pause:sim.day>0&&sim.day<30?c.resume:c.play}</span></button><div className="speed-group" aria-label={c.speed}>{[1,2,4].map(v=><button key={v} aria-label={`${c.speed} ${v}x`} aria-pressed={speed===v} className={speed===v?'active':''} onClick={()=>{setSpeed(v);tone(480+v*100);}}>{v}×</button>)}</div><button className="reset-button" aria-label={c.reset} title={c.reset} onClick={reset}><Icon name="reset"/></button></div>
          <div className="scenario-row" aria-label={c.presets}>{['balanced','drought','growth','rescue'].map(p=><button key={p} className={preset===p?'active':''} aria-pressed={preset===p} data-preset={p} onClick={()=>choose(p)}>{c[p]}</button>)}</div>
          <p className="world-caption">{c.mobileHint} <span>{c.modelNote}</span></p>
        </div>
        <div className="control-column" aria-label={c.controls}>
          <div className="controls-title"><span className="eyebrow">{c.lever}</span><span className="control-no">01—04</span></div>
          {slider('rain',c.rain,c.rainHelp,0,100,c.low,c.high)}
          {slider('demand',c.demand,c.demandHelp,20,140,c.quiet,c.busy)}
          <div className="switches">{[['saving',c.saving,c.savingSub],['desal',c.desal,c.desalSub]].map(([key,title,description])=><button key={key} className="switch-row" role="switch" aria-checked={settings[key]} aria-label={title} onClick={()=>{change(key,!settings[key]);tone(key==='desal'?820:600);}}><span className="switch-copy"><strong>{title}</strong><span>{description}</span></span><span className={'switch '+(settings[key]?'on':'')}><i/></span></button>)}</div>
          <div className="daily-balance"><span className="eyebrow">{c.daily}</span><div className="balance-numbers"><div><span>{c.incoming}</span><strong className="inflow">+{n(r.inflow)}</strong></div><span className="balance-slash">/</span><div><span>{c.outgoing}</span><strong className="outflow">−{n(r.demand)}</strong></div></div><div className="balance-footer"><span>{c.units}</span><b className={r.net<-.05?'negative':'positive'}>{r.net>.05?c.balancePositive:r.net<-.05?c.balanceNegative:c.balanceZero}</b></div></div>
        </div>
      </section>
      <section className={'outcome '+status} aria-live="polite" aria-atomic="true"><span className="outcome-dot"/><div><h2>{c[status]}</h2><p>{c[status+'Sub']}</p></div><span className="outcome-mark">{status==='complete'?'30/30':r.net<0?'−':'+'}</span></section>
      <section className="forecast"><div className="forecast-copy"><p className="eyebrow">{c.outlook}</p><h2>{Number.isFinite(f.daysToEmpty)&&f.daysToEmpty<30-sim.day?<>{c.forecastDry} <em>{n(f.daysToEmpty)}</em> {c.forecastDay}.</>:c.forecastSafe}</h2><p>{c.projection}</p></div><Outlook sim={sim} settings={settings} copy={c}/></section>
      <section className="learn"><div className="learn-art"><svg viewBox="0 0 600 600" aria-hidden="true"><StaticGlobe t={0} r={230} x={300} y={275} id="lab-globe"/></svg><span className="learn-orbit"/></div><div className="learn-copy"><p className="eyebrow">{c.edition}</p><h2>{c.about}</h2><p>{c.aboutText}</p><button className="text-button" onClick={openFilm}><Icon name="film" size={19}/>{c.watch}<Icon name="arrow" size={17}/></button></div></section>
      <section className="notes"><details><summary>{c.assumptions}<span>+</span></summary><p>{c.modelDetails}</p><div className="accounting"><span>{c.overflow}: {n(sim.spill)}</span><span>{c.unmet}: {n(sim.unmet)}</span></div></details><div className="source-list"><h3>{c.sourceTitle}</h3><a href="https://www.fao.org/land-water/water/water-scarcity/en/" target="_blank" rel="noreferrer">FAO<span>{c.sourceFa}</span><Icon name="arrow" size={16}/></a><a href="https://www.usgs.gov/water-science-school/science/where-earths-water" target="_blank" rel="noreferrer">USGS<span>{c.sourceUs}</span><Icon name="arrow" size={16}/></a><a href="https://www.usgs.gov/water-science-school/science/desalination" target="_blank" rel="noreferrer">USGS<span>{c.sourceDe}</span><Icon name="arrow" size={16}/></a><a href="https://www.cdc.gov/drinking-water/about/how-water-treatment-works.html" target="_blank" rel="noreferrer">CDC<span>{c.sourceCd}</span><Icon name="arrow" size={16}/></a></div></section>
      <footer><div><span className="footer-title">{c.end}</span><span className="footer-brand">ODDLY CLEAR / WATER LAB</span></div><button className="share-button" onClick={copyLink}><Icon name="share" size={17}/>{shared?c.copied:c.share}</button>{fallback&&<label className="share-fallback">{c.copyFallback}<input value={fallback} readOnly onFocus={e=>e.target.select()}/></label>}</footer>
    </main>
    <dialog ref={modal} className="film-dialog" aria-label={c.watch} onClick={e=>{if(e.target===modal.current)modal.current.close();}} onClose={()=>video.current?.pause()}><div className="film-shell"><div className="film-title"><span>WATER PLANET / 55s</span><button aria-label={c.close} onClick={()=>modal.current.close()}><Icon name="close"/></button></div><video ref={video} controls playsInline preload="none" poster="__POSTER_URL__" src="__VIDEO_URL__"/><a href="__VIDEO_URL__" download>{c.download}</a></div></dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
