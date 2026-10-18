import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'web/water');
const dist=path.join(root,'dist');
await fs.mkdir(path.join(dist,'water'),{recursive:true});
await fs.mkdir(path.join(dist,'assets'),{recursive:true});
const result=await build({entryPoints:[path.join(source,'app.jsx')],bundle:true,write:false,minify:true,format:'iife',target:['es2020'],jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'inline'});
const css=await fs.readFile(path.join(source,'styles.css'),'utf8');
const fonts=path.join(root,'video-engine/public/fonts');
let fontCss='';
for(const [name,file,weight] of [['Bricolage','bricolage-800.ttf',800],['DM Sans','dmsans-400.ttf',400],['DM Sans','dmsans-600.ttf',600]]){
  const data=await fs.readFile(path.join(fonts,file));
  fontCss+=`@font-face{font-family:'${name}';font-weight:${weight};font-style:normal;font-display:swap;src:url(data:font/ttf;base64,${data.toString('base64')}) format('truetype')}\n`;
}
const licenses=(await Promise.all(['bricolage-OFL.txt','dmsans-OFL.txt'].map(f=>fs.readFile(path.join(fonts,f),'utf8')))).join('\n\n');
const poster='data:image/jpeg;base64,'+(await fs.readFile(path.join(root,'media/poster.jpg'))).toString('base64');
const js=result.outputFiles[0].text.replaceAll('__VIDEO_URL__','../assets/water-full-55s.mp4').replaceAll('__POSTER_URL__',poster).replace(/<\/script/gi,'<\\/script');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#073b43"><meta name="description" content="A water planet. A thirsty city. Change rain, demand and supply in a living science experiment by Oddly Clear."><title>Oddly Clear · Water Lab</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='12' fill='%23073b43'/%3E%3Cpath d='M20 6C16 13 10 19 10 25a10 10 0 0 0 20 0C30 19 24 13 20 6' fill='%2356dcc5'/%3E%3C/svg%3E"><style>${fontCss}${css}</style></head><body><div id="root"></div><noscript>This experiment needs JavaScript. Enable it to change rainfall and water demand.</noscript><script>${js}</script></body></html>
<!-- Bundled font licenses (OFL):
${licenses.replaceAll('--','—')}
-->
`;
await fs.writeFile(path.join(dist,'water/index.html'),html);
await fs.writeFile(path.join(dist,'index.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=./water/"><title>Oddly Clear · Lab</title><a href="./water/">Open the Water Lab</a></html>\n');
await fs.writeFile(path.join(dist,'.nojekyll'),'');
await fs.copyFile(path.join(root,'media/water-full-55s.mp4'),path.join(dist,'assets/water-full-55s.mp4'));
console.log(`Built Oddly Clear Water Lab: ${Buffer.byteLength(html).toLocaleString('en-US')} bytes HTML, no external runtime dependencies.`);
