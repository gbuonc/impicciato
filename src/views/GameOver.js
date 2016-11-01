import React from 'react';
import { Link } from 'react-router';

const GameOver = React.createClass({
  getInitialState(){
    return {
      highScore: JSON.parse(localStorage.getItem('highScore')) || 0,
      highLevel: JSON.parse(localStorage.getItem('highLevel')) || 0,
      newRecord : false
    }
  },
  componentDidMount(){
    const game = this.props.routeParams;
    if(game.pts > this.state.highScore || game.level > this.state.highLevel){
      if(game.pts > this.state.highScore) localStorage.setItem('highScore', JSON.stringify(game.pts));
      if(game.level > this.state.highLevel) localStorage.setItem('highLevel', JSON.stringify(game.level));
      this.setState({
        highScore : game.pts > this.state.highScore ? game.pts : this.state.highScore,
        highLevel : game.level > this.state.highLevel ? game.level : this.state.highLevel,
        newRecord : true
      })
    }
    else{
      this.setState({
        newRecord : false
      })
    }
  },
  renderScore(){
    const game = this.props.routeParams;
    if(this.state.newRecord){
      return(
        <div style={{marginBottom: 30}}>NUOVO RECORD! <br/>{this.state.highScore} punti - Livello {this.state.highLevel}</div>
      )
    }
    return(
      <div>
      <div style={{fontSize:'0.8em', marginBottom: 30}}>Il tuo punteggio:<br />Livello {game.level} - {game.pts} punti</div>
      <div style={{marginBottom: 30}}>RECORD DA BATTERE: <br/>Livello {this.state.highLevel} - {this.state.highScore} punti</div>
      </div>
    )
  },
   render(){
      const game = this.props.routeParams;
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
