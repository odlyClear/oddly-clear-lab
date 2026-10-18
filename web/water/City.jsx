import React,{memo} from 'react';
import {House} from '../../video-engine/src/visual-kit/Town';
import {Cloud,TreatmentPlant} from '../../video-engine/src/visual-kit/WaterSystems';
import {C} from '../../video-engine/src/theme';

const Tree=({x,y,s=1})=><g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="32" rx="31" ry="10" fill={C.deep} opacity=".12"/>
  <path d="M0 10V37" stroke="#796E52" strokeWidth="8"/>
  <path d="M0-81L-37-16H-24L-45 18Q0 42 45 18L24-16H37Z" fill="#5BA789"/>
  <path d="M0-81V31Q26 29 45 18L24-16H37Z" fill="#388A78"/>
</g>;
const Ground=memo(()=><>
  <ellipse cy="315" rx="468" ry="67" fill="#01232C" opacity=".42"/>
  <path d="M-462-2L-130-192L462 150L130 340L-462 0V42L130 386L462 194V150L130 340Z" fill="#B7C5A4"/>
  <path d="M-462-2L-130-192L462 150L130 340Z" fill="#DFE2C6"/>
  <path d="M-380-14L-105-172L338 83L64 242Z" fill="#CAD7B7"/>
  <path d="M-290-95L302 247M-15-163L-346 30M176-52L-158 141" stroke={C.cream} strokeWidth="35" fill="none"/>
  {[[-336,-8],[-262,190],[325,125],[-72,280],[351,188]].map(([x,y],i)=><Tree key={i} x={x} y={y} s={.7+(i%2)*.15}/>)}
</>);
const homes=[[-40,-90],[110,-10],[260,76],[-176,20],[-10,118],[146,205],[120,123],[-178,111]];

