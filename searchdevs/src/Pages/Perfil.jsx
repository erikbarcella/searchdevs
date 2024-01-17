import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../Components/Search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Perfil() {
    const location = useLocation();
    const { user, repos, searchTerm } = location.state;
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [searchRepos, setSearchRepos] = useState([]);
    const [searchUsers, setSearchUser] = useState('');
    const navigate = useNavigate();

    const handleSearch = useCallback(async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${searchTerm}`)
            if (res && res.data && res.status === 200) {
                setSearchUser(res.data);
                try {
                    const response = await axios.get(`https://api.github.com/users/${searchTerm}/repos`)
                    if (response && response.data && response.status === 200) {
                        setSearchRepos(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [searchTerm]);

    const handleClick = async () => {
        await handleSearch();
        navigate(location.pathname, { state: { user, repos, searchTerm: localSearchTerm } });
    };

    useEffect(() => {
        if (localSearchTerm !== '') {
            handleSearch();
        }
    }, [handleSearch, localSearchTerm]);

    return (
        <div>
            <div>
                <h1>
                    <span className="search-color">Search </span>
                    <span className="devs-color">d_evs</span>
                </h1>
                <Search
                    value={localSearchTerm}
                    placeholder={localSearchTerm ? localSearchTerm : searchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
                <button onClick={handleClick}>Search</button>
            </div>

            {searchUsers ? (
                <div>
                    <h2>{searchUsers.name}</h2>
                    <img src={searchUsers.avatar_url} alt="Avatar" />
                    <h3>Repos</h3>
                    <ul>
                        {searchRepos.map((repo) => (
                            <li key={repo.id}>{repo.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>{user.name}</h2>
                    <img src={user.avatar_url} alt="Avatar" />
                    <h3>Repos</h3>
                    <ul>
                        {repos.map((repo) => (
                            <li key={repo.id}>{repo.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}