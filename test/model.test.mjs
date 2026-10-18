import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,PRESETS,sanitize,rates,advance,forecast,condition} from '../web/water/model.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
test('changing settings conserve water and account for all demand',()=>{
  let state=initial(),requested=0;
  for(let i=0;i<1200;i++){
    if(state.day>=30){state=initial();requested=0;}
    const settings=sanitize({rain:(i*17)%101,demand:20+(i*23)%121,saving:i%3===0,desal:i%7===0});
    requested+=rates(settings).demand*Math.min(.17,30-state.day);state=advance(state,settings,.17);
    assert.ok(state.stock>=0&&state.stock<=100&&state.day<=30);
    near(72+state.received,state.stock+state.served+state.spill);near(requested,state.served+state.unmet);
  }
});
test('balanced supply preserves stock and caps at 30 days',()=>{const s=advance(initial(),PRESETS.balanced,100);near(s.stock,72);assert.equal(s.day,30);assert.equal(condition(s,PRESETS.balanced),'complete');});
test('drought empties the tank and records unmet demand',()=>{const s=advance(initial(),PRESETS.drought,30);assert.equal(s.stock,0);assert.ok(s.unmet>0);assert.equal(condition(s,PRESETS.drought),'empty');near(forecast(initial(),PRESETS.drought).daysToEmpty,6);});
test('rescue keeps supply alive for the full challenge',()=>{const s=advance(initial(),PRESETS.rescue,30);assert.ok(s.stock>72);assert.equal(condition(s,PRESETS.rescue),'complete');});
test('overflow is tracked instead of silently losing water',()=>{const s=advance(initial(),{rain:100,demand:20},30);assert.equal(s.stock,100);assert.ok(s.spill>0);near(72+s.received,s.stock+s.served+s.spill);});
test('URL inputs fall back or stay inside allowed ranges',()=>{assert.equal(sanitize({rain:'NaN'}).rain,65);assert.equal(sanitize({demand:999}).demand,140);assert.equal(sanitize({rain:-20}).rain,0);});
test('model switches change only the specified daily rate',()=>{near(rates({...PRESETS.balanced,saving:true}).demand,rates(PRESETS.balanced).demand*.75);near(rates({...PRESETS.balanced,desal:true}).inflow-rates(PRESETS.balanced).inflow,6);});
