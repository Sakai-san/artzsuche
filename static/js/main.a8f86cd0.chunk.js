(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],{71:function(e,t,n){e.exports=n(82)},81:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"physicians",(function(){return J})),n.d(a,"cantons",(function(){return q}));var i,s=n(0),r=n.n(s),o=n(9),c=n.n(o),l=n(13),u=n(21),d=n(119),p=n(130),m=n(125),E=n(126),f=n(127),h=n(60),b=n.n(h),v=n(124),g=n(55),O=n.n(g),j=n(129),S=n(128),y=n(25),C=n.n(y),N=n(83),I=n(54),T=n.n(I),x=Object(d.a)((function(e){return{response:{display:"flex",alignItems:"flex-end","&> svg":{marginLeft:"10px"}}}})),w=function(e){var t=e.response,n=e.setResponse,a=e.setIsEditing,i=x();return r.a.createElement("div",{className:i.response},r.a.createElement(N.a,{style:{padding:"20px"}},t),r.a.createElement(T.a,{fontSize:"small",onClick:function(e){a(!0),n(null)}}))},z=n(28),D=function(e){var t=Object(s.useRef)(null);return Object(s.useEffect)((function(){var e,n,a;null===t||void 0===t||null===(e=t.current)||void 0===e||null===(n=e.querySelector("input"))||void 0===n||null===(a=n.focus)||void 0===a||a.call(n)}),e?Object(z.a)(e):[]),t},k=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(s.useState)(!0),p=Object(l.a)(d,2),m=p[0],E=p[1],f=D([t,m]);return r.a.createElement("section",{className:i},r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement(C.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},r.a.createElement(O.a,{fontSize:"large"})," Im welchem Kanton wohnst du ?"))),r.a.createElement("div",null,t?r.a.createElement(w,{response:t,setIsEditing:u,setResponse:n}):r.a.createElement(j.a,{options:o,getOptionLabel:function(e){return e},style:{width:300,visibility:m?"hidden":"visible"},onChange:function(e,t){n(t),!c&&a(1)},renderInput:function(e){return r.a.createElement(S.a,Object.assign({},e,{label:"W\xe4hle bitte deinen Kanton",variant:"outlined",ref:f}))}})))},R=n(58),_=n.n(R),A=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.isEditing,c=e.setIsEditing,u=Object(s.useState)(!0),d=Object(l.a)(u,2),p=d[0],m=d[1],E=D([t,p]),f=Object(s.useState)(!1),h=Object(l.a)(f,2),b=h[0],v=h[1];return r.a.createElement("section",{className:i},r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement(C.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return m(!1)}},r.a.createElement(_.a,{fontSize:"large"}),"Was ist die Postleitzahl deines Wohnortes ?"))),r.a.createElement("div",null,t?r.a.createElement(w,{response:t,setIsEditing:c,setResponse:n}):r.a.createElement(S.a,{style:{visibility:p?"hidden":"visible"},ref:E,onChange:function(e){var t,i=e.target.value;!(t=i)||4!==t.length||t.startsWith("0")?v(!0):(v(!1),setTimeout((function(){n(i),!o&&a(2)}),500))},error:b,label:"PLZ",type:"number",variant:"outlined"})))},H=n(59),P=n.n(H),W=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(s.useState)(!0),p=Object(l.a)(d,2),m=p[0],E=p[1],f=D([t,m]);return r.a.createElement("section",{className:i},r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement(C.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},r.a.createElement(P.a,{fontSize:"large"}),"W\xe4hle einen Artz / eine Artzin ?"))),r.a.createElement("div",null,t?r.a.createElement(w,{response:t,setIsEditing:u,setResponse:n}):r.a.createElement(j.a,{options:o,getOptionLabel:function(e){return"".concat(null===e||void 0===e?void 0:e.ProductDoctorname,", ").concat(null===e||void 0===e?void 0:e.ProductDoctorCom)||""},style:{width:300,visibility:m?"hidden":"visible"},onChange:function(e,t){n("".concat(null===t||void 0===t?void 0:t.ProductDoctorname,", ").concat(null===t||void 0===t?void 0:t.ProductDoctorCom)),!c&&a(2)},renderInput:function(e){return r.a.createElement(S.a,Object.assign({},e,{label:"Suche nach einem/er Artz/in",variant:"outlined",ref:f}))}})))};!function(e){e.PHYSICIANS_FETCH="@PHYSICIANS/fetch"}(i||(i={}));var F,L=function(e){return e.type===i.PHYSICIANS_FETCH},Y=function(e){return{type:i.PHYSICIANS_FETCH,payload:e}},B=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/physicians.json").then((function(e){return e.json()})).then((function(t){return e(Y(t||[]))}))}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return L(t)?Object(z.a)(t.payload):e};!function(e){e.CANTONS_FETCH="@CANTONS/fetch"}(F||(F={}));var K=function(e){return e.type===F.CANTONS_FETCH},M=function(e){return{type:F.CANTONS_FETCH,payload:e}},X=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/cantons.json").then((function(e){return e.json()})).then((function(t){return e(M(t||[]))}))}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return K(t)?Object(z.a)(t.payload):e},G=Object(d.a)((function(e){return{toolbar:{backgroundColor:"#FF51A1",minHeight:80},title:{flexGrow:1},content:{width:"90%",padding:"40px","&>section:not(:first-child)":{padding:"5px",marginTop:"30px",borderRadius:"6px 6px"}},lanes:{display:"flex","&>div:last-child":{marginLeft:"auto"}},orange:{color:e.palette.getContrastText(v.a[500]),backgroundColor:v.a[500]},bot:{fontSize:"35px"},step:{display:"flex",flexDirection:"column","&>div:nth-child(2)":{marginLeft:"auto"},"& svg":{position:"relative",top:"6px"}}}})),U=function(){var e=G(),t=Object(s.useState)(0),n=Object(l.a)(t,2),a=n[0],i=n[1],o=Object(s.useState)(null),c=Object(l.a)(o,2),d=c[0],h=c[1],v=Object(s.useState)(null),g=Object(l.a)(v,2),O=g[0],j=g[1],S=Object(s.useState)(null),y=Object(l.a)(S,2),C=y[0],N=y[1],I=Object(s.useState)(!1),T=Object(l.a)(I,2),x=T[0],w=T[1],z=Object(s.useState)(!1),D=Object(l.a)(z,2),R=D[0],_=D[1],H=Object(s.useState)(!1),P=Object(l.a)(H,2),F=P[0],L=P[1],Y=Object(u.b)();Object(s.useEffect)((function(){Y(B()),Y(X())}),[]);var J=Object(u.c)((function(e){return e.physicians})),K=Object(u.c)((function(e){return e.cantons}));return r.a.createElement("div",null,r.a.createElement(m.a,{position:"static"},r.a.createElement(E.a,{className:e.toolbar},r.a.createElement(f.a,{variant:"h6",color:"inherit",className:e.title},"Lass uns diskutieren"),r.a.createElement(b.a,{fontSize:"large"}))),r.a.createElement("div",{className:e.content},r.a.createElement("section",{className:e.lanes},r.a.createElement("div",null,r.a.createElement(p.a,{alt:"bot",className:e.bot},r.a.createElement("span",null,"\ud83e\udd16"))),r.a.createElement("div",null,r.a.createElement(p.a,{alt:"you",className:e.orange},"Du"))),[r.a.createElement(k,{className:e.step,key:"step0",response:d,setResponse:h,setCurrentStep:i,options:K,isEditing:x,setIsEditing:w}),r.a.createElement(A,{className:e.step,key:"step1",response:O,setResponse:j,setCurrentStep:i,isEditing:R,setIsEditing:_}),r.a.createElement(W,{className:e.step,key:"step2",response:C,setResponse:N,setCurrentStep:i,options:J,isEditing:F,setIsEditing:L})].slice(0,a+1)))},V=n(22),Z=n(61);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(81);var $=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||V.d,Q=Object(V.e)(Object(V.c)(a),$(Object(V.a)(Z.a)));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:Q},r.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.a8f86cd0.chunk.js.map