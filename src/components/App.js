import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Home from '../views/Home';
import Game from '../views/Game';
import GameOver from '../views/GameOver';

const App = React.createClass({

   render(){
      return (
        <Router history={browserHistory}>
           <Route path="/" component={Home}></Route>
           <Route path="/game/:level" component={Game} />
           <Route path="/gameover/:level/:pts" component={GameOver}></Route>
           <Route path="*" component={Home}/>
        </Router>
      );
   }
});
export default App;