export const City=memo(function City({stock,rain,demand,saving,desal,running,t,onRain,copy}){
  const critical=stock<20;const level=stock/100;
  const number=4+Math.round((demand-20)/120*4);
  return <svg className={'city-art'+(running?' moving':'')} viewBox="0 0 1100 850" role="group" aria-label={copy.experiment}>
    <defs>
      <radialGradient id="sky-glow"><stop stopColor="#137282" stopOpacity=".32"/><stop offset="1" stopColor="#073B43" stopOpacity="0"/></radialGradient>
      <pattern id="field-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r=".9" fill="#9ACBC4" opacity=".2"/></pattern>
      <clipPath id="live-tank"><path d="M-81-116V-6C-81 31 81 31 81-6V-116Z"/></clipPath>
    </defs>
    <rect width="1100" height="850" fill="url(#field-dots)"/>
    <ellipse cx="550" cy="400" rx="600" ry="480" fill="url(#sky-glow)"/>
    <g className="sea-lines" fill="none" stroke={C.ice} strokeWidth="3" opacity=".17">
      <path d="M50 733q40-20 80 0t80 0M816 797q45-20 90 0t90 0M920 218q35-18 70 0"/>
    </g>
    <g className="cloud-button" role="button" tabIndex="0" aria-label={copy.rainTap} onClick={onRain} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRain();}}}>
      <ellipse className="cloud-focus" cx="740" cy="235" rx="145" ry="100" fill="transparent"/>
      <g className="cloud-bob"><Cloud x={740} y={235} s={.8} dark={rain<30}/></g>
      <path d="M750 215v26m-13-13h26" fill="none" stroke={C.ocean} strokeWidth="4" strokeLinecap="round" opacity=".7"/>
    </g>
    <g className="rainfall" style={{opacity:Math.min(1,rain/65)}}>
      {Array.from({length:Math.max(2,Math.round(rain/4))},(_,i)=><path className="rain-streak" key={i} d={`M${635+(i*43)%215} 314l-8 21`} stroke={C.ice} strokeWidth="4" strokeLinecap="round" style={{animationDelay:`${-(i*.13)}s`,animationDuration:`${.65+(i%3)*.14}s`}}/>)}
    </g>
    {rain<30&&<g className="sun" transform="translate(960 245)">
      <circle r="31" fill={C.coral}/>
      {[0,1,2,3,4,5,6,7].map(i=><path key={i} d="M0-46V-58" stroke={C.coral} strokeWidth="4" strokeLinecap="round" transform={`rotate(${i*45})`}/>)}
    </g>}
    <g transform="translate(550 460)">
      <Ground/>
      <path d="M-265-2L-128 77L-63 40L288 242" fill="none" stroke={C.deep} strokeWidth="23" strokeLinejoin="round" strokeLinecap="round" opacity=".12"/>
      <path d="M-265-2L-128 77L-63 40L288 242" fill="none" stroke={critical?'#6A8880':C.ocean} strokeWidth="15" strokeLinejoin="round" strokeLinecap="round"/>
      {stock>0&&<path className="flow-dashes" d="M-265-2L-128 77L-63 40L288 242" fill="none" stroke={C.light} strokeWidth="5" strokeDasharray="1 69" strokeLinecap="round" style={{animationDuration:`${2.6-demand/110}s`}}/>}
      <g transform="translate(-278 -86)">
        <path d="M-65 20L-79 133M65 20L79 133M-65 20L65 133M65 20L-65 133" stroke="#052B32" strokeWidth="10" fill="none"/>
        <ellipse cy="-117" rx="86" ry="32" fill={C.deep}/>
        <path d="M-85-117V-5C-85 38 85 38 85-5V-117Z" fill="#CFE5D6"/>
        <g clipPath="url(#live-tank)">
          <rect x="-85" y={-132*level} width="170" height="180" fill={critical?C.coral:C.ocean}/>
          <ellipse className="water-surface" cy={-132*level} rx="85" ry="24" fill={critical?'#FFAA8F':C.mint}/>
          <path d={`M-80 ${-132*level+15}q40 12 80 0t80 0`} fill="none" stroke={C.light} strokeWidth="3" opacity=".3"/>
        </g>
        <ellipse cy="-117" rx="85" ry="28" fill={C.light}/>
        <path d="M-54-104V-13" stroke={C.light} strokeWidth="8" opacity=".4"/>
        <path d="M-30-148L0-172L30-148Z" fill={C.ocean}/>
        <g transform="translate(103 -70)"><rect x="0" y="-48" width="10" height="96" rx="5" fill={C.light} opacity=".45"/><rect x="0" y={48-96*level} width="10" height={96*level} rx="5" fill={critical?C.coral:C.mint}/></g>
      </g>
      {homes.slice(0,number).map(([x,y],i)=><g className="town-house" key={i} transform={`translate(${x} ${y})`}>
        <House x={0} y={0} scale={.93} roof={saving&&i%2===0?'#429D88':C.coral}/>
        {critical&&<g transform="translate(8 -140)"><circle r="21" fill={C.coral}/><path d="M0-10V3" stroke={C.light} strokeWidth="4" strokeLinecap="round"/><circle cy="10" r="2" fill={C.light}/></g>}
      </g>)}
    </g>
    <g opacity={desal?1:.22}>
      <path className={desal?'flow-dashes':''} d="M1024 700H1068V556L958 493" fill="none" stroke={desal?C.mint:'#709A94'} strokeWidth="9" strokeDasharray={desal?'36 5':undefined}/>
      <g transform="translate(0 0)"><TreatmentPlant x={928} y={560} s={.29} t={0} desal={desal}/></g>
    </g>
    {desal&&<path className="flow-dashes" d="M859 587L768 535L490 375L325 280" fill="none" stroke={C.mint} strokeWidth="5" strokeDasharray="1 14" strokeLinecap="round" opacity=".85"/>}
    <path d="M90 198l72 41" fill="none" stroke={C.mint} strokeWidth="4" opacity=".2"/>
  </svg>;
});
