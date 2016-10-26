import React from 'react';
import KeyboardLetter from '../KeyboardLetter';
import alphabet from '../../helpers/alphabet';
const Keyboard = (props)=>{
   return (
      <div className="keyboard">
          {alphabet.map((letter) => {
            return <KeyboardLetter key={letter} inputLetter={props.inputLetter}>{letter}</KeyboardLetter>
         })}
      </div>
   )
}
export default Keyboard;
