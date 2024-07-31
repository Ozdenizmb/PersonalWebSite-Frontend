import React, { useEffect, useState } from 'react';
import ProjectCardFeed from '../../components/ProjectCardFeed';

const Project = () => {
    return(
        <div className="container mt-4">
            <h1 className="text-center mb-5">Projeler</h1>
            <ProjectCardFeed />
        </div>
    );
}

export default Project;