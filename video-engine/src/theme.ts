export const C = {
  deep: '#073B43', ocean: '#188DA6', mint: '#56DCC5', cream: '#F5F0DF',
  coral: '#F27960', ink: '#12393E', ice: '#C1EDE9', shade: '#08718B',
  land: '#8BCBB3', light: '#FFF9E9', sand: '#E1D8BD',
};
export const FONT = {display: 'Bricolage', body: 'DM Sans'};
export const clamp = (v: number, lo=0, hi=1) => Math.max(lo,Math.min(hi,v));
export const progress = (t: number, a: number, b: number) => clamp((t-a)/(b-a));
export const out = (v: number) => 1-Math.pow(1-clamp(v),4);
export const smooth = (v: number) => {const x=clamp(v); return x*x*(3-2*x);};
export const lerp = (a:number,b:number,p:number) => a+(b-a)*p;
export const pop = (t:number,start:number,d=.65) => {
  const x=progress(t,start,start+d);
  return 1+Math.pow(1-x,3)*(2.7*x-1);
};
