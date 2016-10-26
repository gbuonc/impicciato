import React from 'react';
const KeyboardLetter = React.createClass({
   getInitialState(){
      return {
         disabled : false
      }
   },
   inputLetter(){
      if('vibrate'  in navigator) navigator.vibrate(20);
      this.setState({disabled : !this.state.disabled})
      this.props.inputLetter(this.el.textContent);
   },
   render(){
      return <button onClick={()=>this.inputLetter()} disabled={this.state.disabled} ref={(el)=>this.el=el}>{this.props.children}</button>
   }
});
export default KeyboardLetter;
