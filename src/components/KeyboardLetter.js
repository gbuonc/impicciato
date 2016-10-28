import React from 'react';
const KeyboardLetter = React.createClass({
   getInitialState(){
      return {
         disabled : false
      }
   },
   inputLetter(letter, points){
      if('vibrate' in navigator) navigator.vibrate(20);
      this.setState({disabled : !this.state.disabled})
      this.props.inputLetter(letter, points);
   },
   render(){
     const char = this.props.children;
     const points = this.props.points;
      return <button onClick={()=>this.inputLetter(char, points)} disabled={this.state.disabled}>{char}</button>
   }
});
export default KeyboardLetter;
