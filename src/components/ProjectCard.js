import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {

    let numberOfCard = "col-md-3"

    let cardType = (
        <div id="project-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link to={`/projectdetail/${project.id}`} className="card-link nav-link">
                    <div className="image-container">
                    <img src={project.imageUrl} className="card-img-top rounded-2 img-fluid" alt={project.name} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{project.name}</h5>
                        <hr className="my-2" />
                        <p className="card-text mb-2">Mehmet Baran Özdeniz</p>
                        <p className="card-text mb-3 text-muted fst-italic">{project.technologies}</p>
                        <p className="card-text">{project.description}</p>
                        <button className="btn btn-primary">Görüntüle</button>
                    </div>
                </Link>
            </div>
        </div>
        
    )

    return(
        <div className={`mb-4 card_padding card-for-job ${numberOfCard}`}>
            {cardType}
        </div>
    );
}

export default ProjectCard;