import React from 'react';
import { Link } from 'react-router';


const Home = React.createClass({
   render(){
      return (
         <div>
            <h1>Home</h1>
            <Link to={'/gioca/1'}>Gioca</Link>
         </div>

      )
   }
})
export default Home;