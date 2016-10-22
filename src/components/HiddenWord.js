import React from 'react';
const Letter = React.createClass({
   getInitialState(){
      return {
         disabled : false
      }
   },
   toggleState(){
      this.setState({disabled : !this.state.disabled})
      this.props.inputLetter(this.el.textContent);
   },
   render(){
      return <button onClick={()=>this.toggleState()} disabled={this.state.disabled} ref={(el)=>this.el=el}>{this.props.children}</button>
   }
});
// ------------------------------------
const HiddenWord= React.createClass({
   getInitialState(){
      return{
         hiddenWord : this.setHiddenWord(this.props.word),
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
   inputLetter(selectedLetter){
      let lettersFound = 0;
      const updateHiddenWord = this.state.hiddenWord.map((letterObj) =>{
         if(letterObj.value === selectedLetter && letterObj.visible !== true){
            letterObj.visible = true;
            lettersFound+=1;
         }
         return letterObj;
      });
      this.setState({hiddenWord : updateHiddenWord});
      this.props.addPoints(lettersFound*10);
      if(!lettersFound) this.props.loseLife();
   },
   getLetterWidth(){
      return 75/(this.state.hiddenWord.length)+'vw';
   },
   componentDidUpdate(props, state){
      let lettersLeft = this.getLettersToGuess(state.hiddenWord);
      if(lettersLeft===0) {
         this.props.nextLevel();
      }
   },
   render(){
      const lettersLeft = this.getLettersToGuess(this.state.hiddenWord);
      return(
         <div className="hidden-word">
            <div className="flex-wrapper">
               <div className="word-wrapper">
                  {this.state.hiddenWord.map((letter) =>{
                     return (
                        <span className="letter"
                           key={letter.key}
                           style={{width:this.getLetterWidth(), fontSize:this.getLetterWidth()}}>
                           {letter.visible ? letter.value : '_'}
                        </span>
                     )
                  })}
               </div>
               <div className="lettersToGuess">{lettersLeft} {lettersLeft > 1 ? 'lettere' : 'lettera'} {lettersLeft > 1 ? 'mancanti' : 'mancante'}</div>
            </div>
            <div className="alphabet-wrapper">
               {this.props.alphabet.map((letter) => {
                  return <Letter key={letter} inputLetter={this.inputLetter}>{letter}</Letter>
               })}
            </div>
         </div>
      )
   }
});
export default HiddenWord;
