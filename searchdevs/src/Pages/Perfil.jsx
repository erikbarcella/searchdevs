import React from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../Components/Search'

export function Perfil() {
    const location = useLocation();
    const { user, repos, searchTerm } = location.state;

    return (
        <div>
             <Search value={searchTerm} />
            <h1> <p>Termo de pesquisa: {searchTerm}</p></h1>
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