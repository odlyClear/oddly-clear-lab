import React from 'react';
import {C,FONT,out,progress} from '../theme';

export const Heading: React.FC<{lines:string[];x?:number;y?:number;size?:number;color?:string;accentLine?:number;accent?:string;reveal?:number}> = ({lines,x=80,y=245,size=108,color=C.cream,accentLine=-1,accent=C.mint,reveal=1}) => <g opacity={out(reveal)} transform={`translate(0 ${(1-out(reveal))*50})`}>
  {lines.map((line,i)=><text key={i} data-safe-text="true" x={x} y={y+i*size*1.02} fontFamily={FONT.display} fontWeight="800" fontSize={size} letterSpacing={-size*.045} fill={i===accentLine?accent:color}>{line}</text>)}
</g>;

export const Label:React.FC<{text:string;x:number;y:number;color?:string;size?:number;anchor?:'start'|'middle'|'end'}> = ({text,x,y,color=C.ink,size=31,anchor='middle'}) => <text data-safe-text="true" x={x} y={y} textAnchor={anchor} fill={color} fontFamily={FONT.body} fontSize={size} fontWeight="600" letterSpacing="3">{text}</text>;

export const CAPTIONS=[
  {a:.25,b:1.47,lines:['A water planet.']},
  {a:1.47,b:3.8,lines:['So why do cities run dry?']},
  {a:4.45,b:6.53,lines:["Most of Earth's water is salty."]},
  {a:6.53,b:8.75,lines:['Freshwater is only a small share.']},
  {a:9.15,b:10.55,lines:['Some is frozen.']},
  {a:10.55,b:12.75,lines:['And supplies are uneven.']},
  {a:13.65,b:18.2,lines:['Shortages happen when local demand','exceeds usable supply.']},
];

export const Captions: React.FC<{t:number;dark:boolean}> = ({t,dark}) => {
  const cue=CAPTIONS.find(c=>t>=c.a&&t<c.b);
  if(!cue) return null;
  const opacity=out(progress(t,cue.a,cue.a+.12));
  return <g opacity={opacity}>
    {cue.lines.map((line,i)=><text key={i} data-safe-text="true" x="540" y={1590+i*67} fontFamily={FONT.body} fontWeight="600" fontSize="49" textAnchor="middle" fill={dark?C.cream:C.ink} stroke={dark?C.deep:C.cream} strokeWidth="9" paintOrder="stroke" strokeLinejoin="round">{line}</text>)}
  </g>;
};
