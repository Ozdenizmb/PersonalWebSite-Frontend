import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/apiCalls";
import { useApiProgress } from "../../shared/ApiProgress";
import './ProjectDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../../components/Spinner";

const ProjectDetail = () => {
    const [project, setProject] = useState({});
    const { id } = useParams();

    const pendingApiCall = useApiProgress('get','/api/v1/projects/get/id/');

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
        try {
        const response = await getProject(id);
        setProject(response.data);
        } catch (error) {
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if(pendingApiCall) {
        return(
            <Spinner />
        );
    }

    return (
        <div id="project-detail">
            <div className="container mt-5">
                <div className="card project-card shadow-sm">
                    <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                        src={project.imageUrl}
                        className="card-img project-img"
                        alt={project.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{project.name}</h5>
                            <hr />
                            <p className="card-text mt-5">
                                <strong>Açıklama:</strong> {project.description}
                            </p>
                            <p className="card-text">
                                <strong>Kullanılan Teknolojiler:</strong> {project.technologies}
                            </p>
                            <p className="card-text">
                                <strong>Tarih:</strong> {formatDate(project.createdDate)}
                            </p>
                            <a href={project.url} className="btn btn-primary" target="_blank">
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" /> Projeye Git
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ProjectDetail;
