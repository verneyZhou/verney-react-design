import { useEffect, useState, useCallback } from 'react';

var f=t=>{useEffect(()=>{t?.();},[]);};var n=t=>{useEffect(()=>()=>{t?.();},[]);};var a=()=>{let[,t]=useState({});return useCallback(()=>{t({});},[])};

export { f as useMount, n as useUnmount, a as useUpdate };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map