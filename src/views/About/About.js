import React from 'react';
import './About.css';
import sky from '../../images/sky.png';

const About = () => {

    return (
        <div id="about">
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
 
export default About;