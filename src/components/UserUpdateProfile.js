import React, { useEffect, useState } from 'react';
import Input from './Input';
import { getUserAndAdmin, updateAdmin, updateUser } from '../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import profile from '../images/profile.png';
import { useApiProgress } from '../shared/ApiProgress';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUserSuccess } from '../redux/authActions';
import { ToastContainer, toast } from 'react-toastify';

const UserUpdateProfile = () => {

    const [user, setUser] = useState({});

    const [updatedFirstName, setUpdatedFirstName] = useState();
    const [updatedLastName, setUpdatedLastName] = useState();
    const [updatedBiography, setUpdatedBiography] = useState();
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState();
    const [updatedProfession, setUpdatedProfession] = useState();
    const [updatedBirthday, setUpdatedBirthday] = useState();
    const [UpdatedLogoFile, setUpdatedLogoFile] = useState();
    const [newImage, setNewImage] = useState();
    const [adminKey, setAdminKey] = useState();

    const [error, setError] = useState(null);

    const { id, email, password, role } = useSelector((store) => ({
        id: store.id,
        email: store.email,
        password: store.password,
        role: store.role
    }));

    const pendingApiCall = useApiProgress('post','/api/v1/JobPosting');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        loadUser(email);
    }, [email]);

    const loadUser = async (email) => {
        try {
            const response = await getUserAndAdmin(email);
            setUser(response.data);
            setUpdatedFirstName(response.data.firstName);
            setUpdatedLastName(response.data.lastName);
            setUpdatedBiography(response.data.biography);
            setUpdatedPhoneNumber(response.data.phoneNumber);
            setUpdatedProfession(response.data.profession);
            setUpdatedBirthday(response.data.birthday);
        } catch(error) {
        }
    }

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "updateFirstName") {
            setUpdatedFirstName(value);
        }
        if(name === "updateLastName") {
            setUpdatedLastName(value);
        }
        if(name === "updateBiography") {
            setUpdatedBiography(value);
        }
        if(name === "updatePhoneNumber") {
            setUpdatedPhoneNumber(value);
        }
        if(name === "updateProfession") {
            setUpdatedProfession(value);
        }
        if(name === "updateBirthday") {
            setUpdatedBirthday(value);
        }
        if(name === "adminKey") {
            setAdminKey(value);
        }

        setError(null);
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1) {
            return;
        }
        
        const file = event.target.files[0];
        setUpdatedLogoFile(event.target.files[0]);

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

        setError(null);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        const body = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            password,
            biography: updatedBiography,
            phoneNumber: updatedPhoneNumber,
            profession: updatedProfession,
            birthday: updatedBirthday
        };

        const formData = new FormData();
        formData.append('userUpdateDto', new Blob([JSON.stringify(body)], {type: 'application/json'}));
        formData.append('file', UpdatedLogoFile);

        try {
            let response;

            if(role === "ADMIN") {
                response = await updateAdmin(id, formData, adminKey);
            }
            else {
                response = await updateUser(id, formData);
            }

            dispatch(updateUserSuccess(response.data));
            navigate(`/profile/${email}`);
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };
    

    if(user.email !== email) {
        return(
            <Spinner />
        );
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="card text-center h-100 border rounded-3 shadow mb-5">
                <div className="card-header">
                    <img
                        className={"rounded-circle shadow"} 
                        width={200} height={200}
                        alt={user.email} src={newImage || user.imageUrl || profile}>
                    </img>
                </div>
                <div className="card-body ps-5 pe-5">
                    <Input name="updateFirstName" label="Ad" type="text" onChangeVeriables={onChange} value={updatedFirstName}/>

                    <Input name="updateLastName" label="Soyad" type="text" onChangeVeriables={onChange} value={updatedLastName}/>

                    <Input name="updateBiography" label="Biyografi" type="text" onChangeVeriables={onChange} value={updatedBiography}/>

                    <Input name="updatePhoneNumber" label="Telefon Numarası" type="text" onChangeVeriables={onChange} value={updatedPhoneNumber}/>

                    <Input name="updateProfession" label="Meslek" type="text" onChangeVeriables={onChange} value={updatedProfession}/>

                    <Input name="updateBirthday" label="Doğum Günü" onChangeVeriables={onChange} type="date" value={formatDate(updatedBirthday)}/>

                    <Input name="updateImage" label="Resim" onChangeVeriables={onChangeFile} type="file"/>

                    {role == "ADMIN" &&
                        <Input name="adminKey" label="Admin Key" type="text" onChangeVeriables={onChange} placeholder="Admin Key Giriniz"/>
                    }

                    <div>
                                    
                        <button className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled = {pendingApiCall}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                            Kaydet
                        </button>

                    </div>

                    {error != null && <label className="alert alert-danger mt-2">{error}</label> }

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserUpdateProfile;