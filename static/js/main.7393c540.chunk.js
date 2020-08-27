(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],{71:function(e,t,n){e.exports=n(82)},81:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"physicians",(function(){return J})),n.d(a,"cantons",(function(){return q}));var r,s=n(0),o=n.n(s),i=n(9),c=n.n(i),l=n(16),u=n(21),d=n(119),p=n(130),m=n(125),E=n(126),f=n(127),v=n(60),g=n.n(v),h=n(124),b=n(55),O=n.n(b),S=n(129),j=n(128),C=n(25),N=n.n(C),y=n(83),I=n(54),x=n.n(I),w=Object(d.a)((function(e){return{response:{display:"flex",alignItems:"flex-end","&> svg":{marginLeft:"10px"}}}})),T=function(e){var t=e.response,n=e.setResponse,a=e.setIsEditing,r=w();return o.a.createElement("div",{className:r.response},o.a.createElement(y.a,{style:{padding:"20px"}},t),o.a.createElement(x.a,{fontSize:"small",onClick:function(e){a(!0),n(null)}}))},z=n(28),k=function(e){var t=Object(s.useRef)(null);return Object(s.useEffect)((function(){var e,n,a;null===t||void 0===t||null===(e=t.current)||void 0===e||null===(n=e.querySelector("input"))||void 0===n||null===(a=n.focus)||void 0===a||a.call(n)}),e?Object(z.a)(e):[]),t},R=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,r=e.className,s=e.options,i=e.isEditing,c=e.setIsEditing,l=k([t]);return o.a.createElement("section",{className:r},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(O.a,{fontSize:"large"})," ",o.a.createElement(N.a,null,"Im welchem Kanton wohnst du ?"))),o.a.createElement("div",null,t?o.a.createElement(T,{response:t,setIsEditing:c,setResponse:n}):o.a.createElement(S.a,{options:s,getOptionLabel:function(e){return e},style:{width:300},onChange:function(e,t){n(t),!i&&a(1)},renderInput:function(e){return o.a.createElement(j.a,Object.assign({},e,{label:"W\xe4hle bitte deinen Kanton",variant:"outlined",ref:l}))}})))},_=n(58),A=n.n(_),H=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,r=e.className,i=e.isEditing,c=e.setIsEditing,u=k([t]),d=Object(s.useState)(!1),p=Object(l.a)(d,2),m=p[0],E=p[1];return o.a.createElement("section",{className:r},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(A.a,{fontSize:"large"}),o.a.createElement(N.a,null,"Was ist die Postleitzahl deines Wohnortes ?"))),o.a.createElement("div",null,t?o.a.createElement(T,{response:t,setIsEditing:c,setResponse:n}):o.a.createElement(j.a,{ref:u,onChange:function(e){var t,r=e.target.value;!(t=r)||4!==t.length||t.startsWith("0")?E(!0):(E(!1),setTimeout((function(){n(r),!i&&a(2)}),500))},error:m,label:"PLZ",type:"number",variant:"outlined"})))},P=n(59),D=n.n(P),F=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,r=e.className,s=e.options,i=e.isEditing,c=e.setIsEditing,l=k([t]);return o.a.createElement("section",{className:r},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(D.a,{fontSize:"large"}),o.a.createElement(N.a,null,"W\xe4hle einen Artz / eine Artzin ?"))),o.a.createElement("div",null,t?o.a.createElement(T,{response:t,setIsEditing:c,setResponse:n}):o.a.createElement(S.a,{options:s,getOptionLabel:function(e){return"".concat(null===e||void 0===e?void 0:e.ProductDoctorname,", ").concat(null===e||void 0===e?void 0:e.ProductDoctorCom)||""},style:{width:300},onChange:function(e,t){n("".concat(null===t||void 0===t?void 0:t.ProductDoctorname,", ").concat(null===t||void 0===t?void 0:t.ProductDoctorCom)),!i&&a(2)},renderInput:function(e){return o.a.createElement(j.a,Object.assign({},e,{label:"Suche nach einem/er Artz/in",variant:"outlined",ref:l}))}})))};!function(e){e.PHYSICIANS_FETCH="@PHYSICIANS/fetch"}(r||(r={}));var L,W=function(e){return e.type===r.PHYSICIANS_FETCH},Y=function(e){return{type:r.PHYSICIANS_FETCH,payload:e}},B=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/physicians.json").then((function(e){return e.json()})).then((function(t){return e(Y(t||[]))}))}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return W(t)?Object(z.a)(t.payload):e};!function(e){e.CANTONS_FETCH="@CANTONS/fetch"}(L||(L={}));var K=function(e){return e.type===L.CANTONS_FETCH},M=function(e){return{type:L.CANTONS_FETCH,payload:e}},X=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/cantons.json").then((function(e){return e.json()})).then((function(t){return e(M(t||[]))}))}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return K(t)?Object(z.a)(t.payload):e},G=Object(d.a)((function(e){return{toolbar:{backgroundColor:"#FF51A1",minHeight:80},title:{flexGrow:1},content:{width:"90%",padding:"40px","&>section:not(:first-child)":{padding:"5px",marginTop:"30px",borderRadius:"6px 6px"}},lanes:{display:"flex","&>div:last-child":{marginLeft:"auto"}},orange:{color:e.palette.getContrastText(h.a[500]),backgroundColor:h.a[500]},bot:{fontSize:"35px"},step:{display:"flex",flexDirection:"column","&>div:nth-child(2)":{marginLeft:"auto"},"& svg":{position:"relative",top:"6px"}}}})),U=function(){var e=G(),t=Object(s.useState)(0),n=Object(l.a)(t,2),a=n[0],r=n[1],i=Object(s.useState)(null),c=Object(l.a)(i,2),d=c[0],v=c[1],h=Object(s.useState)(null),b=Object(l.a)(h,2),O=b[0],S=b[1],j=Object(s.useState)(null),C=Object(l.a)(j,2),N=C[0],y=C[1],I=Object(s.useState)(!1),x=Object(l.a)(I,2),w=x[0],T=x[1],z=Object(s.useState)(!1),k=Object(l.a)(z,2),_=k[0],A=k[1],P=Object(s.useState)(!1),D=Object(l.a)(P,2),L=D[0],W=D[1],Y=Object(u.b)();Object(s.useEffect)((function(){Y(B()),Y(X())}),[]);var J=Object(u.c)((function(e){return e.physicians})),K=Object(u.c)((function(e){return e.cantons}));return o.a.createElement("div",null,o.a.createElement(m.a,{position:"static"},o.a.createElement(E.a,{className:e.toolbar},o.a.createElement(f.a,{variant:"h6",color:"inherit",className:e.title},"Lass uns diskutieren"),o.a.createElement(g.a,{fontSize:"large"}))),o.a.createElement("div",{className:e.content},o.a.createElement("section",{className:e.lanes},o.a.createElement("div",null,o.a.createElement(p.a,{alt:"bot",className:e.bot},o.a.createElement("span",null,"\ud83e\udd16"))),o.a.createElement("div",null,o.a.createElement(p.a,{alt:"you",className:e.orange},"Du"))),[o.a.createElement(R,{className:e.step,key:"step0",response:d,setResponse:v,setCurrentStep:r,options:K,isEditing:w,setIsEditing:T}),o.a.createElement(H,{className:e.step,key:"step1",response:O,setResponse:S,setCurrentStep:r,isEditing:_,setIsEditing:A}),o.a.createElement(F,{className:e.step,key:"step2",response:N,setResponse:y,setCurrentStep:r,options:J,isEditing:L,setIsEditing:W})].slice(0,a+1)))},V=n(22),Z=n(61);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(81);var $=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||V.d,Q=Object(V.e)(Object(V.c)(a),$(Object(V.a)(Z.a)));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(u.a,{store:Q},o.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.7393c540.chunk.js.map