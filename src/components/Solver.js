import React, { useEffect, useRef, useState } from 'react'
import { abs, asin, cos, e, pi, pow, sin, sqrt, tan } from 'mathjs'
import Linechart from './Linechart';
export default function Solver({val,ans,pos,el}) {
    let dri = (ans.Ari *4)/pi
     dri = sqrt(dri);
     const rad=(x)=>{
        const ans=parseFloat(x*pi/180);
        return ans;
     }
    const omega=(n  ,lng , lloc ,t)=>{
        let B = (360/365)*(parseFloat(n) - 81);
        B=parseFloat(B);
        const ET = 9.87 * sin(rad(2 * B)) - 7.3 * cos(rad(B)) - 1.5 * sin(rad(B));
        const lat = (t + ( 4*(lng- lloc) + ET)/60)/100;
        const w=abs(15*(lat-12));
        return w;
    }
     const delta=(n)=>{
        const x= 23.45 * sin((360/365)*(284+parseInt(n)));
        return x;
     }
     
     const zenith=(n,phi,omega)=>{
        const delta= 23.45 * sin((360/365)*(284+parseInt(n)));
        const tmp=sin(rad(delta))*sin(rad(phi)) + cos(rad(delta))*cos(rad(phi))*cos(rad(omega));
        let alpha= parseFloat(asin(tmp));
        alpha = (alpha*180) / pi;
        const z=90-alpha;
        return z;
     }
     const beam=(x,z,all)=>{
        const n=parseInt(x);
        const al=parseInt(all)/1000;
        const am=parseFloat(1/cos(rad(z)));
        const a0 = 0.94 * (0.4237 - 0.00821 * (6-al*al ));
        const a1 = 0.98 * (0.5055 - 0.00595 * (6.5 - al*al));
        const kk = 1.02 * (0.2711 - 0.01865*(2.5 - al*al));
        const I0 = 1366 * (1+0.034* cos((360/365)*n));
        const Ib= I0*(a0 + a1 *pow(e,(-kk * am)));
        return Ib;
     }
     const nop=(z,f,l)=>{
        f = parseFloat(f);
        l=parseFloat(l);
        const thetai= rad(z);
        const kthetai= cos(rad(z)) + 0.000884*thetai - 0.00005369*pow(thetai,2);
        const xend=abs(1 - (f/l)*tan(rad(z)));
        const np = 0.99 * 0.83 * 0.96 * 0.95 * xend * kthetai;
        return np;
     }

     const H=(ro,v,dri,l,mu,pr,k)=>{
           const m = parseFloat(ro)*parseFloat(v);
            const R = 4 * m/(pi*parseFloat(dri)*parseFloat(mu));
            let nu = 3.66 + ( 0.0667 * R * parseFloat(pr)*parseFloat(dri)/parseFloat(l))/(1+ 0.04*pow((R*parseFloat(pr)*parseFloat(dri)/parseFloat(l)),2/3));
            let h= (nu * parseFloat(k)) /parseFloat(dri);
            if(R<2300.00) return {h,m};
            nu = 0.023 * pow(R,0.8) * pow(parseFloat(pr),0.4);
             h= nu * parseFloat(k) /parseFloat(dri);
            return {h,m};
     }

     const Tout=(aco,aro,cp,h,m,tam,ws,ec,er,ari,nop,Ib,tin)=>{
        aco = parseFloat(aco);
        ws=parseFloat(ws);
        ec=parseFloat(ec);
        er=parseFloat(er);
        ari=parseFloat(ari);
        nop=parseFloat(nop);
        Ib=parseFloat(Ib);
        tin=parseFloat(tin)+273;
        h=parseFloat(h);
        aro=parseFloat(aro);
        cp=parseFloat(cp);
        m=parseFloat(m);
        tam=parseFloat(tam)+273;
        const hout = 7.5 + ws;
        const sig =parseFloat(5.67 * pow(10,-8));
        const k1 = aco*ec*sig * 4 * pow(tam,3) + aco * hout;
        const k2 = aro * er * sig * pow((1 + (4* pow(tam,3)*aro*er*sig)/k1),-1);
        const k3 = pow(((1/ari*h)+ (1/(2*m*cp))),-1);
        const k4 = nop * pow((1 + (4*pow(tin,3)*k2)/k3),-1);
        const k5 = k2 * pow((1+(4*pow(tin,3)*k2)/k3),-1);
        const to = tin + (k4/(m*cp))*Ib - ( k5/(m*cp))*(pow(tin,4)- pow(tam,4));
        return to;

     }
     //  console.log(ans);
     //  console.log(h);
     
     //  console.log(zenith(60,24,45));
     // const Ib=800;
     // const np=0.75;
     // const A = Tout(ans.Aco,ans.Ar,ans.cp,h.h,h.m,val.amb,val.ws,ans.ec,ans.er,ans.Ari,np,Ib,ans.Tin);
     let row=[{0:0}];
     let row2=[{}];
      let row3=[{}];
     //  row.push(A-273);
     for(let xt=930;xt<1465;){
        const x=ans.n;
         const w= omega(x,parseFloat(pos.lng),82.5,xt);
          const h= H(ans.ro,ans.V,dri,ans.L,0.099,ans.pr,0.598);
        
        const zz= zenith(x,parseFloat(pos.lat),w );
        const Ib=beam(x,zz,el);
        const np = nop(zz,ans.f,ans.L);
        const A = Tout(ans.Aco,ans.Ar,ans.cp,h.h,h.m,val.amb,val.ws,ans.ec,ans.er,ans.Ari,np,Ib,ans.Tin);
        xt=xt+30;
        row.push({xt:xt,val:A-273});
        row2.push({xt:xt,val:np});
        row3.push({xt:xt,val:Ib});
     }
     
     const plot ={
        labels:row.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Oultlet Temperature",
            data:row.map((x)=>x.val)
        }]
     };
     const plot2 ={
        labels:row2.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Optical Efficiency",
            data:row2.map((x)=>x.val)
        }]
     };
     const plot3 ={
        labels:row3.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Beam Radiation",
            data:row3.map((x)=>x.val)
        }]
     };
    if(ans.V)
  return (
    <div className='m-3'>
        <hr class="border border-danger border-2 opacity-50"></hr>
    <h2>Plotting Variations..</h2>
        {/* {row.map((x)=><span>{x.xt} --= {x.val}<br></br></span>)} */}

        <div class="d-flex flex-row mb-3">
            <div class="p-2"> <Linechart chartdata={plot}/> </div>
            <div class="p-2"><Linechart chartdata={plot2}/> </div>
        </div>
        <div class="d-flex flex-row mb-3">
            <div class="p-2"> <Linechart chartdata={plot3}/> </div>
        </div>
         
          
    </div>
  );
}
