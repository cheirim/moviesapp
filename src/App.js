import React, { useEffect, useState } from 'react';

import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7bee6bf66c19bd21ed7301f22ef4ab7b";



const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=7bee6bf66c19bd21ed7301f22ef4ab7b&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect( () => {
    fetch(FEATURED_API)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        console.log(data)
      });
      
  }, [])

  const handleOnSubmit = e => {
    e.preventDefault();
    if(search){
      fetch(SEARCH_API + search)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        console.log(data)
      });

    setSearch('');
    }
    
  }

  const handleOnChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className="app-container">
      <header>
        <form onSubmit={handleOnSubmit}>
          <input type="text" className="search" placeholder="Search..." value={search}
          onChange={handleOnChange}/>
        </form>
      </header>
      <div className="movie-container">
      
        {movies.length > 0 && movies.map(movie => (       
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </div>
    
  );
}

export default App;
