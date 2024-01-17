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
                    <p>{searchUsers.login}</p>
                    <p>{searchUsers.bio}</p>
                    <p>{searchUsers.followers}</p>
                    <p>{searchUsers.following}</p>
                    <p>{searchUsers.company}</p>
                    <p>{searchUsers.location}</p>
                    <p>{searchUsers.email}</p>
                    {searchUsers.blog ? 
                    <a href={searchUsers.blog} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#008CBA', color: 'white', padding: '14px 20px', textDecoration: 'none', textAlign: 'center', cursor: 'pointer' }}>
                    Visite o site
                    </a> : ''
                    }
                    <a href={`https://twitter.com/${searchUsers.twitter_username}`} target="_blank" rel="noopener noreferrer">
                        {searchUsers.twitter_username}
                    </a>
                    <h3>Repos</h3>
                    <ul>
                        {searchRepos
                        .slice() 
                        .sort((a, b) => b.stargazers_count - a.stargazers_count) 
                        .map((repo) => (
                            <>
                            
                            <li key={repo.id}> <a href={repo.html_url}>  {repo.name} </a> </li>
                            <li key={repo.id}>{repo.description}</li>
                            <li key={repo.id}>{repo.stargazers_count}</li>
                            <li key={repo.id}>{repo.updated_at}</li>
                            <li key={repo.id}>{repo.language}</li>
                            
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>{user.name}</h2>
                    <img src={user.avatar_url} alt="Avatar" />
                    <p>{user.login}</p>
                    <p>{user.bio}</p>
                    <p>{user.followers}</p>
                    <p>{user.following}</p>
                    <p>{user.company}</p>
                    <p>{user.location}</p>
                    <p>{user.email}</p>
                    {user.blog ? 
                    <a href={user.blog} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#008CBA', color: 'white', padding: '14px 20px', textDecoration: 'none', textAlign: 'center', cursor: 'pointer' }}>
                    Visite o site
                    </a> : ''
                    }
                    {user.twitter_username ? 
                    <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    {user.twitter_username}
                    </a> : ''
                    }
                    <h3>Repos</h3>
                    <ul>
                        {repos
                        .slice() 
                        .sort((a, b) => b.stargazers_count - a.stargazers_count) 
                        .map((repo) => (
                            <>
                          
                            <li key={repo.id}> <a href={repo.html_url}>  {repo.name} </a> </li>
                            <li key={repo.id}>{repo.description}</li>
                            <li key={repo.id}>{repo.stargazers_count}</li>
                            <li key={repo.id}>{repo.updated_at}</li>
                            <li key={repo.id}>{repo.language}</li>

                            </>
                            
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}