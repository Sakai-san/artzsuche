(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],{71:function(e,t,n){e.exports=n(82)},81:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"physicians",(function(){return K})),n.d(a,"cantons",(function(){return G}));var i,r=n(0),s=n.n(r),o=n(9),c=n.n(o),l=n(13),u=n(21),d=n(119),p=n(130),m=n(125),E=n(126),f=n(127),b=n(61),h=n.n(b),v=n(124),g=n(56),O=n.n(g),j=n(129),S=n(128),y=n(25),N=n.n(y),C=Object(d.a)((function(e){return{inputElementVisible:{visibility:"visible",opacity:1,transition:"opacity 2s linear"},inputElementHidden:{visibility:"hidden",opacity:0,transition:"visibility 0s 2s, opacity 2s linear"}}})),I=function(e){var t=e.isHidden,n=e.children,a=C();return s.a.createElement("div",{className:t?a.inputElementHidden:a.inputElementVisible},n)},T=n(83),x=n(55),H=n.n(x),w=Object(d.a)((function(e){return{response:{display:"flex",alignItems:"flex-end","&> svg":{marginLeft:"10px"}}}})),z=function(e){var t=e.response,n=e.setResponse,a=e.setIsEditing,i=w();return s.a.createElement("div",{className:i.response},s.a.createElement(T.a,{style:{padding:"20px"}},t),s.a.createElement(H.a,{fontSize:"small",onClick:function(e){a(!0),n(null)}}))},D=n(28),k=function(e){var t=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e,n,a;null===t||void 0===t||null===(e=t.current)||void 0===e||null===(n=e.querySelector("input"))||void 0===n||null===(a=n.focus)||void 0===a||a.call(n)}),e?Object(D.a)(e):[]),t},R=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(r.useState)(!0),p=Object(l.a)(d,2),m=p[0],E=p[1],f=k([t,m]);return s.a.createElement("section",{className:i},s.a.createElement("div",null,s.a.createElement("span",null,s.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},s.a.createElement(O.a,{fontSize:"large"}),s.a.createElement("span",null,"Im welchem Kanton wohnst du ?")))),s.a.createElement("div",null,t?s.a.createElement(z,{response:t,setIsEditing:u,setResponse:n}):s.a.createElement(I,{isHidden:m},s.a.createElement(j.a,{options:o,getOptionLabel:function(e){return e},style:{width:300},onChange:function(e,t){n(t),!c&&a(1)},renderInput:function(e){return s.a.createElement(S.a,Object.assign({},e,{label:"W\xe4hle bitte deinen Kanton",variant:"outlined",ref:f}))}}))))},_=n(59),A=n.n(_),P=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.isEditing,c=e.setIsEditing,u=Object(r.useState)(!0),d=Object(l.a)(u,2),p=d[0],m=d[1],E=k([t,p]),f=Object(r.useState)(!1),b=Object(l.a)(f,2),h=b[0],v=b[1];return s.a.createElement("section",{className:i},s.a.createElement("div",null,s.a.createElement("span",null,s.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return m(!1)}},s.a.createElement(A.a,{fontSize:"large"}),s.a.createElement("span",null,"Was ist die Postleitzahl deines Wohnortes ?")))),s.a.createElement("div",null,t?s.a.createElement(z,{response:t,setIsEditing:c,setResponse:n}):s.a.createElement(I,{isHidden:p},s.a.createElement(S.a,{ref:E,onChange:function(e){var t,i=e.target.value;!(t=i)||4!==t.length||t.startsWith("0")?v(!0):(v(!1),setTimeout((function(){n(i),!o&&a(2)}),500))},error:h,label:"PLZ",type:"number",variant:"outlined"}))))},W=n(60),F=n.n(W),L=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentStep,i=e.className,o=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(r.useState)(!0),p=Object(l.a)(d,2),m=p[0],E=p[1],f=k([t,m]);return s.a.createElement("section",{className:i},s.a.createElement("div",null,s.a.createElement("span",null,s.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},s.a.createElement(F.a,{fontSize:"large"}),s.a.createElement("span",null,"W\xe4hle einen Artz / eine Artzin ?")))),s.a.createElement("div",null,t?s.a.createElement(z,{response:t,setIsEditing:u,setResponse:n}):s.a.createElement(I,{isHidden:m},s.a.createElement(j.a,{options:o,getOptionLabel:function(e){return"".concat(null===e||void 0===e?void 0:e.ProductDoctorname,", ").concat(null===e||void 0===e?void 0:e.ProductDoctorCom)||""},style:{width:300},onChange:function(e,t){n("".concat(null===t||void 0===t?void 0:t.ProductDoctorname,", ").concat(null===t||void 0===t?void 0:t.ProductDoctorCom)),!c&&a(2)},renderInput:function(e){return s.a.createElement(S.a,Object.assign({},e,{label:"Suche nach einem/er Artz/in",variant:"outlined",ref:f}))}}))))};!function(e){e.PHYSICIANS_FETCH="@PHYSICIANS/fetch"}(i||(i={}));var Y,V=function(e){return e.type===i.PHYSICIANS_FETCH},B=function(e){return{type:i.PHYSICIANS_FETCH,payload:e}},J=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/physicians.json").then((function(e){return e.json()})).then((function(t){return e(B(t||[]))}))}},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return V(t)?Object(D.a)(t.payload):e};!function(e){e.CANTONS_FETCH="@CANTONS/fetch"}(Y||(Y={}));var M=function(e){return e.type===Y.CANTONS_FETCH},X=function(e){return{type:Y.CANTONS_FETCH,payload:e}},q=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/cantons.json").then((function(e){return e.json()})).then((function(t){return e(X(t||[]))}))}},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return M(t)?Object(D.a)(t.payload):e},U=Object(d.a)((function(e){return{toolbar:{backgroundColor:"#FF51A1",minHeight:80},title:{flexGrow:1},content:{width:"90%",padding:"40px","&>section:not(:first-child)":{padding:"5px",marginTop:"30px",borderRadius:"6px 6px"}},lanes:{display:"flex","&>div:last-child":{marginLeft:"auto"}},orange:{color:e.palette.getContrastText(v.a[500]),backgroundColor:v.a[500]},bot:{fontSize:"35px"},step:{display:"flex",flexDirection:"column","&>div:nth-child(2)":{marginLeft:"auto"},"& svg":{position:"relative",top:"6px"}}}})),Z=function(){var e=U(),t=Object(r.useState)(0),n=Object(l.a)(t,2),a=n[0],i=n[1],o=Object(r.useState)(null),c=Object(l.a)(o,2),d=c[0],b=c[1],v=Object(r.useState)(null),g=Object(l.a)(v,2),O=g[0],j=g[1],S=Object(r.useState)(null),y=Object(l.a)(S,2),N=y[0],C=y[1],I=Object(r.useState)(!1),T=Object(l.a)(I,2),x=T[0],H=T[1],w=Object(r.useState)(!1),z=Object(l.a)(w,2),D=z[0],k=z[1],_=Object(r.useState)(!1),A=Object(l.a)(_,2),W=A[0],F=A[1],Y=Object(u.b)();Object(r.useEffect)((function(){Y(J()),Y(q())}),[]);var V=Object(u.c)((function(e){return e.physicians})),B=Object(u.c)((function(e){return e.cantons}));return s.a.createElement("div",null,s.a.createElement(m.a,{position:"static"},s.a.createElement(E.a,{className:e.toolbar},s.a.createElement(f.a,{variant:"h6",color:"inherit",className:e.title},"Lass uns diskutieren"),s.a.createElement(h.a,{fontSize:"large"}))),s.a.createElement("div",{className:e.content},s.a.createElement("section",{className:e.lanes},s.a.createElement("div",null,s.a.createElement(p.a,{alt:"bot",className:e.bot},s.a.createElement("span",null,"\ud83e\udd16"))),s.a.createElement("div",null,s.a.createElement(p.a,{alt:"you",className:e.orange},"Du"))),[s.a.createElement(R,{className:e.step,key:"step0",response:d,setResponse:b,setCurrentStep:i,options:B,isEditing:x,setIsEditing:H}),s.a.createElement(P,{className:e.step,key:"step1",response:O,setResponse:j,setCurrentStep:i,isEditing:D,setIsEditing:k}),s.a.createElement(L,{className:e.step,key:"step2",response:N,setResponse:C,setCurrentStep:i,options:V,isEditing:W,setIsEditing:F})].slice(0,a+1)))},$=n(22),Q=n(62);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(81);var ee=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||$.d,te=Object($.e)(Object($.c)(a),ee(Object($.a)(Q.a)));c.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(u.a,{store:te},s.a.createElement(Z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.51e7a564.chunk.js.map