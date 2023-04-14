import React, { useEffect, useRef, useState } from 'react'
import { abs, asin, cos, e, pi, pow, round, sin, sqrt, tan } from 'mathjs'
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

     const Tout=(aco,aro,cp,h,m,tam,ws,ec,er,ari,nop,Ib,tin,Aa)=>{
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
        Aa=parseFloat(Aa);
        const hout = 7.5 + ws;
        const sig =parseFloat(5.67 * pow(10,-8));
        const tmp = h;
        const k1 = aco*ec*sig * 4 * pow(tam,3) + aco * hout;
        const k2 = (aro * er * sig )/((1 + ((4* pow(tam,3)*aro*er*sig)/k1)));
        const k3 = 1/((1/(ari*h))+ (1/(2*m*cp)));
        const k4 = nop * pow((1 + (4*pow(tin,3)*k2/k3)),-1);
        const k5 = k2 * pow((1+(4*pow(tin,3)*k2)/k3),-1);
        const to = tin + (k4/(m*cp))*Ib*Aa - ( k5/(m*cp))*(pow(tin,4)- pow(tam,4));
        const nth = k4 - k5 * ((pow(tin,4)-pow(tam,4))/(Aa*Ib));
        let qu = k4*Ib*Aa - k5*(pow(tin,4)- pow(tam,4));
        const tr = tin + (k4/k3)*(Aa*Ib) - (k5/k3)*(pow(tin,4)- pow(tam,4));
        const tc = tam + ((nop-k4)/k1)*Ib*Aa + (k5/k1)*(pow(tin,4)- pow(tam,4));
         qu = qu* 0.02;
        return {to,nth,qu,tr,tc};

     }
     let row=[{}];
     let row2=[{}];
      let row3=[{}];
      let row4=[{}];
      let row5=[{}];
      let row6=[{}];
      let row7=[{}];
     for(let xt=930;xt<1465;){
        const x=ans.n;
         const w= omega(x,parseFloat(pos.lng),82.5,xt);
          const h= H(ans.ro,ans.V,dri,ans.L,0.00199,ans.pr,0.598);
        
        const zz= zenith(x,parseFloat(pos.lat),w );
        const Ib=beam(x,zz,el);
        const np = nop(zz,ans.f,ans.L);
        const res = Tout(ans.Aco,ans.Aro,ans.cp,h.h,h.m,val.amb,val.ws,ans.ec,ans.er,ans.Ari,np,Ib,ans.Tin,ans.Ar);
        xt=xt+30;
        row.push({xt:xt,val:res.to-273});
        row2.push({xt:xt,val:np});
        row3.push({xt:xt,val:Ib});
        row4.push({xt:xt,val:res.nth});
        row5.push({xt:xt,val:res.tr-273});
        row6.push({xt:xt,val:res.tc-273});
        row7.push({xt:xt,val:res.qu});
     }
     
     const plot ={
        labels:row.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Oultlet Temperature",
            data:row.map((x)=>x.val),
            borderColor:'orange'
        }]
     };
     const plot2 ={
        labels:row2.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Optical Efficiency",
            data:row2.map((x)=>x.val),
            borderColor:'violet'
        },{
         label:"Local Apparent Time vs Thermal Efficiency",
         data:row4.map((x)=>x.val),
         borderColor:'orange'
     }]
     };
     const plot3 ={
        labels:row3.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Beam Radiation",
            data:row3.map((x)=>x.val)
        }]
     };
     const plot4 ={
        labels:row4.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Useful Heat gain",
            data:row7.map((x)=>x.val)
        }]
     };
     const plot5 ={
        labels:row5.map((x)=>x.xt),
        datasets:[{
            label:"Local Apparent Time vs Receiver Temperature",
            data:row5.map((x)=>x.val),
            borderColor:'red'
        },{
         label:"Local Apparent Time vs cover Temperature",
        data:row6.map((x)=>x.val),
        borderColor:'cyan'
    },{
      label:"Local Apparent Time vs Oultlet Temperature",
      data:row.map((x)=>x.val),
  }],
     };
    if(ans.V)
  return (
    <div className='m-3'>
        <hr class="border border-danger border-2 opacity-50"></hr>
    <h2>Plotted Variations...</h2>

        <div class="d-flex flex-row mb-3">
            <div class="p-2"> <Linechart chartdata={plot3}/> </div>
            <div class="p-2"><Linechart chartdata={plot2}/> </div>
        </div>
        <p>The above variation represents the change in beam radiation with the change in Local Standar Time
           We can clearly see as the position of sun changes or in other words hour angle changes the beam radiation increases
           and with the change in beam radiation received flux on the surface of aperture of the collector changes with that change 
           optical Efficiency follow the same trend as that of beam radiation. The Intercept factor = 0.99 and incidence angle modifiers are taken into 
           account .
        </p>
        <div class="d-flex flex-row mb-3">
        <div class="p-2"> <Linechart chartdata={plot}/> </div>
            <div class="p-2"> <Linechart chartdata={plot4}/> </div>
        </div>
        <p>The above variation is the visual representation of the thermal efficiency and outlet temperture vs local apparent Time. 
          As the oultlet temperature depends on the incident beam irradiation so outlet temperature follow the same trend of beam irradiation.
           Similarly the thermal efficiency follows the same trend.
        </p>
        <div class="d-flex flex-row mb-3">
        <div class="p-2"> <Linechart chartdata={plot5} /> </div>
        </div>
        <p>The above plot shows the variation of cover temperature , receiver temperature and outlet temperature
         on the same plot. The trend of the plot is as expected similar to the Forristall modal.
        </p>
          
    </div>
  );
}
