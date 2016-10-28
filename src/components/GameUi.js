import React from 'react';
import Keyboard from '../components/stateless/Keyboard';
import WordLetters from '../components/stateless/WordLetters';
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
      this.props.addPoints(lettersFound, points);
      if(!lettersFound){
        if('vibrate' in navigator) navigator.vibrate([150,150,300]);
        this.setState({doShake:true});
        this.props.loseLife();
      }
   },
   componentDidUpdate(props, prevState){
      let lettersLeft = this.getLettersToGuess(prevState.hiddenWord);
      if(lettersLeft===0 && prevState.hiddenWord !== this.state.hiddenWord) {
         this.props.nextLevel();
      }
   },
   setClassList(shakeClasses){
      return `anim-wrapper ${shakeClasses}`;
   },
   render(){
      return(
          <div className="ui-wrapper">
            <div className="word-wrapper">
              <WordLetters doShake={this.state.doShake}
              removeShake={this.removeShake}
               hiddenWord={this.state.hiddenWord}
               lastInputLetter={this.state.lastInputLetter}
               />
            </div>
          {this.props.word}
            <Keyboard inputLetter={this.inputLetter} />
          </div>
      )
   }
});
export default GameUi;
