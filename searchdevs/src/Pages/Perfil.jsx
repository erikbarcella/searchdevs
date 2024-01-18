import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../Components/Search'
import SearchButton from '../Components/SearchButton'
import { useNavigate } from 'react-router-dom';
import Avatar from '../Components/Avatar'
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

    const handleHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (localSearchTerm !== '') {
            handleSearch();
        }
    }, [handleSearch, localSearchTerm]);
    return (
        <div className='resultinfos' >
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchButton onClick={handleHome} text={'Home'} style={{ marginLeft: '8vh', padding: '2vh 4vw' }} />
                    <p className='searchdevs'>
                        <span className="search-color"
                            style={{ fontSize: '2rem', marginLeft: '5vw' }}>Search
                        </span>
                        <span className="devs-color"
                            style={{ fontSize: '2rem', marginRight: '5vw' }}>d_evs
                        </span>
                    </p>
                    <Search
                        value={localSearchTerm}
                        placeholder={localSearchTerm ? localSearchTerm : searchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        width={'50ch'}
                        height={'1ch'}
                        border={'#8c1cd4'}
                    />
                    <SearchButton onClick={handleClick} text={'Search'}
                        style={{ marginLeft: '3vh', padding: '2vh 4vw' }} />
                </div>
            </div>

            {searchUsers ? (
                <div>
                    <div className='resultuserinfos' style={{
                        width: '22%',
                        marginLeft: '4vw', marginTop: '9vh', marginRight: '8vw'
                    }}>
                        <span display="flex" justify-content="flex-end" >
                            <h2>{searchUsers.name}</h2>
                            <Avatar src={searchUsers.avatar_url} />
                            <p>@{searchUsers.login}</p>
                        </span>
                        <p>{searchUsers.bio}</p>
                        <p>{searchUsers.followers}</p>
                        <p>{searchUsers.following}</p>
                        <p>{searchUsers.company}</p>
                        <p>{searchUsers.location}</p>
                        <p>{searchUsers.email}</p>
                        <a href={`https://twitter.com/${searchUsers.twitter_username}`} target="_blank" rel="noopener noreferrer">
                            {searchUsers.twitter_username}
                        </a>
                        {searchUsers.blog ?
                            <SearchButton onClick={() => navigate(`/${searchUsers.blog}`)} text={'Contato'}
                                style={{ padding: '2vh 9vw' }} /> : ''
                        }
                    </div>

                    <div className='resultreposinfos' style={{ width: '60%', marginTop: '9vh' }}>
                        <ul>
                            {searchRepos
                                .slice()
                                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                                .map((repositories) => (
                                    <>
                                        <li> <a href={repositories.html_url}>  {repositories.name} </a> </li>
                                        <li>{repositories.description}</li>
                                        <li>{repositories.stargazers_count}</li>
                                        <li>{repositories.updated_at}</li>
                                        <li>{repositories.language}</li>

                                    </>
                                ))}
                        </ul>
                    </div>

                </div>
            ) : (
                <div>
                     <div className='resultuserinfos' style={{
                        width: '22%',
                        marginLeft: '4vw', marginTop: '9vh', marginRight: '8vw'
                    }}>
                        <div >
                            <span display="flex" justify-content="flex-end" >
                                <h2>{user.name}</h2>
                                <Avatar src={user.avatar_url} />
                                <p>@{user.login}</p>
                            </span>
                            <p>{user.bio}</p>
                            <p>{user.followers}</p>
                            <p>{user.following}</p>
                            <p>{user.company}</p>
                            <p>{user.location}</p>
                            <p>{user.email}</p>
                            {user.twitter_username ?
                                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                    {user.twitter_username}
                                </a> : ''
                            }
                            {user.blog ?
                                <SearchButton onClick={() => navigate(`/${user.blog}`)} text={'Contato'}
                                    style={{ padding: '2vh 9vw' }} /> : ''
                            }

                        </div>

                    </div>

                    <div className='resultreposinfos' style={{ width: '60%', marginTop: '9vh' }}>
                        <ul>
                            {repos
                                .slice()
                                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                                .map((repo) => (
                                    <>
                                        <li> <a href={repo.html_url}>  {repo.name} </a> </li>
                                        <li>{repo.description}</li>
                                        <li>{repo.stargazers_count}</li>
                                        <li>{repo.updated_at}</li>
                                        <li>{repo.language}</li>
                                    </>
                                ))}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    );
}