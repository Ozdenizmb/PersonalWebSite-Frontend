import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBProgress, MDBProgressBar, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { getUserAndAdmin } from '../../api/apiCalls';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import profile from '../../images/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCalendarCheck, faClipboard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { logoutSuccess } from '../../redux/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';

const UserPage = () => {

    const [user, setUser] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);

    const { storeEmail, role } = useSelector((store) => ({
        storeEmail: store.email,
        role: store.role
    }));

    const { email } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        loadUser(email);
    }, [email]);

    const loadUser = async (email) => {
        try {
            const response = await getUserAndAdmin(email);
            setUser(response.data);
        } catch(error) {
            setUserNotFound(true);
        }
    }

    const onClickLogout = () => {
        dispatch(logoutSuccess());
        navigate("/");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateDaysRegistered = (createdDate) => {
        const createdDateObj = new Date(createdDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - createdDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if(userNotFound) {
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <span className="material-icons" style={{fontSize: '48px'}}>error</span>
                    </div>
                    User Or Admin Not Found
                </div>
            </div>
        );
    }

    if(user.email !== email) {
        return(
            <Spinner />
        );
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">

            <MDBRow className="mb-5">
                <MDBCol lg="4">
                    <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                        <MDBCardImage
                        src={user.imageUrl || profile}
                        alt={email}
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                        <p className="text-muted mb-1"><i>{user.profession || "Belirtilmedi"}</i></p>
                        <h4 className="text-muted mb-4">{user.firstName} {user.lastName}</h4>
                        <div className="d-flex justify-content-center mb-2">
                        {(role === "ADMIN" || (role === "USER" && email===storeEmail)) &&
                            <Link to={`/profile/update/${email}`} className="btn btn-primary">Güncelle</Link>
                        }
                        {((role === "ADMIN" && email===storeEmail) || (role === "USER" && email===storeEmail)) &&
                            <button className="ms-1 btn btn-danger" onClick={onClickLogout}>Çıkış Yap</button>
                        }
                        </div>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                        <MDBListGroup className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                            <MDBIcon fas icon="fa-lg">  
                                <FontAwesomeIcon icon={faCalendarPlus} className="fa-lg text-primary me-2" />
                                Oluşturulma Tarihi:
                            </MDBIcon>
                            <MDBCardText>{formatDate(user.createdDate)}</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                            <MDBIcon fab icon="fa-lg">
                                <FontAwesomeIcon icon={faCalendarCheck} className="fa-lg text-success me-2" />
                                Güncellenme Tarihi:
                            </MDBIcon>
                            <MDBCardText>{formatDate(user.updatedDate)}</MDBCardText>
                        </MDBListGroupItem>
                        {(role === "ADMIN") &&
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="fa-lg">
                                    <FontAwesomeIcon icon={faClipboard} className="fa-lg text-danger me-2" />
                                    Proje İşlemleri:
                                </MDBIcon>
                                <MDBCardText>
                                    <Link to={"/project/create"} className="btn btn-primary">Yeni Bir Proje Oluştur</Link>
                                </MDBCardText>
                            </MDBListGroupItem>
                        }
                        {(role === "ADMIN") &&
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="fa-lg">
                                    <FontAwesomeIcon icon={faEnvelope} className="fa-lg text-warning me-2" />
                                    İletişim:
                                </MDBIcon>
                                <MDBCardText>
                                    <Link to={"/contact/message"} className="btn btn-warning">Mesajları Görüntüle</Link>
                                </MDBCardText>
                            </MDBListGroupItem>
                        }
                        </MDBListGroup>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4">
                    <MDBCardBody>
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Ad Soyad</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Telefon</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.phoneNumber || "Belirtilmedi"}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Doğum Günü</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.birthday || "Belirtilmedi"}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Rol</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.role}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Biyografi</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.biography || "Belirtilmedi"}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBRow>
                    <MDBCol md="12">
                        <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">{user.firstName} {user.lastName}:</span> Siteye Kayıtlı Olduğu Gün Sayısı</MDBCardText>
                            <h3>{calculateDaysRegistered(user.createdDate)} Gün Önce Kayıt Oldunuz.</h3>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <Footer />
        </section>
    );
}

export default UserPage;