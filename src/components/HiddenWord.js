import React from 'react';
import HSVtoRGB from '../helpers/hsvtorgb';


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
      const color = new HSVtoRGB;
      const bg = color.get(false, 0.1, 0.99);
      console.log(bg);
      const style={
         borderRadius : '5px',
         borderBottomWidth : 3,
         backgroundColor : `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, 0.5)`
      }
      return <button style={style} onClick={()=>this.toggleState()} disabled={this.state.disabled} ref={(el)=>this.el=el}>{this.props.children}</button>
   }
});
// ------------------------------------
const HiddenWord= React.createClass({
   getInitialState(){
      return{
         hiddenWord : this.setHiddenWord(this.props.word)
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
      if(!lettersFound){
         //do shake!
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
      const lettersLeft = this.getLettersToGuess(this.state.hiddenWord);
      return(
         <div className="hidden-word">
            <div className="flex-wrapper">
               <div className="word-wrapper">
                  <div ref={(letters)=>this.letters=letters}className={`anim-wrapper animated`}>
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
               </div>
               <div className="lettersToGuess">{lettersLeft} {lettersLeft > 1 ? 'lettere' : 'lettera'} {lettersLeft > 1 ? 'mancanti' : 'mancante'}</div>
               {this.props.word}
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
