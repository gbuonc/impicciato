import React from 'react';

const Notifications = React.createClass({
   getInitialState(){
      return{
         notifications :[]
      }
   },
   componentWillReceiveProps(nextProps){
      const ptsDiff = nextProps.pts - this.props.pts;
      const levelDiff = nextProps.level - this.props.level;
      const livesDiff = nextProps.lives - this.props.lives;
      let type;
      if(ptsDiff > 0){
         type = ptsDiff > 10 ? 'combo' : 'normal';
         this.pushNotification(type, ptsDiff);
      }
      if(levelDiff > 0){
         type = 'level';
         this.pushNotification(type, Number(this.props.level)+1);
      }
      if(livesDiff < 0){
         this.pushNotification('clear');
      }
   },
   pushNotification(type, value){
      let message;
      switch(type){
         case 'normal':
            message = `+${value}pts`;
         break;
         case 'combo':
            message =  `COMBO! +${value}pts`;
         break;
         case 'level':
            const motivation = ['OK', 'GRANDE', 'BRAVO', 'OTTIMO', 'ALLAFACCIA', 'SUPER'];
            message = `${motivation[Math.floor(Math.random()*motivation.length)]}! Livello ${Number(this.props.level)+1}`;
         break;
         default:
            message = '';
         break;
      }
      const notification = {type, message};
      // remove old notifications already triggered
      const triggeredNotifications = this.state.notifications;
      if(triggeredNotifications.length > 3) triggeredNotifications.shift();
      triggeredNotifications.push(notification);
      const singleNotification = [];
      singleNotification.push(notification);
      this.setState({notifications : singleNotification});
   },
   showNotifications(){
      return this.state.notifications.map((notification, i)=>{
         return (
            <div key={Date.now()}className="notification-content bounceInOut">
               {notification.message}
            </div>
         )
      })
   },
   render(){
      return(
         <div className="notifications">
            {this.showNotifications()}
         </div>
      )
   }
});
export default Notifications;
