(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],{71:function(e,t,n){e.exports=n(82)},81:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"physicians",(function(){return B})),n.d(a,"cantons",(function(){return X}));var i,s=n(0),o=n.n(s),r=n(9),c=n.n(r),l=n(13),u=n(30),d=n(119),m=n(130),p=n(125),E=n(126),f=n(127),b=n(61),h=n.n(b),v=n(124),g=n(56),O=n.n(g),j=n(129),S=n(128),y=n(24),N=n.n(y),C=Object(d.a)((function(e){return{inputElementVisible:{visibility:"visible",opacity:1,transition:"opacity 2s linear"},inputElementHidden:{visibility:"hidden",opacity:0}}})),I=function(e){var t=e.isHidden,n=e.children,a=C();return o.a.createElement("div",{className:t?a.inputElementHidden:a.inputElementVisible},n)},x=n(83),T=n(55),z=n.n(T),H=Object(d.a)((function(e){return{response:{display:"flex",alignItems:"flex-end","&> svg":{marginLeft:"10px"}}}})),w=function(e){var t=e.response,n=e.setResponse,a=e.setIsEditing,i=H();return o.a.createElement("div",{className:i.response},o.a.createElement(x.a,{style:{padding:"20px"}},t),o.a.createElement(z.a,{fontSize:"small",onClick:function(e){a(!0),n(null)}}))},D=n(27),k=function(e){var t=Object(s.useRef)(null);return Object(s.useEffect)((function(){var e,n,a;null===t||void 0===t||null===(e=t.current)||void 0===e||null===(n=e.querySelector("input"))||void 0===n||null===(a=n.focus)||void 0===a||a.call(n)}),e?Object(D.a)(e):[]),t},R=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentQuestion,i=e.className,r=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(s.useState)(!0),m=Object(l.a)(d,2),p=m[0],E=m[1],f=k([t,p]);return o.a.createElement("section",{className:i},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},o.a.createElement(O.a,{fontSize:"large"}),o.a.createElement("span",{style:{fontSize:"18px"}},"Im welchem Kanton wohnst du ?")))),o.a.createElement("div",null,t?o.a.createElement(w,{response:t,setIsEditing:u,setResponse:n}):o.a.createElement(I,{isHidden:p},o.a.createElement(j.a,{options:r,getOptionLabel:function(e){return e},style:{width:300},onChange:function(e,t){n(t),!c&&a(1)},renderInput:function(e){return o.a.createElement(S.a,Object.assign({},e,{label:"W\xe4hle bitte deinen Kanton",variant:"outlined",ref:f}))}}))))},_=n(59),A=n.n(_),P=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentQuestion,i=e.className,r=e.isEditing,c=e.setIsEditing,u=Object(s.useState)(!0),d=Object(l.a)(u,2),m=d[0],p=d[1],E=k([t,m]),f=Object(s.useState)(!1),b=Object(l.a)(f,2),h=b[0],v=b[1];return o.a.createElement("section",{className:i},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return p(!1)}},o.a.createElement(A.a,{fontSize:"large"}),o.a.createElement("span",{style:{fontSize:"18px"}},"Was ist die Postleitzahl deines Wohnortes ?")))),o.a.createElement("div",null,t?o.a.createElement(w,{response:t,setIsEditing:c,setResponse:n}):o.a.createElement(I,{isHidden:m},o.a.createElement(S.a,{ref:E,onChange:function(e){var t,i=e.target.value;!(t=i)||4!==t.length||t.startsWith("0")?v(!0):(v(!1),setTimeout((function(){n(i),!r&&a(2)}),500))},error:h,label:"PLZ",type:"number",variant:"outlined"}))))},W=n(60),q=n.n(W),F=function(e){var t=e.response,n=e.setResponse,a=e.setCurrentQuestion,i=e.className,r=e.options,c=e.isEditing,u=e.setIsEditing,d=Object(s.useState)(!0),m=Object(l.a)(d,2),p=m[0],E=m[1],f=k([t,p]);return o.a.createElement("section",{className:i},o.a.createElement("div",null,o.a.createElement("span",null,o.a.createElement(N.a,{cursor:{hideWhenDone:!0},onTypingDone:function(){return E(!1)}},o.a.createElement(q.a,{fontSize:"large"}),o.a.createElement("span",{style:{fontSize:"18px"}},"W\xe4hle einen Artz / eine Artzin ?")))),o.a.createElement("div",null,t?o.a.createElement(w,{response:t,setIsEditing:u,setResponse:n}):o.a.createElement(I,{isHidden:p},o.a.createElement(j.a,{options:r,getOptionLabel:function(e){return"".concat(null===e||void 0===e?void 0:e.ProductDoctorname,", ").concat(null===e||void 0===e?void 0:e.ProductDoctorCom)||""},style:{width:300},onChange:function(e,t){n("".concat(null===t||void 0===t?void 0:t.ProductDoctorname,", ").concat(null===t||void 0===t?void 0:t.ProductDoctorCom)),!c&&a(2)},renderInput:function(e){return o.a.createElement(S.a,Object.assign({},e,{label:"Suche nach einem/er Artz/in",variant:"outlined",ref:f}))}}))))};!function(e){e.PHYSICIANS_FETCH="@PHYSICIANS/fetch"}(i||(i={}));var L,Q=function(e){return e.type===i.PHYSICIANS_FETCH},Y=function(e){return{type:i.PHYSICIANS_FETCH,payload:e}},V=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/physicians.json").then((function(e){return e.json()})).then((function(t){return e(Y(t||[]))}))}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return Q(t)?Object(D.a)(t.payload):e};!function(e){e.CANTONS_FETCH="@CANTONS/fetch"}(L||(L={}));var J=function(e){return e.type===L.CANTONS_FETCH},K=function(e){return{type:L.CANTONS_FETCH,payload:e}},M=function(){return function(e){fetch("https://sakai-san.github.io/artzsuche/cantons.json").then((function(e){return e.json()})).then((function(t){return e(K(t||[]))}))}},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return J(t)?Object(D.a)(t.payload):e},G=Object(d.a)((function(e){return{toolbar:{backgroundColor:"#FF51A1",minHeight:80},title:{flexGrow:1},content:{width:"90%",padding:"40px","&>section:not(:first-child)":{padding:"5px",marginTop:"30px",borderRadius:"6px 6px"}},lanes:{display:"flex","&>div:last-child":{marginLeft:"auto"}},orange:{color:e.palette.getContrastText(v.a[500]),backgroundColor:v.a[500]},bot:{fontSize:"35px"},question:{display:"flex",flexDirection:"column","&>div:nth-child(2)":{marginLeft:"auto"},"& svg":{position:"relative",top:"6px"}}}})),U=function(){var e=G(),t=Object(s.useState)(0),n=Object(l.a)(t,2),a=n[0],i=n[1],r=Object(s.useState)(null),c=Object(l.a)(r,2),d=c[0],b=c[1],v=Object(s.useState)(null),g=Object(l.a)(v,2),O=g[0],j=g[1],S=Object(s.useState)(null),y=Object(l.a)(S,2),N=y[0],C=y[1],I=Object(s.useState)(!1),x=Object(l.a)(I,2),T=x[0],z=x[1],H=Object(s.useState)(!1),w=Object(l.a)(H,2),D=w[0],k=w[1],_=Object(s.useState)(!1),A=Object(l.a)(_,2),W=A[0],q=A[1],L=Object(u.b)();Object(s.useEffect)((function(){L(V()),L(M())}),[]);var Q=Object(u.c)((function(e){return e.physicians})),Y=Object(u.c)((function(e){return e.cantons}));return o.a.createElement("div",null,o.a.createElement(p.a,{position:"static"},o.a.createElement(E.a,{className:e.toolbar},o.a.createElement(f.a,{variant:"h6",color:"inherit",className:e.title},"Lass uns diskutieren"),o.a.createElement(h.a,{fontSize:"large"}))),o.a.createElement("div",{className:e.content},o.a.createElement("section",{className:e.lanes},o.a.createElement("div",null,o.a.createElement(m.a,{alt:"bot",className:e.bot},o.a.createElement("span",null,"\ud83e\udd16"))),o.a.createElement("div",null,o.a.createElement(m.a,{alt:"you",className:e.orange},"Du"))),[o.a.createElement(R,{className:e.question,key:"question0",response:d,setResponse:b,setCurrentQuestion:i,isEditing:T,setIsEditing:z,options:Y}),o.a.createElement(P,{className:e.question,key:"question1",response:O,setResponse:j,setCurrentQuestion:i,isEditing:D,setIsEditing:k}),o.a.createElement(F,{className:e.question,key:"question2",response:N,setResponse:C,setCurrentQuestion:i,isEditing:W,setIsEditing:q,options:Q})].slice(0,a+1)))},Z=n(21),$=n(62);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(81);var ee=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Z.d,te=Object(Z.e)(Object(Z.c)(a),ee(Object(Z.a)($.a)));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(u.a,{store:te},o.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.b1c81712.chunk.js.map