import React, { useState } from 'react';
import Search from '../Components/Search'

export function Home() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(searchTerm)
        console.log(`Pesquisando por: ${searchTerm}`);
      };

    return (
        <>
        <div className='home'> 
        <h1><span className="search-color">Search </span><span className="devs-color">d_evs</span></h1>
            <Search onChange={e => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>
            

        </>
    )
}