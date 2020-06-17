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

    const onChangeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onStarsHandler = e => {
        setValues({
            ...values, 
            stars: [...values.stars, e.target.value]
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        Axios.post(`http://localhost:5000/api/movies`, values)
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
                placeholder="Star"
                onChange={onStarsHandler}
            />
            <input
                type="text"
                placeholder="Star"
                onChange={onStarsHandler}
            />
            <input
                type="text"
                placeholder="Star"
                onChange={onStarsHandler}
            />

            <button type="submit">Submit</button>
        </form>
    )
}

export default AddMovieForm;
