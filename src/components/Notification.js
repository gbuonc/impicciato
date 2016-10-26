import React from 'react';
const Notification = React.createClass({
   componentWillMount(){this.timeouts = []},
   componentWillUnmount(){this.clearTimeouts()},
   setTimeout(){this.timeouts.push(setTimeout.apply(null, arguments))},
   clearTimeouts(){this.timeouts.forEach(clearTimeout)},
   render(){
      return(
         <div className="notification-content bounceInOut">
            {this.props.children}
         </div>
      )
   }
});
export default Notification;
