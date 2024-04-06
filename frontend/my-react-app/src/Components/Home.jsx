import React from 'react'
import { Link } from 'react-router-dom'; // Import useNavigate from react-router-dom
import myImage from './hero.png';

import './Home.css';
const Home = () => {
  return (
    <div className='body-home'>
       <div className='navbar-home'>
            <img src="logo.png" alt="" className='logo-home' />
       </div>
       <div >
        <img src="circle.png" alt="" id='circle2-home'/>
         <img src={myImage} alt="" id='girlimg' /> 
        <div className="buttons-container">
          <Link to="/signin">
        <button  className="signin-home">Sign In</button>
        </Link>
        <Link to="./signup">
          <button  className="signout-home">Sign Out</button>
          </Link>
        </div> 

{/* <div className="buttons-container">
          <Link to="/signin" className="signin-home">
            <button>SignIn</button>
          </Link>
          <Link to="/signup" className="signup-home">
            <button>SignUp</button>
          </Link>
        </div> */}


       </div>
       <div className='content-home'>
          <h1 id='h1-home'>We are Hiring Interns.</h1>
          <p id='text-home'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Officia minus dicta sit! Maiores consequatur eum ea, dolor quidem et nostrum fuga laudantium? Sunt quia nisi illo quam, enim explicabo, autem perferendis dignissimos natus corrupti ab sit quidem. Tempora, aliquam? Voluptas ipsa atque totam suscipit neque consectetur pariatur qui numquam explicabo.</p>
       </div>
    </div>
  )
}

export default Home