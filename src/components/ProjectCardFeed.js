import React, { useEffect, useState } from "react";
import { getAllProjects } from "../api/apiCalls";
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from "./ProjectCard";

const ProjectCardFeed = () => {

    const [projects, setProjects] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState();

    const pendingApiCall = useApiProgress('get','/api/v1/projects/get?page=');

    const [error, setError] = useState(null);

    const pageSize = 12;
    const sort = "createdDate,DESC";

    const fetchProjects = async (pageNumber, pageSize, pageSort) => {
        const previousProjects = [...projects];

        try {
            const response = await getAllProjects(pageNumber, pageSize, pageSort);
            const data = response.data.content;
            setIsLastPage(response.data.last);
            setPageNumber(response.data.pageable.pageNumber);
            setIsThereData(response.data.totalElements);
            const convertedProjects = data.map(project => ({
                id: project.id,
                name: project.name,
                description: project.description,
                technologies: project.technologies,
                url: project.url,
                imageUrl: project.imageUrl
            }));

            const combinedProjects = [...previousProjects, ...convertedProjects];
            setProjects(combinedProjects);

        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    useEffect(() => {
        fetchProjects(pageNumber, pageSize, sort);
    }, []);

    const onClickLoadMoreCardButton = () => {
        fetchProjects(pageNumber + 1, pageSize, sort);
    }

    if((isThereData === 0 && !pendingApiCall) || error != null) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Herhangi Bir Proje Bulunmamaktadır...</p>
          </div>
        );
    }

    if(projects.length == 0) {
        return (
          <Spinner />
        );
    }

    return(
        <div id="card-feed">
            <div className="row">
                {projects.map((projects, index) => (
                    <ProjectCard key={index} project={projects} />
                ))}
                <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                    Daha Fazla Göster
                </button>
            </div>
        </div>
    );
}

export default ProjectCardFeed;