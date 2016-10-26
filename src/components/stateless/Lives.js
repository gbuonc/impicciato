import React from 'react';
const Lives = (props)=>{
   let out = '';
   for(let i=0; i<props.children; i++) out+='✪ ';
   return(
      <div className="lives">
         <div className="lives-wrapper">
            <div className="abs">
               <strong>{out}</strong>
            </div>
            <span>vite</span>
         </div>
      </div>
   )
}
export default Lives;
