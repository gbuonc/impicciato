import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
   render(){
      return (
         <div>
            <h1>L'Impicciato</h1>
            <Link to={'/game/1'}>Gioca</Link>
         </div>
      )
   }
})
export default Home;
