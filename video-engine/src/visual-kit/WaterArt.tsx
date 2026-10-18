import React from 'react';
import {C} from '../theme';

export const dropletPath='M0,-190 C-28,-142 -136,-39 -136,49 C-136,131 -76,190 0,190 C76,190 136,131 136,49 C136,-39 28,-142 0,-190 Z';

export const Droplet: React.FC<{x:number;y:number;scale?:number;fill?:string;id?:string;shine?:boolean}> = ({x,y,scale=1,fill=C.ocean,id='drop',shine=true}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={fill}/><stop offset="1" stopColor={C.deep}/></linearGradient></defs>
  <path d={dropletPath} fill={`url(#${id}-fill)`}/>
  {shine&&<path d="M-40,-48 C-84,5 -96,43 -78,86" fill="none" stroke={C.light} strokeWidth="11" strokeLinecap="round" opacity=".46"/>}
</g>;

export const Crystal: React.FC<{x:number;y:number;s?:number;rotation?:number}> = ({x,y,s=1,rotation=0}) => <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
  <path d="M0 -52 L48 -25 L48 32 L0 60 L-48 32 L-48 -25Z" fill={C.light} stroke="#B3DFDD" strokeWidth="2"/>
  <path d="M0 4 L48 -25 L48 32 L0 60Z" fill="#BCE0DF"/>
  <path d="M0 4 L-48 -25 L0 -52 L48 -25Z" fill="#FFFFFF"/>
  <path d="M0 4 V60 M0 4 L-48 -25 M0 4 L48 -25" fill="none" stroke="#9BCBCD" strokeWidth="2"/>
</g>;

export const Iceberg: React.FC<{x:number;y:number;s?:number;t?:number}> = ({x,y,s=1,t=0}) => <g transform={`translate(${x} ${y+Math.sin(t*1.3)*5}) scale(${s})`}>
  <ellipse cy="230" rx="350" ry="46" fill={C.shade} opacity=".13"/>
  <path d="M-320 38 L-213 -38 L-154 -180 L-35 -115 L50 -285 L180 -160 L231 -20 L325 38Z" fill={C.light}/>
  <path d="M50 -285 L92 -31 L-35 -115Z" fill="#C4ECE5"/>
  <path d="M180 -160 L92 -31 L50 -285Z" fill="#A4D9D8"/>
  <path d="M-154 -180 L-92 28 L-213 -38Z" fill="#A4D9D8"/>
  <path d="M-35 -115 L-92 28 L92 -31Z" fill="#D9F3EB"/>
  <path d="M180 -160 L231 -20 L92 -31Z" fill="#E6F8EE"/>
  <path d="M-320 38 L-178 187 L-51 246 L83 166 L196 201 L325 38Z" fill="#62B8C1"/>
  <path d="M-320 38 L-51 246 L-92 38Z" fill="#94D1CF"/>
  <path d="M92 38 L83 166 L196 201 L325 38Z" fill="#3A98AD"/>
  <path d="M-365 40 Q-270 15 -180 40 T0 40 T180 40 T365 40" fill="none" stroke={C.mint} strokeWidth="8" strokeLinecap="round"/>
  <path d="M-380 84 Q-250 65 -130 84 M160 90 Q290 72 390 90" fill="none" stroke={C.ocean} strokeWidth="4" opacity=".28"/>
</g>;

export const Glass: React.FC<{x:number;y:number;s?:number;level?:number;t?:number;outline?:string}> = ({x,y,s=1,level=.1,t=0,outline=C.ice}) => {
  const top=105-level*190;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="glass-clip"><path d="M-86 -102 L-62 102 Q0 129 62 102 L86 -102Z"/></clipPath></defs>
    <path d="M-86 -102 L-62 102 Q0 129 62 102 L86 -102" fill={C.ice} fillOpacity=".08" stroke={outline} strokeWidth="8" strokeLinejoin="round"/>
    <g clipPath="url(#glass-clip)"><path d={`M-120 ${top} Q-60 ${top-9+Math.sin(t*4)*6} 0 ${top} T120 ${top} V150 H-120Z`} fill={C.mint} opacity=".85"/></g>
    <ellipse cy="-102" rx="86" ry="17" fill="none" stroke={outline} strokeWidth="6"/>
    <path d="M-62 -70 L-44 75" stroke={C.light} strokeWidth="9" opacity=".25" strokeLinecap="round"/>
  </g>;
};
