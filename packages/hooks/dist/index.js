'use strict';

var react = require('react');

var m=t=>{react.useEffect(()=>{t==null||t();},[]);};var x=t=>{react.useEffect(()=>()=>{t==null||t();},[]);};var d=()=>{let[,t]=react.useState({});return react.useCallback(()=>{t({});},[])};

exports.useMount = m;
exports.useUnmount = x;
exports.useUpdate = d;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map