import{s as y,m as g,o as r,c as p,a as e,n as m,v as x,q as i,x as f,t as _,F as b,y as w,C as S,b as k,p as I,d as L}from"./vendor.2c1e9eb2.js";import{u,L as j,c as B}from"./cityList.a0a93350.js";import{F as D}from"./FilterList.f48d9bf9.js";import{_ as E}from"./index.ac35f7ed.js";const c=l=>(I("data-v-103971a2"),l=l(),L(),l),F={class:"container-box"},M={class:"row"},N={class:"col-12 col-lg-6"},$={class:"row align-items-center bg-secondary py-3 py-sm-2 px-4 rounded-4",style:{height:"100%"}},V={class:"col-12 col-sm-6 p-0"},C={class:"d-flex flex-nowrap pe-3 divider"},R=c(()=>e("i",{class:"bi bi-geo-alt fs-4 me-2 text-white"},null,-1)),T={value:"",selected:"selected",disabled:""},U=["value"],Y={class:"col-12 col-sm-6 p-0 mt-3 mt-sm-0"},q={class:"d-flex flex-nowrap ps-0 ps-sm-3"},z=c(()=>e("i",{class:"bi bi-calendar4 fs-4 me-2 text-white"},null,-1)),O=["placeholder"],A={class:"col-12 col-lg-6 mt-3 mt-lg-0"},G={class:"row align-items-center"},H={class:"col-9 p-0"},J={class:"row align-items-center ms-0 ms-lg-3 bg-secondary py-2 px-4 rounded-4"},K={class:"col-9"},P={class:"d-flex flex-nowrap"},Q=c(()=>e("i",{class:"bi bi-grid fs-4 me-3 text-white"},null,-1)),W={class:"col-3 d-flex justify-content-end"},X=c(()=>e("i",{class:"bi bi-search fs-5"},null,-1)),Z=[X],ee={class:"col-3"},te=c(()=>e("i",{class:"bi bi-x fs-3"},null,-1)),se={style:{"white-space":"nowrap"},class:"d-none d-sm-block"},oe={name:"ScenicSpot",beforeRouteEnter(l,s,n){s.name==="Stay"&&(u().clearData(),u().clearInput()),n()}},ie=Object.assign(oe,{setup(l){const s=u(),{cityName:n,searchScenicSpot:a,filterScenicSpotList:v}=y(s);s.listToggle=!0;function h(){document.getElementById("litepicker").value=""}return g(()=>{new j({element:document.getElementById("litepicker"),plugins:["ranges"],lang:"zh-tw",format:"YY/MM/DD"}),s.date&&(document.getElementById("litepicker").value=s.date)}),(d,o)=>(r(),p("div",F,[e("div",M,[e("div",N,[e("div",$,[e("div",V,[e("div",C,[R,m(e("select",{"onUpdate:modelValue":o[0]||(o[0]=t=>f(n)?n.value=t:null),class:"form text-primary",style:{"letter-spacing":"1px",width:"100%"}},[e("option",T,_(d.$t("__find_destination")),1),(r(!0),p(b,null,w(i(B).group,t=>(r(),p("option",{key:t,value:t.enName},_(t.cityName),9,U))),128))],512),[[x,i(n)]])])]),e("div",Y,[e("div",q,[z,e("input",{class:"form text-primary",type:"text",id:"litepicker",placeholder:d.$t("__choose_date"),style:{"letter-spacing":"1px",width:"100%"},autocomplete:"off"},null,8,O)])])])]),e("div",A,[e("div",G,[e("div",H,[e("div",J,[e("div",K,[e("div",P,[Q,m(e("input",{"onUpdate:modelValue":o[1]||(o[1]=t=>f(a)?a.value=t:null),class:"form",type:"text",style:{width:"100%","margin-left":"10px"}},null,512),[[S,i(a)]])])]),e("div",W,[e("button",{onClick:o[2]||(o[2]=t=>i(s).getScenicSpot()),type:"button",class:"btn btn-primary rounded-3 px-2 py-1"},Z)])])]),e("div",ee,[e("div",{onClick:o[3]||(o[3]=t=>{i(s).clearInput(),h()}),class:"d-flex align-items-center justify-content-center mx-auto clear-btn"},[te,e("span",se,_(d.$t("__clear")),1)])])])])]),k(D,{list:i(v)},null,8,["list"])]))}});var de=E(ie,[["__scopeId","data-v-103971a2"]]);export{de as default};