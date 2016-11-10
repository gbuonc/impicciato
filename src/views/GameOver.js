import React from 'react';
import { Link } from 'react-router';

const GameOver = React.createClass({
  getInitialState(){
    return {
      newRecord : false
    }
  },
  componentDidMount(){
    const game = this.props.routeParams;
    const highScore = Number(JSON.parse(localStorage.getItem('highScore') || 0));
    const highLevel = Number(JSON.parse(localStorage.getItem('highLevel') || 0));
    console.log(highScore, highLevel);
    if(game.pts > highScore){
      localStorage.setItem('highScore', JSON.stringify(game.pts));
      this.setState({
         newRecord : true
      })
   }else{
      this.setState({
        newRecord : false
      })
   }
   if(game.level > highLevel) localStorage.setItem('highLevel', JSON.stringify(game.level));
  },
  renderScore(){
    const game = this.props.routeParams;
    const highScore = Number(JSON.parse(localStorage.getItem('highScore') || 0));
    const highLevel = Number(JSON.parse(localStorage.getItem('highLevel') || 0));
    if(this.state.newRecord){
      return(
        <div style={{marginBottom: 30}} className="bounceIn">NUOVO RECORD! <br/><strong>{game.pts} punti</strong> - Livello {game.level}</div>
      )
    }
    return(
      <div>
         <div style={{fontSize:'0.8em', marginBottom: 30}}>Il tuo punteggio:<br />Livello {game.level} - {game.pts} punti</div>
         <div style={{marginBottom: 30}}>RECORD DA BATTERE: <br/>Livello {highLevel} - {highScore} punti</div>
      </div>
    )
  },
   render(){
      return (
         <div style={{textAlign:'center'}}>

            <h1>Game Over</h1>
            {this.renderScore()}
            <Link className="btn" to={'/game/1'} >Gioca ancora</Link><br />
            <Link className="btn" to={'/'}>Torna alla Home</Link>
         </div>
      )
   }
})
export default GameOver;
