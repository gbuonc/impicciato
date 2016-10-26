import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Score = (props)=>(
   <div className="score">
      <div className="score-wrapper">
         <CSSTransitionGroup
            component="div"
            className="abs"
            transitionName="score"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            <strong key={props.children}>{props.children}</strong>
         </CSSTransitionGroup>
         <span>punti</span>
      </div>
   </div>
)
export default Score;
