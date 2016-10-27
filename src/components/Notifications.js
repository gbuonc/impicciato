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
   notificationColor(){
      var colorsArr=['#69D2E7','#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'];
      return colorsArr[Math.floor(Math.random()*colorsArr.length)];
   },
   darkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
   },
   showNotifications(){
      return this.state.notifications.map((notification, i)=>{
         const textColor = this.notificationColor();
         const borderColor = this.darkenColor(textColor, -20);
         const notificationStyle={
            color: textColor,
            WebkitTextStroke: `2px ${borderColor}`
         }
         return (
            <div key={Date.now()} className="notification-content bounceInOut" style={notificationStyle}>
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
