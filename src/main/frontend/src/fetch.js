import React, {useState, useEffect} from 'react'

const Fetch = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/location', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
            
        })
    },[])

    return (
        <div>
            <ul>
              <div>{posts}</div>
            </ul>

        </div>
    )
}

export default Fetch;