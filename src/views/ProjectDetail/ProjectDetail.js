import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addLike, deleteLike, didILikeIt, getLikeCount, getProject } from "../../api/apiCalls";
import { useApiProgress } from "../../shared/ApiProgress";
import ProjectCommentsFeed from "../../components/ProjectCommentsFeed";
import './ProjectDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

const ProjectDetail = () => {
    const [project, setProject] = useState({});
    const { id } = useParams();

    const [likesCount, setLikesCount] = useState(0);
    const [didILike, setDidILike] = useState(false);

    const { userId, role } = useSelector((store) => ({
        userId: store.id,
        role: store.role
    }));

    const pendingApiCall = useApiProgress('get','/api/v1/projects/get/id/');
    const pendingApiCallDidILike = useApiProgress('get','/api/v1/likes/didILikeIt?userId=');
    const pendingApiCallLikeCount = useApiProgress('get','/api/v1/likes/get/');

    useEffect(() => {
        loadProject();
        didILikeThisProject();
        likeCount();
    }, []);

    const loadProject = async () => {
        try {
            const response = await getProject(id);
            setProject(response.data);
        } catch (error) {
        }
    };

    const didILikeThisProject = async () => {
        try {
            const response = await didILikeIt(userId, id);
            setDidILike(response.data);
        }
        catch(error) {

        }
    }

    const likeCount = async () => {
        try {
            const response = await getLikeCount(id);
            setLikesCount(response.data);
        } catch(error) {

        }
    }

    const handleLike = async (event) => {
        event.preventDefault();

        if(!didILike) {
            const body = {
                userId,
                projectId: id
            }

            try {
                await addLike(body);
                setDidILike(true);
                setLikesCount(likesCount + 1);
            } catch(error) {
    
            }
        }
        else {
            try {
                await deleteLike(userId, id);
                setDidILike(false);
                setLikesCount(likesCount - 1);
            } catch(error) {

            }
        }
        
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if(pendingApiCall && pendingApiCallDidILike && pendingApiCallLikeCount) {
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
                            {role &&
                                <div className="mt-3">
                                    <div className="project-likes">
                                        <button className={`btn btn-like ${didILike ? 'didILike' : ''}`} onClick={handleLike}>
                                            <FontAwesomeIcon icon={faThumbsUp} className="me-1" /> {likesCount}
                                        </button>
                                    </div>
                                </div>
                            }
                            
                            <div className="d-flex justify-content-end mt-5">
                                <a href={project.url} className="btn btn-primary" target="_blank">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" /> Projeye Git
                                </a>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <ProjectCommentsFeed id={id} />
        </div>
    );
};

export default ProjectDetail;
