import React from 'react';
import './About.css';
import mountain0 from '../../images/mountain0.jpg';
import mountain1 from '../../images/mountain1.png';
import mountain2 from '../../images/mountain2.png';
import mountain3 from '../../images/mountain3.png';
import person from '../../images/person.png';
import sky from '../../images/sky.png';

const About = () => {

    const translate = document.querySelectorAll(".translate");
    const big_title = document.querySelector(".big-title");
    const header = document.querySelector("header");
    const shadow = document.querySelector(".shadow");
    const content = document.querySelector(".content");
    const section = document.querySelector("section");
    const image_container = document.querySelector(".imgContainer");
    const opacity = document.querySelectorAll(".opacity");
    const border = document.querySelector(".border");

    let header_height = header.offsetHeight;
    let section_height = section.offsetHeight;

    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        let sectionY = section.getBoundingClientRect();
        
        translate.forEach(element => {
            let speed = element.dataset.speed;
            element.style.transform = `translateY(${scroll * speed}px)`;
        });

        opacity.forEach(element => {
            element.style.opacity = scroll / (sectionY.top + section_height);
        })

        big_title.style.opacity = - scroll / (header_height / 2) + 1;
        shadow.style.height = `${scroll * 0.5 + 300}px`;

        content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
        image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

        border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
    })

    return (
        <div>
            <header>
        <nav>
            <div class="container">
                <h3 class="logo">Brand<span>Name</span></h3>
                <div class="hamburger-menu">
                    <div class="bar"></div>
                </div>
            </div>
        </nav>

        <h1 class="big-title translate" data-speed="0.1">Discover.</h1>

        <img src={person} class="person translate" data-speed="-0.25" alt=""/>
        <img src={mountain1} class="mountain1 translate" data-speed="-0.2" alt=""/>
        <img src={mountain2} class="mountain2 translate" data-speed="0.4" alt=""/>
        <img src={mountain3} class="mountain3 translate" data-speed="0.3" alt=""/>
        <img src={sky} class="sky translate" data-speed="0.5" alt=""/>
    </header>

    <section>
        <div class="shadow"></div>

        <div class="container">
            <div class="content opacity">
                <h3 class="title">
                    About
                    <div class="border"></div>
                </h3>
                <p class="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque officiis quos expedita ipsa, a quidem inventore voluptates debitis accusamus tenetur qui et voluptas dicta, culpa earum, doloribus odio consectetur consequuntur soluta quasi nobis! Deserunt voluptatum reiciendis iure expedita sequi quisquam laboriosam temporibus exercitationem.</p>
            </div>

            <div class="imgContainer opacity">
                <img src={mountain0} alt=""/>
            </div>
        </div>
    </section>

        </div>
    );
}
 
export default About;