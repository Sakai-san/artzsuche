(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],[,,,,function(t,e,n){t.exports=n(11)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),a=n(2),c=n.n(a),i=(n(9),n(3)),s=(n(10),function(){var t=Object(o.useState)([]),e=Object(i.a)(t,2),n=e[0],a=e[1];return Object(o.useEffect)((function(){fetch("https://api-tst.insurando.ch/v1/products/health/basic/doctorlist/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({InsurerId:"8",CantonId:"ZH",PostCode:"8600",CommunityNumber:191,TariffName:"Gesundheitspraxisversicherung T1"})}).then((function(t){return t.json()})).then((function(t){return a(t)}))}),[]),r.a.createElement("div",null,n.map((function(t){return r.a.createElement("div",null,JSON.stringify(t))})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.577b2513.chunk.js.map