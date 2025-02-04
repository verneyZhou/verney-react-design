import { useEffect, useState, useCallback } from 'react';

var m=t=>{useEffect(()=>{t==null||t();},[]);};var x=t=>{useEffect(()=>()=>{t==null||t();},[]);};var d=()=>{let[,t]=useState({});return useCallback(()=>{t({});},[])};

export { m as useMount, x as useUnmount, d as useUpdate };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map