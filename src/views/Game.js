import React from 'react';
import { browserHistory } from 'react-router';
import dictionary from '../dictionary/dictionary';
import alphabet from '../helpers/alphabet';
import GameUi from '../components/GameUi';
import Notifications from '../components/Notifications';

const state={
   lives : 10,
   pts : 0,
   combo: 1,
   word : '',
   category:'',
   level: 1,
   helps: 3
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
      if(state.lives<=0) this.endGame();
   },
   getWord(){
      // first get a random category
      const categories = Object.keys(dictionary);
      const category = categories[Math.floor(Math.random()*categories.length)];
      console.log(categories);
      // convert alphabet array to map object
      const difficultyMap= alphabet.reduce((p,n) => {
        p[n.char]=n.multip;
        return p;
      }, {});
      console.log(difficultyMap);
      var test = categories.map(el => dictionary[el]).map(arr => {
        return arr.map(word =>{
          const wordLength = word.length;
          const wordToArr = word.toUpperCase().split('');
          const total = wordToArr.reduce((p,n)=>{
            return p+difficultyMap[n];
          }, difficultyMap[wordToArr[0]]);
          const difficulty = total/wordLength;
          let obj = {word, wordLength, difficulty, total, difficulty};
          return obj;
        })
      });
      console.log(JSON.stringify(test));
      // remove a word from this category and set as playing word
      const randomIndex = Math.floor(Math.random()*dictionary[category].length);
      var word = dictionary[category].splice(randomIndex, 1)[0].toUpperCase();
      this.setState({word, category});
   },
   addPoints(lettersFound, points){
      const pointsToAdd =  lettersFound > 0 ? lettersFound*points+(10*(lettersFound-1)) : 0;
      this.setState({
          pts : this.state.pts+pointsToAdd,
          combo : lettersFound
        });
   },
   winLife(){
       // max 10 lives
       if(this.state.lives < 10) this.setState({lives : this.state.lives+1});
   },
   loseLife(){
      this.setState({lives : this.state.lives-1});
   },
   nextLevel(){
      this.clearTimeouts();
      let newLevel = this.state.level+1;
      // win a life every 4 levels
      if(newLevel%4 === 0) this.winLife();
      this.setTimeout(function(){
         this.getWord();
         // add 1 help for level
         this.updateHelp(1);
         this.setState({level:newLevel}, function(){
            browserHistory.push('/game/'+this.state.level);
         })
      }.bind(this), 1600);
   },
   endGame(){
      this.setTimeout(function(){
         browserHistory.push(`/gameover/${this.state.level}/${this.state.pts}`);
      }.bind(this), 2000);
   },
   updateHelp(number){
      this.setState({helps : this.state.helps + number});
   },
   render(){
      return (
         <span style={{width:'100%'}}>
            <GameUi {...this.state} key={this.state.level} addPoints={this.addPoints} loseLife={this.loseLife} nextLevel={this.nextLevel} updateHelp={this.updateHelp}/>
            <Notifications {...this.state} />
         </span>
      )
   }
})
export default Game;
