import React from 'react';
import Keyboard from '../components/stateless/Keyboard';
import KeyboardLetter from '../components/KeyboardLetter';

const GameUi= React.createClass({
   getInitialState(){
      return{
         hiddenWord : this.setHiddenWord(this.props.word),
         lastInputLetter : ''
      }
   },
   componentWillMount(){this.timeouts = []},
   componentWillUnmount(){this.clearTimeouts()},
   setTimeout(){this.timeouts.push(setTimeout.apply(null, arguments))},
   clearTimeouts(){this.timeouts.forEach(clearTimeout)},
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
   getClass(key){
      // animate last input character by adding class zoom
      return this.state.lastInputLetter === key ? 'zoom': '';
   },
   showLetters(){
      return this.state.hiddenWord.map((letter, i, arr) =>{
         //omit class animated on first and last letter because thery're already visible
         const l = arr.length;
         const isLetterVisible = (i===0 || i===l-1) ? '' : 'animated';
         return (
            <span className={`letter ${isLetterVisible} ${this.getClass(letter.value)}`}
               key={letter.key}
               style={{width:this.getLetterWidth(), fontSize:this.getLetterWidth()}}>
               {letter.visible ? letter.value : '_'}
            </span>
         )
      })
   },
   inputLetter(selectedLetter){
      let lettersFound = 0;
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
      var scoreType = lettersFound > 1 ? 'combo' : 'points';
      this.props.addPoints(scoreType, lettersFound*10);
      if(!lettersFound){
        //do shake!
        if('vibrate' in navigator) navigator.vibrate([150,150,300]);
        this.letters.classList.add('shake');
        this.props.loseLife();
      }
   },
   getLetterWidth(){
      return 75/(this.state.hiddenWord.length)+'vw';
   },
   componentDidUpdate(props, prevState){
      let lettersLeft = this.getLettersToGuess(prevState.hiddenWord);
      if(lettersLeft===0 && prevState.hiddenWord !== this.state.hiddenWord) {
         this.props.nextLevel();
      }
      this.setTimeout(function(){
         // remove shake
         this.letters.classList.remove('shake')
      }.bind(this), 500);
   },
   render(){
      return(
         <div className="hidden-word">
            <div className="flex-wrapper">
               <div className="word-wrapper">
                  <div ref={(letters)=>this.letters=letters} className={`anim-wrapper animated`}>
                     {this.showLetters()}
                  </div>
               </div>
               {this.props.word}
            </div>
            <Keyboard keys={alphabet}></Keyboard>
         </div>
      )
   }
});
export default GameUi;
