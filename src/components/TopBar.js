import React from 'react';
import '../style/Components.css';
import sky from '../images/sky.png';

const TopBar = () => {
    return (
        <div id="topbar">
            <header>
                <nav>
                <div className="container">
                    <h3 className="logo">Brand<span>Name</span></h3>
                    <div className="hamburger-menu">
                    <div className="bar"></div>
                    </div>
                </div>
                </nav>

                <img src={sky} className="sky translate" data-speed="0.5" alt="" />
            </header>
        </div>
    );
}
 
export default TopBar;