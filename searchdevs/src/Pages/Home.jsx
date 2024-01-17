import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Components/Search'
import axios from 'axios';
import './Perfil'

export function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${searchTerm}`)
            if (res && res.data && res.status === 200) {
                try {
                    const response = await axios.get(`https://api.github.com/users/${searchTerm}/repos`)
                    if (response && response.data && response.status === 200) {
                        navigate('/perfil', { state: { user: res.data, repos: response.data, searchTerm } });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='home'>
            <h1><span className="search-color">Search </span><span className="devs-color">d_evs</span></h1>
            <Search onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch} >Search</button>
        </div>
    )
}