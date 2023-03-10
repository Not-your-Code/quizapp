import React, { useEffect, useState } from 'react'

export default function Category() {
    const [categories, setCategories] = useState({});
    useEffect(() => {
        const url = 'https://the-trivia-api.com/api/categories'

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setCategories(json)

            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [1])

    useEffect(() => {
        console.log(categories)

    }, [categories])


    const objKeys = [];
    for (let key in categories) {
        objKeys.push(key);
    }

    const handleSubmit = () => {

    }

    return (

        <div className='category'>
            <form method='get' onSubmit={handleSubmit()}>
                <label >Category </label>
                <select id="cars" name="cars">
                    {objKeys.map((key, i) => (<option value={key}>{key}</option>))}
                </select>
                <button type='submit'>submit</button>
            </form>


        </div>
    )
}
