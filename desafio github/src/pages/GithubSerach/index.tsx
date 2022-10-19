import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type UserData = {
  user: string;
};

type information = {
  avatar_url: string;
  url: string;
  followers: string;
  location: string;
  name: string;
};

const GithubSearch = () => {
  const [information, setInformation] = useState<information>();

  const [UserData, setUserData] = useState<UserData>({
    user: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData({ ...UserData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${UserData.user}`)
      .then((response) => {
        setInformation(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setInformation(undefined);
        console.log(error);
      });
  };

  return (
    <div className="profile-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil GitHub</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="user"
              value={UserData.user}
              className="search-input"
              placeholder="Usuario GitHub"
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
     
        {information && (
          <>
           <div className="result-card">
            <img src={information.avatar_url} alt={information.name} />
            <div className="result-card-information">
              <h4>Informações</h4>
             <div className='perfil-description'>
              <p> <ResultCard title="Perfil:" description={information.url} /></p></div>
              <ResultCard title="Seguidores:"description={information.followers}/>
              <ResultCard title="Localidade:" description={information.location}/>
              <ResultCard title="Nome:" description={information.name} />
            </div>
            </div>
          </>
        )}

    </div>
  );
};

export default GithubSearch;
