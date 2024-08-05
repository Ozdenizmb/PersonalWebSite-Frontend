import React, { useState } from "react";
import { useApiProgress } from "../shared/ApiProgress";
import { createProject } from "../api/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import ProjectPhoto from '../images/ProjectPhoto.png';
import Input from "./Input";

const ProjectCreate = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [url, setUrl] = useState();
    const [technologies, setTechnologies] = useState();
    const [logoFile, setlogoFile] = useState();
    const [newImage, setNewImage] = useState();

    const [error, setError] = useState(null);

    const pendingApiCall = useApiProgress('post','/api/v1/projects/create');

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "name") {
            setName(value);
        }
        if(name === "description") {
            setDescription(value);
        }
        if(name === "url") {
            setUrl(value);
        }
        if(name === "technologies") {
            setTechnologies(value);
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

    const onClickSave = async (event) => {
        event.preventDefault();

        const body = {
            name,
            description,
            url,
            technologies
        };

        const formData = new FormData();
        formData.append('projectCreateDto', new Blob([JSON.stringify(body)], {type: 'application/json'}));
        formData.append('file', logoFile);

        try {
            await createProject(formData);
            toast.success("Proje Kaydı Başarıyla Oluşturuldu!");

            setName("");
            setDescription("");
            setUrl("");
            setTechnologies("");
            setlogoFile(null);
            setError(null);
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
                    <Input name="name" label="Proje Adı" type="text" onChangeVeriables={onChange} placeholder="AmazonS3-CloudFront" value={name} />

                    <label className="form-label">Açıklama</label>
                    <textarea name="description" onChange={onChange} placeholder="The Spring project was written to learn how to use Amazon S3 and CloudFront (CDN)..." className="form-control mb-3" value={description} style={{height:200}} />
                    
                    <Input name="url" label="Proje Url" onChangeVeriables={onChange} type="text" value={url} />

                    <Input name="technologies" label="Kullanılan Teknolojiler" onChangeVeriables={onChange} type="text" value={technologies} />

                    <Input name="image" label="Resim" onChangeVeriables={onChangeFile} type="file" />

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

export default ProjectCreate;