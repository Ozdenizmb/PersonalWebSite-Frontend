import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProgress } from "../shared/ApiProgress";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import ProjectPhoto from '../images/ProjectPhoto.png'
import Input from "./Input";
import { getProject, updateProject } from "../api/apiCalls";

const ProjectUpdate = () => {

    const [updatedName, setUpdatedName] = useState();
    const [updatedDescription, setUpdatedDescription] = useState();
    const [updatedUrl, setUpdatedUrl] = useState();
    const [updatedTechnologies, setUpdatedTechnologies] = useState();
    const [logoFile, setlogoFile] = useState();
    const [newImage, setNewImage] = useState();
    const [logoFileName, setLogoFileName] = useState('');

    const [error, setError] = useState(null);

    const pendingApiCall = useApiProgress('put','/api/v1/projects/update/');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
        try {
            const response = await getProject(id);

            setUpdatedName(response.data.name);
            setUpdatedDescription(response.data.description);
            setUpdatedUrl(response.data.url);
            setUpdatedTechnologies(response.data.technologies);
            setLogoFileName(response.data.imageUrl ? response.data.imageUrl.split('/').pop() : '');
        } catch(error) {

        }
    }

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "updatedName") {
            setUpdatedName(value);
        }
        if(name === "updatedDescription") {
            setUpdatedDescription(value);
        }
        if(name === "updatedUrl") {
            setUpdatedUrl(value);
        }
        if(name === "updatedTechnologies") {
            setUpdatedTechnologies(value);
        }

        setError(null);
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1) {
            return;
        }
        
        const file = event.target.files[0];
        setlogoFile(event.target.files[0]);

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

        setError(null);
    }
    
    const onClickUpdate = async (event) => {
        event.preventDefault();

        try {
            const body = {
                name: updatedName,
                description: updatedDescription,
                url: updatedUrl,
                technologies: updatedTechnologies
            };
    
            const formData = new FormData();
            formData.append('projectUpdateDto', new Blob([JSON.stringify(body)], {type: 'application/json'}));
            formData.append('file', logoFile);

            await updateProject(id, formData);
            navigate(`/project/detail/${id}`);
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="card text-center h-100 border rounded-3 shadow mb-5">
                <div className="card-header">
                    <img
                        className={"rounded-circle shadow"} 
                        width={200} height={200}
                        alt={"permission"} src={newImage || ProjectPhoto}>
                    </img>
                </div>
                <div className="card-body ps-5 pe-5">
                    <Input name="updatedName" label="Proje Adı" type="text" onChangeVeriables={onChange} placeholder="AmazonS3-CloudFront" value={updatedName} />

                    <label className="form-label">Açıklama</label>
                    <textarea name="updatedDescription" onChange={onChange} placeholder="The Spring project was written to learn how to use Amazon S3 and CloudFront (CDN)..." className="form-control mb-3" value={updatedDescription} style={{height:200}} />
                    
                    <Input name="updatedUrl" label="Proje Url" onChangeVeriables={onChange} type="text" value={updatedUrl} />

                    <Input name="updatedTechnologies" label="Kullanılan Teknolojiler" onChangeVeriables={onChange} type="text" value={updatedTechnologies} />

                    <div className="mb-3">
                        <label className="form-label">Resim</label>
                        <div className="d-flex justify-content-center align-items-center">
                            <input name="image" label="Resim" onChangeVeriables={onChangeFile} type="file" className="form-control" />
                            {logoFileName && <p className="mt-2 ms-4 text-success">{logoFileName}</p>}
                        </div>
                        
                    </div>

                    <div>
                                    
                        <button className="btn btn-primary d-inline-flex"
                                onClick={onClickUpdate}
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

export default ProjectUpdate;