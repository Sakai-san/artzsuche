(this.webpackJsonpartzsuche=this.webpackJsonpartzsuche||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(2),c=n.n(a),i=(n(9),n(3)),s=(n(10),function(){var e=Object(o.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1];return Object(o.useEffect)((function(){fetch("https://api-dev.insurando.ch/v1/products/health/basic/doctorlist",{method:"POST",headers:{Accept:"de-CH"},body:JSON.stringify({InsurerId:"8",CantonId:"ZH",PostCode:"8600",CommunityNumber:191,TariffName:"Gesundheitspraxisversicherung T1"})}).then((function(e){return e.json()})).then((function(e){return a(e)}))}),[]),r.a.createElement("div",null,n.map((function(e){return r.a.createElement("div",null,JSON.stringify(e))})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.8ec0aed9.chunk.js.map