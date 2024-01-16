import React from 'react';
import { useLocation } from 'react-router-dom';

export function Perfil() {
    const location = useLocation();
    const { user, repos } = location.state;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
}