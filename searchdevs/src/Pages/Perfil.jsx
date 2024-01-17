import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../Components/Search'

export function Perfil() {
    const location = useLocation();
    const { user, repos, searchTerm } = location.state;
    const [localSearchTerm, setLocalSearchTerm] = useState('');    

    const handleSearch = async () => {
        // try {
        //     const res = await axios.get(`https://api.github.com/users/${searchTerm}`)
        //     if(res && res.data && res.status === 200) {
        //         try {
        //             const response = await axios.get(`https://api.github.com/users/${searchTerm}/repos`)
        //             if(response && response.data && response.status === 200) {
        //                 // navigate('/perfil', { state: { user: res.data, repos: response.data, searchTerm } });
        //             }
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    useEffect(() => {
        if (localSearchTerm !== '') {
          // Chama a função de busca quando localSearchTerm não estiver vazio
          handleSearch();
        }
      }, [localSearchTerm]);

    return (
        <div>
              
             
            <h1><span className="search-color">Search </span><span className="devs-color">d_evs</span></h1>
            <Search value={localSearchTerm}  placeholder={searchTerm} onChange={e => setLocalSearchTerm(e.target.value)}/>
            <button onClick={handleSearch} >Search</button>
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