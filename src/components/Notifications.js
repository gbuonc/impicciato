import React from 'react';

const Notifications = React.createClass({
   getInitialState(){
      return{
         notifications :[]
      }
   },
   componentWillReceiveProps(nextProps){
      console.log(nextProps.pts, this.props.pts);
      const ptsDiff = nextProps.pts - this.props.pts;
      const levelDiff = nextProps.level - this.props.level;
      let type;
      if(ptsDiff > 0){
         type = ptsDiff > 10 ? 'combo' : 'normal';
      }
      if(levelDiff > 0){
         type = 'level';
      }
      this.pushNotification(type, ptsDiff);
   },
   pushNotification(type, value){
      const notifications = this.state.notifications;
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
      if(type){
         const notification = {type, message};
         // remove old notifications already triggered
         const triggeredNotifications = this.state.notifications;
         if(triggeredNotifications.length > 3) triggeredNotifications.shift();
         triggeredNotifications.push(notification);
         const test = [];
         test.push(notification);
         this.setState({notifications : test});
      }
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
