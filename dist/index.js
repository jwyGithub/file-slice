var d=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var m=(n,e)=>d(n,"name",{value:e,configurable:!0});var z=(n,e)=>{for(var t in e)d(n,t,{get:e[t],enumerable:!0})},I=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of M(e))!x.call(n,r)&&r!==t&&d(n,r,{get:()=>e[r],enumerable:!(i=y(e,r))||i.enumerable});return n};var S=n=>I(d({},"__esModule",{value:!0}),n);var p=(n,e,t)=>new Promise((i,r)=>{var l=o=>{try{s(t.next(o))}catch(c){r(c)}},f=o=>{try{s(t.throw(o))}catch(c){r(c)}},s=o=>o.done?i(o.value):Promise.resolve(o.value).then(l,f);s((t=t.apply(n,e)).next())});var v={};z(v,{sliceFile:()=>q});module.exports=S(v);function q(n){return p(this,null,function*(){let{chunkSize:e=1024*1024,threadCount:t=navigator.hardwareConcurrency||4,workerScript:i,file:r}=n;if(!r)throw new Error("file is required");return new Promise((l,f)=>{let s=Math.ceil(r.size/e),o=[],c=Math.ceil(s/t),C=0;for(let a=0;a<t;a++){let u=typeof i=="string"?new Worker(i,{type:"module"}):i(),k=a*c,w=Math.min((a+1)*c,s);u.postMessage({file:r,chunkSize:e,startChunkIndex:k,endChunkIndex:w}),u.onmessage=g=>{for(let h=k;h<w;h++)o[h]=g.data[h-k];u.terminate(),C++,C===t&&l(o)},u.onerror=f}})})}m(q,"sliceFile");0&&(module.exports={sliceFile});
