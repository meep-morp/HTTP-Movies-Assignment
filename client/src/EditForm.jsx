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
    const [newStars, setNewStars] = useState(values.stars);

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
        setNewStars({ ...newStars, [e.target.name]: e.target.value })
    }
    console.log(newStars)

    const onSubmitHandler = e => {
        e.preventDefault();

        const editValues = {
            ...values,
            stars: [newStars.star0, newStars.star1, newStars.star3]
        }

        axios.put(`http://localhost:5000/api/movies/${id}`, editValues)

        window.location.assign("/");
    }

    console.log(newStars)

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
            <input
                type="text"
                name="image"
                placeholder="Image Address"
                value={values.image}
                onChange={onChangeHandler}
            />
            <p>Stars</p>
            <div className="actors">
                {values.stars.map((star, i) => (
                    <input
                        type="text"
                        name={`star${i}`}
                        value={newStars[i]}
                        placeholder="Actor"
                        onChange={newStarsHandler}
                    />
                ))}
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default EditForm;