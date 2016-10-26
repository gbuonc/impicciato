import React from 'react';
import KeyboardLetter from '../KeyboardLetter';

const Keyboard = (props)=>{
   return (
      <div className="keyboard">
         {props.keys.map((letter) => {
            return <KeyboardLetter key={letter} inputLetter={this.inputLetter}>{letter}</KeyboardLetter>
         })}
      </div>
   )
}
export default Keyboard;
