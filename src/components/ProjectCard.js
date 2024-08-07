import React from "react";
import '../style/Components.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteProject } from "../api/apiCalls";

const ProjectCard = ({ project }) => {

    const { role } = useSelector(store => ({
        role: store.role,
    }));

    const onClickDelete = async () => {
        try {
            await deleteProject(project.id);
            window.location.reload();
        } catch(error) {

        }
    }

    let numberOfCard = "col-md-3"

    let cardType = (
        <div id="project-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link to={`/project/detail/${project.id}`} className="card-link nav-link d-flex flex-column flex-grow-1">
                    <div className="image-container">
                    <img src={project.imageUrl} className="card-img-top rounded-2 img-fluid" alt={project.name} />
                    </div>
                    <div className="card-body d-flex flex-column flex-grow-1">
                        <h5 className="card-title">{project.name}</h5>
                        <hr className="my-2" />
                        <p className="card-text mb-2">Mehmet Baran Özdeniz</p>
                        <p className="card-text mb-3 text-muted fst-italic">{project.technologies}</p>
                        <p className="card-text">{project.description}</p>
                        <div className="d-flex justify-content-between mt-auto">
                            <button className="btn btn-primary flex-grow-1 me-2">Görüntüle</button>
                            {role === "ADMIN" && (
                                <>
                                    <Link to={`/project/update/${project.id}`} className="btn btn-success flex-grow-1 me-2">Güncelle</Link>
                                    <Link  className="btn btn-danger flex-grow-1" onClick={onClickDelete}>Sil</Link>
                                </>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        
    )

    return(
        <div className={`mb-4 card_padding card-for-project ${numberOfCard}`}>
            {cardType}
        </div>
    );
}

export default ProjectCard;