import React, {useState, useEffect} from 'react'

const Fetch = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('/api/location', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])

    return (
        <div>
            <ul>
                {
                    posts.map(post => 
                    <li>{post}</li>
                    )
                }
            </ul>

        </div>
    )
}

export default Fetch;