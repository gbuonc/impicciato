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
const Score = (score)=>(
   <div className="score">
      <div className="score-wrapper">
         <div className="abs">
            <strong>{score.points}</strong>
         </div>
         <span>punti</span>
      </div>
   </div>
)
const Lives = (lives)=>{
   let out = '';
   for(let i=0; i<lives.left; i++) out+='✪ ';
   return(
      <div className="lives">
         <div className="lives-wrapper">
            <div className="abs">
               <strong>{out}</strong>
            </div>
            <span>vite</span>
         </div>
      </div>
   )
}
const Level = (level)=>(
   <div className="level">
      <div className="level-wrapper">
         <div className="abs">
            <strong>{level.current}</strong>
         </div>
         <span>livello</span>
      </div>
   </div>
)


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
      this.clearTimeouts();
      this.setTimeout(function(){
         this.getWord();
         let newLevel = this.state.level+1;
         this.setState({level:newLevel}, function(){
            browserHistory.push('/game/'+this.state.level)
         })
      }.bind(this), 2000);
   },
   newGame(){
      browserHistory.push('/')
   },
   render(){
      return (
         <div className="gameWrapper">
            <div className="game-header">
               <div className="game-header-content">
                  <Score points={this.state.pts} />
                  <Level current={this.state.level} />
                  <Lives left={this.state.lives} />
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
            </div>
         </div>
      )
   }
})
Game.contextTypes={
   router: React.PropTypes.object
}
export default Game;
