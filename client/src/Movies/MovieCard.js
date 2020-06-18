import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars, id, image } = props.movie;

  const deleteMovie = id => {
    Axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res)
        props.setEdit(true)
      })

    props.setEdit(false);
  }

  return (
    <div className="movie-card">
      <Link className="link" to={`/movies/${id}`}>
        <div className="title">
          <h2>{title}</h2>
        </div>
      </Link>
      <div className="container">
        <div className="details">
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        <img src={!image || image === "" ?
          "https://lh6.googleusercontent.com/proxy/hIgFSMyx4VsuoQh8h-ZfI3IiK9uFSLZ7pG67H_1RwEBDEPiWX-odcJ0PkWriAPeqwKyC6n-12UTrNmQF2ul9DAjwKMljG3zSCCTDoTVDPexFHV9l_JD5WMbmpnUJqWLqYA=s0-d"
          : image}
          alt="Poster"
        />
      </div>
      <Link className="link" to={`/update-movie/${id}`}>Edit</Link>
      <button className="delete button" onClick={() => deleteMovie(id)}>
        X</button>
    </div>
  );
};

export default MovieCard;
