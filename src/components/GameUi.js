import React from 'react';
import Score from '../components/stateless/Score';
import Level from '../components/stateless/Level';
import Lives from '../components/stateless/Lives';
import Keyboard from '../components/stateless/Keyboard';
import WordLetters from '../components/stateless/WordLetters';
import { Link } from 'react-router';

const GameUi= React.createClass({
   getInitialState(){
      return{
         hiddenWord : this.setHiddenWord(this.props.word),
         lastInputLetter : '',
         doShake : false
      }
   },
   setHiddenWord(word){
      const l = word.length;
      const hiddenWord = word.split('').map((letter, i) =>{
         const obj={};
         obj['key'] = i;
         obj['value'] = letter;
         obj['visible'] = (i === 0 || i === l-1) ? true : false;
         return obj;
      });
      return hiddenWord
   },
   getLettersToGuess(word){
      return (word.reduce((acc, char)=>{
         if(char.visible !== true) acc+=1;
         return acc;
      },0)
      )
   },
   inputLetter(selectedLetter, points){
      let lettersFound = 0;
      this.setState({doShake:false});
      const updateHiddenWord = this.state.hiddenWord.map((letterObj) =>{
         if(letterObj.value === selectedLetter && letterObj.visible !== true){
            letterObj.visible = true;
            lettersFound+=1;
         }
         return letterObj;
      });
      this.setState({
         hiddenWord : updateHiddenWord,
         lastInputLetter : selectedLetter
      });
      if(points) this.props.addPoints(lettersFound, points);
      if(!lettersFound){
        if('vibrate' in navigator) navigator.vibrate([150,150,300]);
        this.setState({doShake:true});
        this.props.loseLife();
      }
   },
   triggerHelp(){
      var letters = this.state.hiddenWord.filter((letter) => {
         return !letter.visible;
      }).map((letter)=>letter.value);
      if(letters.length >0){
         const randomLetter = letters[Math.floor(Math.random()*letters.length)];
         this.inputLetter(randomLetter, 0);
         this.props.updateHelp(-1)
      }
   },
   componentDidUpdate(props, prevState){
      let lettersLeft = this.getLettersToGuess(prevState.hiddenWord);
      if(lettersLeft===0 && prevState.hiddenWord !== this.state.hiddenWord) {
         this.props.nextLevel();
      }
   },
   render(){
      return(
         <div className="gameWrapper">
            <div className="game-header">
               <div className="game-header-content">
                  <Score>{this.props.pts}</Score>
                  <Level>{this.props.level}</Level>
                  <Lives>{this.props.lives}</Lives>
               </div>
            </div>
            <div className="game-area">
               <div className="ui-wrapper">
                  <div className="word-wrapper">
                     <WordLetters doShake={this.state.doShake}
                        removeShake={this.removeShake}
                        hiddenWord={this.state.hiddenWord}
                        lastInputLetter={this.state.lastInputLetter}
                     />
                  </div>
                  {/* {this.props.word} */}
                  <Keyboard inputLetter={this.inputLetter} disabledLetter={this.state.lastInputLetter}/>
               </div>
            </div>
            <div className="game-footer">
               {/* <a className="btn" onClick={()=>this.props.nextLevel()}>Next Level</a> */}
               <Link className="btn" to={'/'}>Home</Link>
               <button className="btn help-btn" onClick={()=>this.triggerHelp()} disabled={this.props.helps === 0}>Aiuto<small>({this.props.helps})</small></button>
            </div>

         </div>
      )
   }
});
export default GameUi;
