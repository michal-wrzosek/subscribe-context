(window.webpackJsonpexample=window.webpackJsonpexample||[]).push([[0],{14:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var r=t(0),u=t.n(r),i=t(2),a=t.n(i),c=(t(14),t(3)),o=t(4),s=t(6),l=t(5),f=t(7),v=function(){return function(e){var n=this;this.counter=0,this.initialValue=null,this.value=null,this.subscribers={},this.next=function(e){if("function"===typeof e){var t=e(n.value);if(t instanceof Promise)t.then(function(e){n.value=e,Object.values(n.subscribers).forEach(function(n){return n(e)})}).catch(function(){});else{var r=t;n.value=r,Object.values(n.subscribers).forEach(function(e){return e(r)})}}else{var u=e;n.value=u,Object.values(n.subscribers).forEach(function(e){return e(u)})}},this.subscribe=function(e){var t=""+n.counter++;return n.subscribers[t]=e,{unsubscribe:function(){delete n.subscribers[t]}}},this.destroy=function(){n.value=n.initialValue,n.subscribers={}},this.getValue=function(){return n.value},this.initialValue=e,this.value=e}}(),b=function(e){var n=e.initialValue,t={subject:new v(n)},r=u.a.createContext(t);return{Provider:function(e){var n=e.children;return u.a.createElement(r.Provider,{value:t},n)},useInitialValue:function(){return u.a.useContext(r).subject.getValue()},useSubscription:function(e){var n=u.a.useContext(r).subject;u.a.useEffect(function(){var t=n.subscribe(e);return function(){return t.unsubscribe()}})},useValue:function(){var e=u.a.useContext(r).subject,n=e.getValue(),t=u.a.useState(n),i=t[0],a=t[1];return u.a.useEffect(function(){var n=e.subscribe(function(e){return a(e)});return function(){return n.unsubscribe()}}),i},useSetValue:function(){return u.a.useContext(r).subject.next},useValueWithSubscription:function(e){var n=u.a.useContext(r).subject,t=n.getValue(),i=u.a.useState(t),a=i[0],c=i[1],o=u.a.useRef(t);return u.a.useEffect(function(){var t=n.subscribe(function(n){var t=e(n,o.current);o.current=n,t&&c(n)});return function(){return t.unsubscribe()}}),a}}}({initialValue:void 0}),d=function(){console.log("ClearSelectionBtn rendered");var e=b.useSetValue();return u.a.createElement("div",{onClick:function(){return e(function(e){return new Promise(function(n,t){return void 0===e?t():n(void 0)})})}},"Clear selection")},m=function(){console.log("SelectedItem rendered");var e=b.useValue();return"undefined"!==typeof e?u.a.createElement("div",null,"Selected item: ",e):u.a.createElement("div",null,"No item is selected")},h=function(e){var n=e.item;console.log("Item ".concat(n," rendered"));var t=b.useValueWithSubscription(function(e,t){return t===n&&e!==n||t!==n&&e===n}),r=b.useSetValue(),i=t===n;return u.a.createElement("div",{style:{backgroundColor:i?"red":"transparent"},onClick:function(){return r(function(e){return e===n?void 0:n})}},"Item: ",n)},E=function(e){var n=e.items;return console.log("ItemList rendered"),u.a.createElement("div",null,n.map(function(e){return u.a.createElement(h,{key:e,item:e})}))},p=["one","two","three","four","five","six","seven","eight","nine"],V=function(e){function n(){return Object(c.a)(this,n),Object(s.a)(this,Object(l.a)(n).apply(this,arguments))}return Object(f.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){return u.a.createElement(b.Provider,null,u.a.createElement(d,null),u.a.createElement(m,null),u.a.createElement(E,{items:p}))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(u.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,n,t){e.exports=t(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.8a447b30.chunk.js.map