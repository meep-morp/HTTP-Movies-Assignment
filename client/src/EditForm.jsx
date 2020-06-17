import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const EditForm = props => {
    const [values, setValues] = useState({
        title: "",
        director: "",
        metascore: 0,
        stars: []
    });
    const [newStars, setNewStars] = useState([]);

    const UrlId = useParams();
    const id = UrlId.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    const onChangeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const newStarsHandler = e => {
        setValues({
            ...values,
            stars: [...values.stars, e.target.value]
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        const editValues = {
            ...values,
            ...newStars
        }

        axios.put(`http://localhost:5000/api/movies/${id}`, editValues)

        window.location.assign("/");
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="text"
                name="title"
                value={values.title}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                name="director"
                value={values.director}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                name="metascore"
                value={values.metascore}
                onChange={onChangeHandler}
            />
            {values.stars.map(star => (
                <input
                    type="text"
                    name="stars"
                    value={star}
                    onChange={newStarsHandler}
                />
            ))}

            <button type="submit">Submit</button>
        </form>
    )
}

export default EditForm;