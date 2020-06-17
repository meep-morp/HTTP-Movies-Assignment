import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import EditForm from "./EditForm";
import AddMovieForm from "./AddMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [edit, setEdit] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [edit]);

  return (
    <>
      <SavedList list={savedList} />

    <Link to="/add">Add Movie</Link>

      <Route exact path="/">
        <MovieList movies={movieList} setEdit={setEdit} />
      </Route>

      <Route path="/add">
        <AddMovieForm setEdit={setEdit} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <EditForm />
      </Route>
    </>
  );
};

export default App;
