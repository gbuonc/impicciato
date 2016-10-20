import React from 'react';
import dictionary from './dictionary';
import HiddenWord from './components/HiddenWord';

const state={
   playerName : 'Ospite',
   lives : 5,
   pts : 0,
   word : '',
   newGame : false
}
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'];
// -------------------------------------
const Game = React.createClass({
   getInitialState(){
      return state;
   },
   getLives(lives){
      let out = '';
      for(let i=0; i<lives; i++) out+='● ';
      return (
         <div className="lives">{out}</div>
      )
   },
   getWord(){
      const words = dictionary.length;
      let randomIndex = Math.floor(Math.random()*words);
      this.setState({word: dictionary[randomIndex].toUpperCase()});
   },
   addPoints(points){
      this.setState({pts : this.state.pts+points});
   },
   loseLife(){
      this.setState({lives : this.state.lives-1});
   },
   newGame(){
      this.setState(state);
      this.getWord();
   },
   alert(){
      if(this.state.lives <= 0){
         return(
            <div>Azz, hai perso!<br />
               <button onClick={()=>this.newGame()}>Gioca Ancora</button>
            </div>
               )
      }
   },
   componentWillMount(){
      this.getWord();
   },
   render(){
      return (
         <div className="gameWrapper">
            <div className="game-header">
               <div className="score"><strong>{this.state.pts}</strong> pts</div>
               <div className="playerName">{this.state.playerName}</div>
               {this.getLives(this.state.lives)}
            </div>
            <div className="game-area">
               <HiddenWord
                  word={this.state.word}
                  alphabet={alphabet}
                  addPoints={this.addPoints}
                  loseLife={this.loseLife}>
               </HiddenWord>
            </div>
            <div className="alert">
               {this.alert()}
            </div>
         </div>
      )
   }
})

export default Game;
