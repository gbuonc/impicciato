import React from 'react';
import { Link } from 'react-router';

const GameOver = React.createClass({
   render(){
      const game = this.props.routeParams;
      return (
         <div>
            <h1>Game Over</h1>
            <h2>Livello {game.level} - {game.pts} punti</h2>
            <Link to={'/game/1'}>Gioca ancora</Link> |
            <Link to={'/'}>Torna alla Home</Link> |
         </div>
      )
   }
})
export default GameOver;
