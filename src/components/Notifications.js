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
      const helpDiff = nextProps.helps - this.props.helps;
      const combo = nextProps.combo;
      let type;
      if(ptsDiff > 0){
         type = combo > 1 ? 'combo' : 'normal';
         this.pushNotification(type, ptsDiff, combo);
      }
      if(levelDiff > 0){
         type = 'level';
         this.pushNotification(type, Number(this.props.level)+1, combo, livesDiff);
      }
      if(livesDiff < 0 || helpDiff !== 0){
          this.pushNotification('clear');
      }
      if(livesDiff > 0){
          this.pushNotification('newLife');
      }
   },
   pushNotification(type, value, combo, livesDiff){
      let message, row2;
      switch(type){
         case 'normal':
            message = `+${value}pts`;
         break;
         case 'combo':
            message =  `COMBO ${combo}!`;
            row2 = `+${value}pts`;
         break;
         case 'level':
            const motivation = ['OK', 'GRANDE', 'BRAVO', 'OTTIMO', 'ALLAFACCIA', 'SUPER'];
            const nextLevel = Number(this.props.level)+1;
            message = `${motivation[Math.floor(Math.random()*motivation.length)]}!`;
            row2 = `Livello ${nextLevel}`;
         break;
         case 'newLife':
            message =`+ 1 vita!`;
         break;
         default:
            message = '';
         break;
      }
      const notification = {type, message, row2};
      // remove old notifications already triggered
      const triggeredNotifications = this.state.notifications;
      if(triggeredNotifications.length > 3) triggeredNotifications.shift();
      triggeredNotifications.push(notification);
      const singleNotification = [];
      singleNotification.push(notification);
      this.setState({
         notifications : singleNotification
      });
   },
   notificationColor(){
      var colorsArr=['#69D2E7','#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'];
      return colorsArr[Math.floor(Math.random()*colorsArr.length)];
   },
   darkenColor(col, amt) {
    var usePound = false;
    if (col[0] === "#") {
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
               <div>{notification.message}</div>
               <div>{notification.row2}</div>
               <div>{notification.row3}</div>
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
