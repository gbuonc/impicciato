import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Level = (props)=>(
   <div className="level">
      <div className="level-wrapper">
         <CSSTransitionGroup
            component="div"
            className="abs"
            transitionName="level"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <strong key={props.children}>{props.children}</strong>
         </CSSTransitionGroup>
         <span>livello</span>
      </div>
   </div>
)
export default Level;
