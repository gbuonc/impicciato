import React from 'react';
import { browserHistory } from 'react-router';
import dictionary from '../helpers/dictionary';
import Score from '../components/stateless/Score';
import Level from '../components/stateless/Level';
import Lives from '../components/stateless/Lives';
import GameUi from '../components/GameUi';
import Notification from '../components/Notification';

const state={
   lives : 8,
   pts : 0,
   word : '',
   level: 1,
   notifications:[]
}

// -------------------------------------
const Game = React.createClass({
   getInitialState(){
      return state;
   },
   componentWillMount(){this.timeouts = []; this.getWord()},
   componentWillUnmount(){this.clearTimeouts()},
   setTimeout(){this.timeouts.push(setTimeout.apply(null, arguments))},
   clearTimeouts(){this.timeouts.forEach(clearTimeout)},
   componentWillUpdate(props, state){
      if(state.lives<=0) browserHistory.push(`/gameover/${this.state.level}/${this.state.pts}`)
   },
   getWord(){
      let randomIndex = Math.floor(Math.random()*dictionary.length);
      this.setState({word: dictionary[randomIndex].toUpperCase()});
   },
   addPoints(type, value){
      const actualType = value !==0 ? type : null;
      this.pushNotification(actualType, value);
      this.setState({pts : this.state.pts+value});
   },
   loseLife(){
      this.setState({lives : this.state.lives-1});
   },
   nextLevel(){
      this.clearTimeouts();
      let newLevel = this.state.level+1;
      this.setTimeout(function(){
         this.getWord();
         this.setState({level:newLevel}, function(){
            this.pushNotification('level', this.state.level);
            browserHistory.push('/game/'+this.state.level);
         })
      }.bind(this), 2000);
   },
   pushNotification(type, value){
      const notifications = this.state.notifications;
      let message;
      switch(type){
         case 'points':
            message = `+${value}pts`;
         break;
         case 'combo':
            message =  `COMBO! +${value}pts`;
         break;
         case 'level':
            const motivation = ['OK', 'GRANDE', 'BRAVO', 'OTTIMO', 'ALLAFACCIA', 'SUPER'];
            message = `${motivation[Math.floor(Math.random()*motivation.length)]}! Livello ${value}`;
         break;
         default:
            message = '';
         break;
      }
      if(type){
         const notification = {type, message};
         notifications.push(notification);
         // remove old notifications already triggered
         // if(notifications.length > 3) notifications.shift();
         this.setState({notifications});
      }
   },
   showNotifications(){
      return this.state.notifications.map((notification, i)=>{
         return (
            <Notification key={i} remove={this.removeNotification}>{notification.message}</Notification>
         )
      })
   },
   render(){
      return (
         <div className="gameWrapper">
            <div className="game-header">
               <div className="game-header-content">
                  <Score>{this.state.pts}</Score>
                  <Level>{this.state.level}</Level>
                  <Lives>{this.state.lives}</Lives>
               </div>
            </div>
            <div className="game-area">
               <GameUi
                  key={this.state.level}
                  word={this.state.word}
                  addPoints={this.addPoints}
                  loseLife={this.loseLife}
                  nextLevel={this.nextLevel} />
            </div>
            <div className="game-footer">
               <button onClick={()=>this.nextLevel()}>Next Level</button>
            </div>
            <div className="notifications">
               {this.showNotifications()}
            </div>
         </div>
      )
   }
})

export default Game;
