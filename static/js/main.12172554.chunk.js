(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],[,,,,function(e,n,t){e.exports=t(11)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),a=t(2),c=t.n(a),i=(t(9),t(3)),s=(t(10),function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1];return Object(o.useEffect)((function(){fetch("https://api-dev.insurando.ch/v1/products/health/basic/doctorlist",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","Accept-Language":"de-CH","Content-Language":"de-CH"},body:JSON.stringify({InsurerId:"8",CantonId:"ZH",PostCode:"8600",CommunityNumber:191,TariffName:"Gesundheitspraxisversicherung T1"})}).then((function(e){return e.json()})).then((function(e){return a(e)}))}),[]),r.a.createElement("div",null,t.map((function(e){return r.a.createElement("div",null,JSON.stringify(e))})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.12172554.chunk.js.map