import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../Components/Search'
import SearchButton from '../Components/SearchButton'
import { useNavigate } from 'react-router-dom';
import Avatar from '../Components/Avatar'
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
            alert('Usuário não encontrado');
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
                        <div className="profileview">
                            <div className='avatarview'>
                                <Avatar src={searchUsers.avatar_url} />
                            </div>
                            <div className='userview'>
                                <p style={{ fontWeight: 'bold' }}>{searchUsers.name}</p>
                                <p style={{ color: '6c7484', fontWeight: '400' }}>@{searchUsers.login}</p>
                            </div>
                        </div>
                        <div className='userinfos' style={{ color: '6c7484', fontWeight: '400' }}>
                            {searchUsers.bio ? <p style={{ fontSize: 'small', width: '14vw' }}>{searchUsers.bio}</p> : ''}

                            {searchUsers.followers ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PeopleIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{searchUsers.followers}</p>
                            </div> : ''}

                            {searchUsers.following ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FavoriteBorderIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{searchUsers.following}</p>
                            </div> : ''}

                            {searchUsers.company ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{searchUsers.company}</p>
                            </div> : ''}

                            {searchUsers.location ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{searchUsers.location}</p>
                            </div> : ''}

                            {searchUsers.email ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <MailOutlineIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{searchUsers.email}</p>
                            </div> : ''}

                            {searchUsers.twitter_username ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TwitterIcon fontSize='small' />
                                <a style={{ textDecoration: 'none', color: 'inherit' }} href={`https://twitter.com/${searchUsers.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                    @{searchUsers.twitter_username}
                                </a>
                            </div> : ''}

                        </div>

                        {searchUsers.blog ?
                            <SearchButton onClick={() => navigate(`/${searchUsers.blog}`)} text={'Contato'}
                                style={{ padding: '2vh 9vw' }} /> : ''
                        }
                    </div>

                    <div className='resultreposinfos' style={{ width: '60%', marginTop: '9vh' }}>
                        <div className="repositories-container">
                            {searchRepos
                                .slice()
                                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                                .map((searchRepo) => (
                                    <div key={searchRepo.id} className="repository-box">
                                        <strong><a style={{ textDecoration: 'none', color: 'inherit' }} href={searchRepo.html_url}>  {searchRepo.name} </a></strong>
                                        <p>{searchRepo.description}</p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <StarBorderIcon fontSize='small' />
                                            <p style={{ marginLeft: '1vh' }}>{searchRepo.stargazers_count}</p>
                                        </div>
                                        <p>Atualizado há {
                                            Math.ceil(
                                                (new Date() - new Date(searchRepo.updated_at)) / (1000 * 60 * 60 * 24)
                                            )
                                        } dias</p>
                                        <p>Linguagem: {searchRepo.language}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
            ) : (
                <div>
                    <div className='resultuserinfos' style={{
                        width: '22%',
                        marginLeft: '4vw', marginTop: '9vh', marginRight: '8vw'
                    }}>
                        <div className="profileview">
                            <div className='avatarview'>
                                <Avatar src={user.avatar_url} />
                            </div>
                            <div className='userview'>
                                <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                                <p style={{ color: '6c7484', fontWeight: '400' }}>@{user.login}</p>
                            </div>
                        </div>
                        <div className='userinfos' style={{ color: '6c7484', fontWeight: '400' }}>
                            {user.bio ? <p style={{ fontSize: 'small', width: '14vw' }}>{user.bio}</p> : ''}

                            {user.followers ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PeopleIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{user.followers}</p>
                            </div> : ''}

                            {user.following ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FavoriteBorderIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{user.following}</p>
                            </div> : ''}

                            {user.company ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{user.company}</p>
                            </div> : ''}

                            {user.location ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{user.location}</p>
                            </div> : ''}

                            {user.email ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <MailOutlineIcon fontSize='small' />
                                <p style={{ marginLeft: '1vh' }}>{user.email}</p>
                            </div> : ''}

                            {user.twitter_username ? <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TwitterIcon fontSize='small' />
                                <a style={{ textDecoration: 'none', color: 'inherit' }} href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                    @{user.twitter_username}
                                </a>
                            </div> : ''}

                        </div>

                        {user.blog ?
                            <SearchButton onClick={() => navigate(`/${user.blog}`)} text={'Contato'}
                                style={{ padding: '2vh 9vw' }} /> : ''
                        }

                    </div>

                    <div className='resultreposinfos' style={{ width: '60%', marginTop: '9vh' }}>
                        <div className="repositories-container">
                            {repos
                                .slice()
                                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                                .map((repo) => (
                                    <div key={repo.id} className="repository-box">
                                        <strong><a style={{ textDecoration: 'none', color: 'inherit' }} href={repo.html_url}>  {repo.name} </a></strong>
                                        <p>{repo.description}</p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <StarBorderIcon fontSize='small' />
                                            <p style={{ marginLeft: '1vh' }}>{repo.stargazers_count}</p>
                                        </div>
                                        <p>Stars: {repo.stargazers_count}</p>
                                        <p>Last Updated: {repo.updated_at}</p>
                                        <p>Linguagem: {repo.language}</p>
                                    </div>
                                ))}
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}