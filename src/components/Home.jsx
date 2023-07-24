import React from 'react'
import {Link} from 'react-router-dom';
export default function Home(){
    return (
        <>
        <div className='home-container'>
            <div className="home-text">
                <h3>
                    We are not just  <span>a talking app</span>
                </h3>
                <h5>
                    Make chatting <span>Funner. Faster. Fabulous</span>
                </h5>
                <Link to='/signup'>
                
                <button className='button'>START TODAY</button>
                </Link>
            </div>

        </div>
            <img src ='https://cdn1.iconfinder.com/data/icons/foods-57/32/36-64.png'></img>
            <img src='https://cdn3.iconfinder.com/data/icons/food-235/64/cookie-snack-biscuit-bakery-64.png '></img>
        </>
    )
}