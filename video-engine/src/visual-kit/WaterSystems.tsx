import React from 'react';
import {C,progress,out,pop} from '../theme';
import {House} from './Town';
import {Droplet} from './WaterArt';
import {Label} from './Typography';

export const Flow:React.FC<{d:string;t:number;color?:string;width?:number}> = ({d,t,color=C.mint,width=8}) => <>
  <path d={d} fill="none" stroke={C.deep} strokeWidth={width+8} opacity=".12" strokeLinejoin="round"/>
  <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round"/>
  <path d={d} fill="none" stroke={C.light} strokeWidth={width*.4} strokeDasharray="2 44" strokeDashoffset={-t*45} strokeLinecap="round"/>
</>;

export const Cloud:React.FC<{x:number;y:number;s?:number;dark?:boolean}> = ({x,y,s=1,dark=false}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-120 22 C-157 17 -154 -41 -109 -41 C-116 -100 -32 -131 5 -77 C48 -115 112 -87 107 -40 C164 -38 166 28 120 29 H-120Z" fill={dark?C.ice:C.light}/>
  <path d="M-115 28 H120 Q157 22 149 -10 Q133 12 100 9 H-110Z" fill={C.ice} opacity=".7"/>
</g>;

export const Aquifer:React.FC<{x:number;y:number;s?:number;t:number;id:string}> = ({x,y,s=1,t,id}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <defs><clipPath id={`${id}-pores`}><path d="M-344 -105 H344 V176 H-344Z"/></clipPath></defs>
  <ellipse cx="30" cy="213" rx="395" ry="35" fill={C.deep} opacity=".1"/>
  <path d="M-350 -120 L-260 -174 H440 L350 -120Z" fill="#8BCBB3"/>
  <path d="M350 -120 L440 -174 V123 L350 180Z" fill="#ADAA85"/>
  <path d="M-350 -120 H350 V180 H-350Z" fill="#D8CBA5"/>
  <path d="M-350 -120 H350 V-75 H-350Z" fill="#AEC49A"/>
  <g clipPath={`url(#${id}-pores)`}>
    {[0,1,2,3].map(i=><path key={i} d={`M-370 ${-35+i*58} Q-190 ${-5+i*58} -20 ${-28+i*58} T370 ${-22+i*58}`} fill="none" stroke="#B5AB87" strokeWidth="8"/>)}
    {Array.from({length:104},(_,i)=>{
      const xx=-328+(i%16)*43;const yy=-45+Math.floor(i/16)*34;
      return <ellipse key={i} cx={xx+(i%3)*3} cy={yy} rx={9+(i%3)} ry={6+(i%2)*3} fill={yy>32?C.ocean:'#BFB18D'} opacity={yy>32?.8:.8}/>;
    })}
    <path d="M-300 50 L-225 76 L-171 42 L-87 93 L-23 64 L49 116 L104 78" fill="none" stroke={C.ocean} strokeWidth="7"/>
  </g>
  <path d="M160 -177 V105" stroke={C.light} strokeWidth="25"/>
  <path d="M160 -177 V105" stroke={C.deep} strokeWidth="14"/>
  <Flow d="M160 95 V-183 H242" t={t} width={7} color={C.mint}/>
  <path d="M139 -175 V-200 H181 V-175" fill={C.coral}/>
  <path d="M-244 -135 V-191 M-269 -170 H-219" stroke={C.deep} strokeWidth="5" opacity=".3"/>
  <House x={-150} y={-178} scale={.75}/>
  <path d="M-350 -120 H350" stroke={C.deep} strokeWidth="4" opacity=".15"/>
</g>;

export const Reservoir:React.FC<{x:number;y:number;s?:number;t:number;level?:number}> = ({x,y,s=1,t,level=.8}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="132" rx="178" ry="31" fill={C.deep} opacity=".1"/>
  <path d="M-178 -40 L-63 -106 L180 35 L65 101Z" fill="#B7C5A4"/>
  <path d="M-178 -40 V-9 L65 132 V101Z" fill="#A6B28F"/>
  <path d="M65 101 L180 35 V66 L65 132Z" fill="#8F9F80"/>
  <path d="M-129 -37 L-57 -78 L132 32 L60 73Z" fill={level<.3?'#B7AA87':C.shade}/>
  <path d="M-129 -37 L-57 -78 L132 32 L60 73Z" fill={C.mint} transform={`scale(${.3+.7*level})`}/>
  <path d="M-170 -61 L-125 -87 L90 37 L45 63Z" fill={C.sand}/>
  <path d="M45 63 L90 37 V103 L45 129Z" fill="#ABA487"/>
  {[0,1,2].map(i=><path key={i} d={`M${-63+i*41} ${-34+i*24} l${20+Math.sin(t*2+i)*6} 11`} stroke={C.light} strokeWidth="3" opacity=".7"/>)}
</g>;

export const RainLandscape:React.FC<{t:number}> = ({t}) => <>
  <g transform={`translate(285 ${785+Math.sin(t)*5})`}><Cloud x={0} y={0} s={.98}/></g>
  {Array.from({length:19},(_,i)=>{
    const xx=170+(i*43)%240;const yy=855+((i*61+t*165)%245);
    return <path key={i} d={`M${xx} ${yy} l-9 23`} stroke={C.ocean} strokeWidth="5" strokeLinecap="round" opacity=".7"/>;
  })}
  <Reservoir x={285} y={1130} s={1.05} t={t}/>
  <g transform={`translate(800 780) rotate(${t*5})`}>
    {Array.from({length:12},(_,i)=><path key={i} d="M0 -91 V-116" stroke={C.coral} strokeWidth="7" transform={`rotate(${i*30})`} strokeLinecap="round"/>)}
    <circle r="61" fill={C.coral}/>
    <circle cx="-18" cy="-17" r="22" fill={C.light} opacity=".18"/>
  </g>
  <Reservoir x={795} y={1130} s={1.05} t={t} level={.15}/>
  <path d="M711 1224 l24-10 17 26 26-15 M816 1268 l10-25 31 5" fill="none" stroke="#9D8E70" strokeWidth="5"/>
  <Label text="MORE RAIN" x={285} y={1330} size={29}/>
  <Label text="LESS RAIN" x={795} y={1330} size={29} color={C.coral}/>
  <Clock x={540} y={1405} s={.53} t={t}/>
</>;

export const Clock:React.FC<{x:number;y:number;s?:number;t:number}> = ({x,y,s=1,t}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <circle r="100" fill={C.cream} stroke={C.ocean} strokeWidth="9"/>
  {Array.from({length:12},(_,i)=><path key={i} d="M0 -80 V-69" stroke={C.ocean} strokeWidth="5" transform={`rotate(${i*30})`}/>)}
  <path d="M0 0 V-45" stroke={C.deep} strokeWidth="9" strokeLinecap="round" transform={`rotate(${t*8})`}/>
  <path d="M0 0 V-67" stroke={C.coral} strokeWidth="7" strokeLinecap="round" transform={`rotate(${t*36})`}/>
  <circle r="8" fill={C.deep}/>
</g>;

export const TreatmentPlant:React.FC<{t:number;x:number;y:number;s?:number;desal?:boolean}> = ({t,x,y,s=1,desal=false}) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="195" rx="353" ry="42" fill={C.deep} opacity=".12"/>
  <path d="M-340 0 L-110 -133 L340 127 L110 260 L-340 0 V28 L110 288 L340 154 V127 L110 260Z" fill="#ABC4B2"/>
  <path d="M-340 0 L-110 -133 L340 127 L110 260Z" fill="#D3E4D1"/>
  <path d="M-245 -74 L-65 -178 L115 -74 V75 L-65 179 L-245 75Z" fill={C.light}/>
  <path d="M-65 30 L115 -74 V75 L-65 179Z" fill="#BBD6C8"/>
  <path d="M-245 -74 L-65 -178 L115 -74 L-65 30Z" fill={C.coral}/>
  <path d="M-65 -153 L68 -77 L-65 0 L-199 -77Z" fill="#CE6957"/>
  <path d="M-205 -16 L-166 6 V47 L-205 25Z M-143 20 L-105 42 V82 L-143 60Z" fill={C.ocean}/>
  <path d="M-9 32 L61 -8 V40 L-9 80Z" fill={C.shade}/>
  {[0,1,2].map(i=><g key={i} transform={`translate(${123+i*58} ${39+i*34})`}>
    <path d="M-36 -37 V48 C-36 74 36 74 36 48 V-37Z" fill={C.ocean}/>
    <ellipse cy="-37" rx="36" ry="18" fill={C.mint}/>
    <path d="M-22 -24 V40" stroke={C.light} strokeWidth="5" opacity=".38"/>
  </g>)}
  <Flow d="M-355 61 L-261 115 L-261 160 L-99 253" t={t} width={12}/>
  <Flow d="M167 202 L262 257 L367 196" t={t} width={12}/>
  {desal&&<path d="M-45 -302 L-108 -195 H-49 L-77 -105 L20 -232 H-40Z" fill={C.mint} stroke={C.light} strokeWidth="3"/>}
</g>;

export const SupplySources:React.FC<{t:number}> = ({t}) => <>
  <g transform={`translate(205 820) scale(${pop(t,.1,.6)})`}>
    <path d="M-102 -65 Q-55 -30 -86 8 T-9 88 Q35 116 68 80 L115 112 Q26 184 -54 104 T-132 -44Z" fill={C.ocean}/>
    <path d="M-84 -41 Q-35 -12 -58 17 T22 107" fill="none" stroke={C.mint} strokeWidth="8"/>
  </g>
  <g opacity={out(progress(t,.35,.9))}><Reservoir x={540} y={820} s={.68} t={t}/></g>
  <g opacity={out(progress(t,.65,1.2))}><Aquifer x={850} y={805} s={.29} t={t} id="sources-aquifer"/></g>
  <Label text="RIVER" x={205} y={1020} size={26}/>
  <Label text="RESERVOIR" x={540} y={1020} size={24}/>
  <Label text="WELL" x={850} y={1020} size={26}/>
  {[205,540,850].map((x,i)=><g key={i} opacity={out(progress(t,.9+i*.2,1.5+i*.2))}><Flow d={`M${x} 1060 V1145 Q${x} 1190 540 1190 V1300`} t={t} color={C.ocean}/></g>)}
  <Droplet x={540} y={1365} scale={.37} fill={C.mint} id="supplied-drop"/>
  <Label text="LOCAL SUPPLY" x={540} y={1490} size={27}/>
</>;
