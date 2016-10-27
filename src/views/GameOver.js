import React from 'react';
import { Link } from 'react-router';

const GameOver = React.createClass({
   render(){
      const game = this.props.routeParams;
      return (
         <div style={{textAlign:'center'}}>
            <h1>Game Over</h1>
            <div style={{fontSize:'0.6em', marginBottom: 30}}>Livello {game.level} - {game.pts} punti</div>
            <Link className="btn" to={'/game/1'} style={{marginBottom: 30}}>Gioca ancora</Link><br />
            <Link className="btn" to={'/'}>Torna alla Home</Link>
         </div>
      )
   }
})
export default GameOver;
