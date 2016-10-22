import React from 'react';
import dictionary from '../helpers/dictionary';
import alphabet from '../helpers/alphabet';
import HiddenWord from '../components/HiddenWord';
import { browserHistory } from 'react-router';

const state={
   lives : 8,
   pts : 0,
   word : '',
   level: 1
}
// -------------------------------------
const Game = React.createClass({
   getInitialState(){
      return state;
   },
   componentWillMount(){
      this.getWord();
   },
   componentWillUpdate(props, state){
      if(state.lives<=0) browserHistory.push(`/gameover/${this.state.level}/${this.state.pts}`)
   },
   // -------------------------
   getLives(lives){
      let out = '';
      for(let i=0; i<lives; i++) out+='✪ ';
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
   nextLevel(){
      this.getWord();
      let newLevel = this.state.level+1;
      this.setState({level:newLevel}, function(){
         browserHistory.push('/gioca/'+this.state.level)
      })
   },
   newGame(){
      browserHistory.push('/')
   },
   render(){
      return (
         <div className="gameWrapper">
            <div className="game-header">
              <div className="game-header-content">
                 <div className="score">
                    <div className="score-wrapper">
                    <div className="abs">
                      <strong>{this.state.pts}</strong>
                    </div>
                       <span>punti</span>
                    </div>
                 </div>
                 <div className="level">
                   <div className="level-wrapper">
                     <div className="abs">
                       <strong>{this.state.level}</strong>
                     </div>
                     <span>livello</span>
                   </div>
                 </div>
                 <div className="lives">
                   <div className="lives-wrapper">
                    <div className="abs">
                      <strong>{this.getLives(this.state.lives)}</strong>
                    </div>
                    <span>vite</span>
                    </div>
                 </div>
               </div>
            </div>
            <div className="game-area">
               <HiddenWord
                  key={this.state.level}
                  word={this.state.word}
                  alphabet={alphabet}
                  addPoints={this.addPoints}
                  loseLife={this.loseLife}
                  nextLevel={this.nextLevel}>
               </HiddenWord>
            </div>
            <div className="game-footer">
               <button onClick={()=>this.nextLevel()}>Next Level</button>
               game footer
            </div>
         </div>
      )
   }
})
Game.contextTypes={
   router: React.PropTypes.object
}
export default Game;
