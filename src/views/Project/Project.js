import React, { useEffect, useState } from 'react';
import ProjectCardFeed from '../../components/ProjectCardFeed';
import UserList from '../../components/UserList';

const Project = () => {
    return(
        <div className="container mt-4">
            <div className="row">
                <UserList />
            </div>
            <h1 className="text-center mb-5 mt-5">Projeler</h1>
            <ProjectCardFeed />
        </div>
    );
}

export default Project;