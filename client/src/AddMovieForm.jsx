import React from "react";
import { useState } from "react";
import Axios from "axios";



const AddMovieForm = props => {

    const [values, setValues] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    });
    const [actors, setActors] = useState({});

    const onChangeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onStarsHandler = e => {
        setActors({
            ...actors, [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        const newMovie = {
            ...values,
            stars: [
                actors.star0,
                actors.star1,
                actors.star2,
            ]
        }

        Axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                props.setEdit(true);
            })
            .catch(err => {
                console.log(err)
            })

        props.setEdit(false);
        window.location.assign("/");
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="text"
                placeholder="Title"
                name="title"
                value={values.title}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                placeholder="Director"
                name="director"
                value={values.director}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                placeholder="MetaScore"
                name="metascore"
                value={values.metascore}
                onChange={onChangeHandler}
            />

            <input
                type="text"
                placeholder="Image Address"
                name="image"
                onChange={onChangeHandler}
            />


            <p>Actors</p>

            <div className="actors">
                <input
                    type="text"
                    name="star0"
                    placeholder="Star"
                    onChange={onStarsHandler}
                />
                <input
                    type="text"
                    name="star1"
                    placeholder="Star"
                    onChange={onStarsHandler}
                />
                <input
                    type="text"
                    name="star2"
                    placeholder="Star"
                    onChange={onStarsHandler}
                />
            </div>

            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default AddMovieForm;
