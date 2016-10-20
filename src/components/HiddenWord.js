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
         hiddenWord : []
      }
   },
   componentWillMount(){
      this.setHiddenWord(this.props.word)
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
      this.setState({hiddenWord : hiddenWord});
   },
   inputLetter(selectedLetter){
      let lettersFound = 0;
      const updateHiddenWord = this.state.hiddenWord.map((letterObj) =>{
         if(letterObj.value === selectedLetter){
            letterObj.visible = true;
            lettersFound+=1;
         }
         return letterObj;
      });
      this.setState({hiddenWord : updateHiddenWord});
      this.props.addPoints(lettersFound*10);
      if(!lettersFound) this.props.loseLife();
   },
   render(){
      return(
         <div className="hidden-word">
            {this.props.word}
            {this.state.hiddenWord.map((letter) =>{
               return <span className="letter" key={letter.key}>{letter.visible ? letter.value : '_'}</span>
            })}
            <hr/>
            {this.props.alphabet.map((letter) => {
               return <Letter key={letter} inputLetter={this.inputLetter}>{letter}</Letter>
            })}

         </div>
      )
   }
});
export default HiddenWord;
