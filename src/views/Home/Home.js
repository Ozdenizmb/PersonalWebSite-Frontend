// Home.js
import React, { useEffect } from 'react';
import './Home.css';
import myProfilePhoto from '../../images/myProfilePhoto.jpg';
import mountain1 from '../../images/mountain1.png';
import mountain2 from '../../images/mountain2.png';
import mountain3 from '../../images/mountain3.png';
import person from '../../images/person.png';
import sky from '../../images/sky.png';

const Home = () => {
  useEffect(() => {
    const translate = document.querySelectorAll(".translate");
    const big_title = document.querySelector(".big-title");
    const header = document.querySelector("header");
    const shadow = document.querySelector(".shadow");
    const content = document.querySelector(".content");
    const section = document.querySelector("section");
    const image_container = document.querySelector(".imgContainer");
    const opacity = document.querySelectorAll(".opacity");
    const border = document.querySelector(".border");

    const header_height = header.offsetHeight;
    const section_height = section.offsetHeight;

    const handleScroll = () => {
      const scroll = window.pageYOffset;
      const sectionY = section.getBoundingClientRect();

      translate.forEach(element => {
        const speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
      });

      opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
      });

      big_title.style.opacity = - scroll / (header_height / 2) + 1;
      shadow.style.height = `${scroll * 0.5 + 300}px`;

      content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
      image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

      border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="home">
      <header>

        <h1 className="big-title translate" data-speed="0.1">Mehmet Baran Özdeniz</h1>

        <img src={person} className="person translate" data-speed="-0.25" alt="" />
        <img src={mountain1} className="mountain1 translate" data-speed="-0.2" alt="" />
        <img src={mountain2} className="mountain2 translate" data-speed="0.4" alt="" />
        <img src={mountain3} className="mountain3 translate" data-speed="0.3" alt="" />
        <img src={sky} className="sky translate" data-speed="0.5" alt="" />
      </header>

      <section>
        <div className="shadow"></div>

        <div className="container">
          <div className="content opacity">
            <h3 className="title">
              Hakkımda
              <div className="border"></div>
            </h3>
            <p className="text">Yazılım mühendisliği alanında kendimi geliştirmek ve yeni teknolojileri öğrenmek konusunda büyük bir tutkum var. Java ve web programlama bilgimi projelerimde uygulayarak deneyim kazanıyorum. Öğrenmeye açık yapım sayesinde hızla uyum sağlıyor ve sürekli kendimi geliştiriyorum. 2024 yılında İstanbul Beykent Üniversitesi Yazılım Mühendisliği bölümünden mezun olarak kariyer yolculuğuma başladım ve amacım, öğrendiklerimi pratik projelerle pekiştirip yazılım dünyasına değer katmak ve yenilikleri takip etmeye devam etmektir.</p>
          </div>

          <div className="imgContainer opacity">
            <img className="my-pp" src={myProfilePhoto} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
