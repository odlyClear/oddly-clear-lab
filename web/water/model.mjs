export const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
export const PRESETS={
  balanced:{rain:65,demand:65,saving:false,desal:false},
  drought:{rain:15,demand:90,saving:false,desal:false},
  growth:{rain:55,demand:120,saving:false,desal:false},
  rescue:{rain:25,demand:80,saving:true,desal:true},
};
export const initial=()=>({day:0,stock:72,received:0,served:0,unmet:0,spill:0});
export function sanitize(input={}){
  const number=(v,fallback,min,max)=>Number.isFinite(Number(v))&&v!==null?clamp(Number(v),min,max):fallback;
  return {rain:number(input.rain,65,0,100),demand:number(input.demand,65,20,140),saving:input.saving===true||input.saving==='1',desal:input.desal===true||input.desal==='1'};
}
export function rates(settings){
  const s=sanitize(settings),rain=s.rain*.16,desal=s.desal?6:0;
  const demand=s.demand*.16*(s.saving?.75:1);
  return {rain,desal,inflow:rain+desal,demand,net:rain+desal-demand};
}
export function advance(state,settings,days){
  const dt=clamp(days,0,30-state.day),r=rates(settings);
  const received=r.inflow*dt,available=state.stock+received;
  const served=Math.min(available,r.demand*dt),unmet=Math.max(0,r.demand*dt-served);
  const spill=Math.max(0,available-served-100),stock=clamp(available-served,0,100);
  return {day:state.day+dt,stock,received:state.received+received,served:state.served+served,unmet:state.unmet+unmet,spill:state.spill+spill};
}
export function forecast(state,settings){
  const r=rates(settings),remaining=Math.max(0,30-state.day);
  return {daysToEmpty:r.net<-.00001?state.stock/-r.net:Infinity,endStock:clamp(state.stock+r.net*remaining,0,100),net:r.net};
}
export function condition(state,settings){
  if(state.stock<=.001)return 'empty';
  if(state.day>=30)return 'complete';
  if(state.stock<20)return 'critical';
  if(rates(settings).net<-.05)return 'falling';
  return 'steady';
}
