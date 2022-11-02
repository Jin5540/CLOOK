import React, {useState, useEffect} from 'react'

const Fetch = () => {

    const [locations, setLocations] = useState([])
    const [sweathers, setSweahters] = useState([])

    useEffect(() => {
        fetch('/api/location', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setLocations(data)
        })
    },[])

    useEffect(() => {
        fetch('/api/short', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setSweahters(data)
        })
    },[])

    return (
        <div>


            <ul>
                {
                    locations.map(location => 
                    <li>{location}</li>
                    )
                }
            </ul>

            <ul>
                {
                    sweathers.map(sweather => 
                        <>
                    <li>vec : {sweather.vec}</li>
                    <li>sky : {sweather.sky}</li>
                    <li>pty : {sweather.pty}</li>
                    <li>pop : {sweather.pop}</li>
                    <li>pcp : {sweather.pcp}</li>
                    <li>reh : {sweather.reh}</li>
                    <li>sno : {sweather.sno}</li>
                        </>
                    )
                }
            </ul>

        </div>

        
    )
}

export default Fetch;