import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faInstagram, faJava, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHashtag, faCode, faDatabase, faBuildingColumns, faBriefcase, faUsers, faAward } from '@fortawesome/free-solid-svg-icons';
import './About.css';
import myProfilePhoto from '../../images/myProfilePhoto.webp';
import { getProjectCount } from "../../api/apiCalls";
import Footer from "../../components/Footer";

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
                        <a href="https://github.com/Ozdenizmb" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faGithub} />
                            </li>
                        </a>
                        <a href="https://x.com/ozdeniz_mb" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faTwitter} />
                            </li>
                        </a>
                        <a href="https://www.youtube.com/channel/UCQG1TneF8TO1oC2WS6WLKeA" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faYoutube} />
                            </li>
                        </a>
                        <a href="https://www.linkedin.com/in/mehmet-baran-%C3%B6zdeniz-465366262/" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </li>
                        </a>
                        <a href="https://www.instagram.com/ozdeniz.mb/" target="_blank">
                            <li>
                                <FontAwesomeIcon icon={faInstagram} />
                            </li>
                        </a>
                    </ul>
                    </div>
                </div>
            
                <div className="about-right">
                    <h1>Merhaba<span>!</span></h1>
                    <h2>İşte ben kimim ve ne yapıyorum</h2>
                    <div className="about-btns">
                    <a href="https://dxfkoq1rk21c6.cloudfront.net/Mehmet%20Baran%20%C3%96zdeniz%20-%20CV.pdf" target="_blank" type="button" className="btn btn-pink">CV</a>
                    <Link to={"/projects"} type="button" className="btn btn-white">Projeler</Link>
                    </div>
            
                    <div className="about-para">
                    <p>Yazılım mühendisliği alanında kendimi geliştirmeye ve yeni teknolojileri öğrenmeye büyük bir ilgi duyuyorum. Java ve Web Programlama konularında edindiğim bilgileri ve deneyimleri projelerime yansıtıyorum. Yazılım geliştirme sürecine olan tutkum, yeni beceriler kazanmama ve bu becerileri projelerde uygulamama yardımcı oluyor. Öğrenmeye açık bir yapıya sahip olduğum için hızla uyum sağlayabiliyor ve kendimi sürekli olarak geliştirebiliyorum.</p>
                    <p>Amacım, öğrendiklerimi pratik projelerle pekiştirerek değer katmak ve yazılım dünyasındaki yenilikleri takip etmeye devam etmektir. Yeniliklere açık ve sürekli öğrenmeye istekli biriyim.</p>
                    </div>
                </div>
            </div>
            <section id="about_a" className="text-center py-2 my-5">
                <div className="container">
                    <div className="skills my-3">
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

                <p className="lead mt-5">
                    Bunların yanı sıra FlyWay, Hazelcast, Amazon S3, Cloudfront gibi daha birçok teknolojiyi kullanarak projeler üretmekte ve her geçen gün yeni teknolojiler öğrenerek kendimi geliştirmeye devam etmekteyim. Günümüzün uçsuz bucaksız veri yığını arasında "<strong>Her gün yeni bir bilgi</strong>" mottosu ile kariyerime devam etmekteyim.
                </p>
            </section>

            <section id="about_b" className="text-center py-2 my-2">
                <div className="container">

                    <h2 className="section-title">Profile</h2>
                    <div className="border-bottom"></div>

                </div>
                <div className="profile">
                    <div className="bg-light">
                        <ul>
                            <li><FontAwesomeIcon icon={faBuildingColumns} className="fa-3x"/></li>
                            <li className="title">Üniversite</li>
                            <li className="number">Beykent Üniversitesi</li>
                            <li className="title">2020-2024</li>
                        </ul>
                    </div>
                    <div className="bg-medium">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faBriefcase} className="fa-3x"/></li>
                            <li className="title">Kariyer</li>
                            <li className="number">Software Engineering</li>
                        </ul>
                    </div>
                    <div className="bg-light">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faUsers} className="fa-3x"/></li>
                            <li className="title">Deneyim</li>
                            <li className="number">{experienceYears}</li>
                        </ul>
                    </div>
                    <div className="bg-medium">
                        <ul>
                            <li className="mt-3"><FontAwesomeIcon icon={faAward} className="fa-3x"/></li>
                            <li className="title">Projeler</li>
                            <li className="number">{projectCount}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
            
        </div>
    );
}

export default About;