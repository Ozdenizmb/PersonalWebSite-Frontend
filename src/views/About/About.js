import React, { useEffect, useState } from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava, faGithub, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHashtag, faCode, faDatabase, faBuildingColumns, faBriefcase, faUsers, faAward } from '@fortawesome/free-solid-svg-icons';
import { getProjectCount } from '../../api/apiCalls';

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
        <div id="about">
            <section id="about_a" class="text-center py-2 my-4">
                <div class="container">
                    <h2 class="section-title">Introduction</h2>
                    <div class="border-bottom"></div>
                    <p class="lead">
                    Yazılım mühendisliği alanında kendimi geliştirmeye ve yeni teknolojileri öğrenmeye büyük bir ilgi duyuyorum. Java ve Web Programlama konularında edindiğim bilgileri ve deneyimleri projelerime yansıtıyorum. Yazılım geliştirme sürecine olan tutkum, yeni beceriler kazanmama ve bu becerileri projelerde uygulamama yardımcı oluyor. Öğrenmeye açık bir yapıya sahip olduğum için hızla uyum sağlayabiliyor ve kendimi sürekli olarak geliştirebiliyorum. Amacım, öğrendiklerimi pratik projelerle pekiştirerek değer katmak ve yazılım dünyasındaki yenilikleri takip etmeye devam etmektir. Yeniliklere açık ve sürekli öğrenmeye istekli biriyim.
                    </p>

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

                <p class="lead">
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

            <section id="about_c" class="text-center py-2 my-2">
                <div class="container">

                    <h2 class="section-title">Bağlantı Adreslerim</h2>
                    <div class="border-bottom"></div>
                    <p class="lead">
                        Aşağıdaki linklerden bana ulaşabilirsiniz. Doğrudan iletişim için lütfen 'İletişim' sayfasını ziyaret edin.
                    </p>

                    <div class="process">
                        <a href="https://www.linkedin.com/in/mehmet-baran-%C3%B6zdeniz-465366262" target="_blank">
                            <div>
                                <FontAwesomeIcon icon={faLinkedin} className="process_icon fa-2x my-1"/>
                                <h3>LinkedIn</h3>
                            </div>
                        </a>
                        <a href="https://github.com/Ozdenizmb" target="_blank">
                            <div>
                                <FontAwesomeIcon icon={faGithub} className="process_icon fa-2x my-1"/>
                                <h3>GitHub</h3>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/ozdeniz.mb/" target="_blank">
                            <div>
                                <FontAwesomeIcon icon={faInstagram} className="process_icon fa-2x my-1"/>
                                <h3>Instagram</h3>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/channel/UCQG1TneF8TO1oC2WS6WLKeA" target="_blank">
                            <div>
                                <FontAwesomeIcon icon={faYoutube} className="process_icon fa-2x my-1"/>
                                <h3>YouTube</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default About;