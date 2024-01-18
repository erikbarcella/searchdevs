import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Components/Search'
import SearchButton from '../Components/SearchButton'
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
            alert('Usuário não encontrado');
            console.log(error);
        }
    };

    return (
        <div className='home'>
            <p className='searchdevs'><span className="search-color">Search </span><span className="devs-color">d_evs</span></p>
            <div style={{ display: 'flex', alignItems: 'center' }}> 
                <Search onChange={e => setSearchTerm(e.target.value)} width={'50ch'} height={'1ch'}/>
                <SearchButton onClick={handleSearch} text={'Search'} style={{marginLeft: '3vh', padding: '2vh 4vw'}}/>
            </div>
        </div>
    )
}