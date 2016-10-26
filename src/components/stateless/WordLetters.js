import React from 'react';

const WordLetters = React.createClass({
  showLetters(){
     return this.props.hiddenWord.map((letter, i, arr) =>{
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
  getLetterWidth(){
     return 75/(this.props.hiddenWord.length)+'vw';
  },
  getClass(key){
     // animate last input character by adding class zoom
     return this.props.lastInputLetter === key ? 'zoom': '';
  },
  render(){
    return (
      <div key={Date.now()} className={this.props.doShake ? 'anim-wrapper animated shake' : 'anim-wrapper'}>
        {this.showLetters()}
      </div>
    )
  }
});

export default WordLetters;
