import React from 'react';
import {geoOrthographic, geoPath, geoGraticule10, geoArea} from 'd3-geo';
import land from '../data/land.json';
import {C} from '../theme';

const landFeatures = land.features.map((feature:any) => {
  if(geoArea(feature)>2*Math.PI){
    const g=feature.geometry;
    const coordinates=g.type==='Polygon'?g.coordinates.map((r:any)=>[...r].reverse()):g.coordinates.map((p:any)=>p.map((r:any)=>[...r].reverse()));
    return {...feature,geometry:{...g,coordinates}};
  }
  return feature;
});

export const Globe: React.FC<{t:number;r?:number;x?:number;y?:number;id?:string}> = ({t,r=390,x=540,y=950,id='earth'}) => {
  const projection=geoOrthographic().scale(r).translate([0,0]).rotate([-12+t*4,-16,-8]).clipAngle(90);
  const path=geoPath(projection);
  return <g transform={`translate(${x} ${y})`}>
    <defs>
      <radialGradient id={`${id}-ocean`} cx="30%" cy="23%" r="86%"><stop stopColor="#45B9C8"/><stop offset=".47" stopColor={C.ocean}/><stop offset="1" stopColor="#024657"/></radialGradient>
      <radialGradient id={`${id}-shadow`} cx="28%" cy="24%" r="85%"><stop offset=".4" stopColor={C.deep} stopOpacity="0"/><stop offset="1" stopColor="#01282F" stopOpacity=".62"/></radialGradient>
      <radialGradient id={`${id}-atmos`}><stop offset=".85" stopColor={C.mint} stopOpacity="0"/><stop offset=".97" stopColor={C.mint} stopOpacity=".19"/><stop offset="1" stopColor={C.mint} stopOpacity="0"/></radialGradient>
      <clipPath id={`${id}-clip`}><circle r={r}/></clipPath>
    </defs>
    <ellipse cy={r+65} rx={r*.72} ry={r*.08} fill="#01232C" opacity=".22"/>
    <circle r={r+33} fill={`url(#${id}-atmos)`}/>
    <circle r={r} fill={`url(#${id}-ocean)`}/>
    <g clipPath={`url(#${id}-clip)`}>
      <path d={path(geoGraticule10())||''} fill="none" stroke={C.cream} opacity=".14" strokeWidth="1.5"/>
      {landFeatures.map((f:any,i:number)=><path key={i} d={path(f)||''} fill={C.land} stroke="#71B6A0" strokeWidth=".7"/>) }
      <circle r={r} fill={`url(#${id}-shadow)`}/>
      <ellipse cx={-r*.28} cy={-r*.31} rx={r*.37} ry={r*.12} transform="rotate(-38)" fill={C.light} opacity=".055"/>
    </g>
    <circle r={r} fill="none" stroke={C.ice} strokeOpacity=".28" strokeWidth="2"/>
  </g>;
};
