import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faInstagram, faJava, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHashtag, faCode, faDatabase, faBuildingColumns, faBriefcase, faUsers, faAward } from '@fortawesome/free-solid-svg-icons';
import './About.css';
import myProfilePhoto from '../../images/myProfilePhoto.jpg';
import { getProjectCount } from "../../api/apiCalls";

const About = () => {

    const [projectCount, setProjectCount] = useState();

    const currentYear = new Date().getFullYear();
    const experienceYears = currentYear - 2020;

    useEffect(() => {
        loadProjectCount();
    }, [])

    const loadProjectCount = async () => {
        try {
            const response = await getProjectCount();
            setProjectCount(response.data);
        } catch(error) {

        }
    }

    return (
        <div id="aboutn">
            <div className="about-wrapper">
                <div className="about-left">
                    <div className="about-left-content">
                    <div>
                        <div className="shadow">
                        <div className="about-img">
                            <img src={myProfilePhoto} alt="about image" />
                        </div>
                        </div>
            
                        <h2>Mehmet Baran<br />Özdeniz</h2>
                        <h3>Software Engineer</h3>
                    </div>
            
                    <ul className="icons">
                        <li><FontAwesomeIcon icon={faFacebookF} /></li>
                        <li><FontAwesomeIcon icon={faTwitter} /></li>
                        <li><FontAwesomeIcon icon={faLinkedin} /></li>
                        <li><FontAwesomeIcon icon={faInstagram} /></li>
                    </ul>
                    </div>
                </div>
            
                <div className="about-right">
                    <h1>Merhaba<span>!</span></h1>
                    <h2>İşte ben kimim ve ne yapıyorum</h2>
                    <div className="about-btns">
                    <button type="button" className="btn btn-pink">CV</button>
                    <button type="button" className="btn btn-white">Projeler</button>
                    </div>
            
                    <div className="about-para">
                    <p>Yazılım mühendisliği alanında kendimi geliştirmeye ve yeni teknolojileri öğrenmeye büyük bir ilgi duyuyorum. Java ve Web Programlama konularında edindiğim bilgileri ve deneyimleri projelerime yansıtıyorum. Yazılım geliştirme sürecine olan tutkum, yeni beceriler kazanmama ve bu becerileri projelerde uygulamama yardımcı oluyor. Öğrenmeye açık bir yapıya sahip olduğum için hızla uyum sağlayabiliyor ve kendimi sürekli olarak geliştirebiliyorum.</p>
                    <p>Amacım, öğrendiklerimi pratik projelerle pekiştirerek değer katmak ve yazılım dünyasındaki yenilikleri takip etmeye devam etmektir. Yeniliklere açık ve sürekli öğrenmeye istekli biriyim.</p>
                    </div>
                </div>
            </div>
            <section id="about_a" class="text-center py-2 my-5">
                <div class="container">
                    <div class="skills my-3">
                        <div>
                            <FontAwesomeIcon icon={faJava} className="fa-5x text-danger"/>
                            <h3>Java</h3>
                            <p>Java ile başlayan öğrenme sürecim devamında Spring Boot ile devam etmiştir.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faHashtag} className="fa-5x text-danger"/>
                            <h3>C#</h3>
                            <p>C# Form ile Masaüstü uygulamalar geliştirme üzerine çalışmalarım bulunmaktadır.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCode} className="fa-5x text-danger"/>
                            <h3>Web</h3>
                            <p>Spring Boot ile yazdığım Backend projelerimi React Frontend'i ile bütünleştirerek Web Projeleri geliştirmekteyim.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faDatabase} className="fa-5x text-danger"/>
                            <h3>Databases</h3>
                                <p>Çalışmalarımda PostgreSql veritabanını kullanmaktayım.</p>
                        </div>
                    </div>
                </div>

                <p class="lead mt-5">
                    Bunların yanı sıra FlyWay, Hazelcast, Amazon S3, Cloudfront gibi daha birçok teknolojiyi kullanarak projeler üretmekte ve her geçen gün yeni teknolojiler öğrenerek kendimi geliştirmeye devam etmekteyim. Günümüzün uçsuz bucaksız veri yığını arasında "Her gün yeni bir bilgi" mottosu ile kariyerime devam etmekteyim.
                </p>
            </section>

            <section id="about_b" class="text-center py-2 my-2">
                <div class="container">

                    <h2 class="section-title">Profile</h2>
                    <div class="border-bottom"></div>

                </div>
                <div class="profile">
                    <div class="bg-light">
                        <ul>
                            <li><FontAwesomeIcon icon={faBuildingColumns} className="fa-3x"/></li>
                            <li class="title">Üniversite</li>
                            <li class="number">Beykent Üniversitesi</li>
                            <li class="title">2020-2024</li>
                        </ul>
                    </div>
                    <div class="bg-medium">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faBriefcase} className="fa-3x"/></li>
                            <li class="title">Kariyer</li>
                            <li class="number">Software Engineering</li>
                        </ul>
                    </div>
                    <div class="bg-light">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faUsers} className="fa-3x"/></li>
                            <li class="title">Deneyim</li>
                            <li class="number">{experienceYears}</li>
                        </ul>
                    </div>
                    <div class="bg-medium">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faAward} className="fa-3x"/></li>
                            <li class="title">Projeler</li>
                            <li class="number">{projectCount}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;