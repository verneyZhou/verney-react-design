'use strict';

var react = require('react');

var f=t=>{react.useEffect(()=>{t?.();},[]);};var n=t=>{react.useEffect(()=>()=>{t?.();},[]);};var a=()=>{let[,t]=react.useState({});return react.useCallback(()=>{t({});},[])};

exports.useMount = f;
exports.useUnmount = n;
exports.useUpdate = a;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map