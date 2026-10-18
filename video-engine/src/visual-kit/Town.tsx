import React from 'react';
import {C,clamp,out,progress,pop} from '../theme';

export const House: React.FC<{x:number;y:number;scale?:number;roof?:string}> = ({x,y,scale=1,roof=C.coral}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-55 22 L-3 -8 L69 34 L16 64Z" fill={C.deep} opacity=".12"/>
  <path d="M-46 -53 L0 -80 L46 -53 L46 27 L0 54 L-46 27Z" fill="#FFF9E9"/>
  <path d="M0 -26 L46 -53 L46 27 L0 54Z" fill="#CFD8BE"/>
  <path d="M-58 -51 L-7 -103 L49 -72 L0 -20Z" fill={roof}/>
  <path d="M-7 -103 L49 -72 L58 -42 L7 -72Z" fill="#BE604F"/>
  <path d="M-36 -25 L-19 -15 L-19 9 L-36 -1Z" fill={C.ocean}/>
  <path d="M-12 -11 L-2 -5 L-2 20 L-12 14Z" fill={C.ocean}/>
  <path d="M13 -12 L29 -21 L29 3 L13 12Z" fill={C.shade}/>
  <path d="M18 25 L32 17 L32 35 L18 43Z" fill={C.deep}/>
</g>;

const Tree:React.FC<{x:number;y:number;s?:number}> = ({x,y,s=1}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="32" rx="31" ry="10" fill={C.deep} opacity=".12"/>
  <path d="M0 10 V37" stroke="#796E52" strokeWidth="8"/>
  <path d="M0 -81 L-37 -16 L-24 -16 L-45 18 Q0 42 45 18 L24 -16 H37Z" fill="#5BA789"/>
  <path d="M0 -81 V31 Q26 29 45 18 L24 -16 H37Z" fill="#388A78"/>
</g>;

export const Town: React.FC<{t:number;x?:number;y?:number;s?:number}> = ({t,x=540,y=1040,s=1}) => {
  const level=.62-.33*progress(t,1,4.7);
  const homes=[[-40,-90],[110,-10],[260,76],[-176,20],[-10,118],[146,205]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy="312" rx="460" ry="60" fill={C.deep} opacity=".10"/>
    <path d="M-462 -2 L-130 -192 L462 150 L130 340 L-462 0 V42 L130 386 L462 194 V150 L130 340Z" fill="#B7C5A4"/>
    <path d="M-462 -2 L-130 -192 L462 150 L130 340Z" fill="#DFE2C6"/>
    <path d="M-380 -14 L-105 -172 L338 83 L64 242Z" fill="#CAD7B7"/>
    <path d="M-290 -95 L302 247 M-15 -163 L-346 30 M176 -52 L-158 141" stroke={C.cream} strokeWidth="35" fill="none"/>
    <path d="M-265 5 L-128 84 L-63 47 L288 249" fill="none" stroke={C.deep} strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" opacity=".13"/>
    <path d="M-265 -2 L-128 77 L-63 40 L288 242" fill="none" stroke={C.ocean} strokeWidth="14" strokeLinejoin="round" strokeLinecap="round"/>
    {[[-336,-8],[-262,190],[325,125],[-72,280],[351,188]].map(([a,b],i)=><Tree key={i} x={a} y={b} s={.7+(i%2)*.15}/>)}
    {/* Reservoir is an illustrative local stock, not a real city measurement. */}
    <g transform="translate(-278 -86)">
      <path d="M-65 20 L-79 133 M65 20 L79 133 M-65 20 L65 133 M65 20 L-65 133" stroke={C.deep} strokeWidth="10" fill="none"/>
      <ellipse cy="-117" rx="85" ry="32" fill={C.deep}/>
      <path d="M-85 -117 V-5 C-85 38 85 38 85 -5 V-117Z" fill="#D1E8D9"/>
      <defs><clipPath id="tower-fill"><path d="M-81 -116 V-6 C-81 31 81 31 81 -6 V-116Z"/></clipPath></defs>
      <g clipPath="url(#tower-fill)"><rect x="-85" y={-132*level} width="170" height="180" fill={C.ocean}/><ellipse cy={-132*level} rx="85" ry="24" fill={C.mint}/></g>
      <ellipse cy="-117" rx="85" ry="28" fill={C.light}/>
      <path d="M-54 -104 V-13" stroke={C.light} strokeWidth="8" opacity=".38"/>
      <path d="M-30 -148 L0 -172 L30 -148Z" fill={C.ocean}/>
    </g>
    {homes.map(([a,b],i)=>{
      const p=pop(t,.25+i*.19,.65);
      const unmet=progress(t,2.3+i*.14,3.0+i*.14);
      return <g key={i} transform={`translate(${a} ${b})`}>
        <g transform={`scale(${p})`}><House x={0} y={0} scale={.93}/></g>
        {unmet>0&&<g opacity={unmet} transform={`translate(8 ${-150-6*Math.sin(t*3+i)}) scale(.42)`}>
          <circle r="54" fill={C.coral}/><path d="M0 -26 V8" stroke={C.light} strokeWidth="10" strokeLinecap="round"/><circle cy="27" r="5" fill={C.light}/>
        </g>}
      </g>;
    })}
    {Array.from({length:7},(_,i)=>{
      const p=(t*.20+i/7)%1;
      const xx=-262+550*p;
      const yy=2+240*p;
      return <circle key={i} cx={xx} cy={yy} r={5} fill={C.light} opacity={clamp(1-t/9)*.9}/>;
    })}
  </g>;
};
