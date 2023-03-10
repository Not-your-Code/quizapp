import React, { useEffect, useState } from 'react'

export default function Category() {
    const [categories, setCategories] = useState({});
    const [userCat, setUsercat] = useState('History')
    const [userMode, setUserMode] = useState('Easy')
    const [userLimit, setUserLimit] = useState(1)
    const mode = ["easy ", "medium", "hard"];
    const limit = [];
    const [fetched, setFetched] = useState({})

    for (let i = 1; i <= 20; i++) {
        limit.push(i);
    }



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
    }, [])



    const objKeys = [];
    for (let key in categories) {
        objKeys.push(key);
    }

    const handleChangeCat = (e) => setUsercat(e.target.value)
    const handleChangeMode = (e) => setUserMode(e.target.value)
    const handleChangeLimit = (e) => setUserLimit(e.target.value)


    const handleSubmit = (e) => {
        e.preventDefault();
        const FetchUrl = `https://the-trivia-api.com/api/questions?categories=${userCat}&limit=${userLimit}&difficulty=${userMode}`
        console.log(FetchUrl)
        fetchData_user(FetchUrl)

    }

    const fetchData_user = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setFetched(json)

        } catch (error) {
            console.log("error", error);
        }
    };

    return (

        <div className='category'>
            <form method='get' onSubmit={handleSubmit} >
                <label >Category </label>

                <select value={userCat} onChange={handleChangeCat}>
                    {objKeys.map(key => (<option value={key}>{key}</option>))}
                </select>
                <select value={userMode} onChange={handleChangeMode}>
                    {mode.map(key => (<option value={key}>{key}</option>))}
                </select>
                <select value={userLimit} onChange={handleChangeLimit}>
                    {limit.map(key => (<option value={key}>{key}</option>))}
                </select>
                <button type='submit'>submit</button>
            </form>


        </div>
    )
}
