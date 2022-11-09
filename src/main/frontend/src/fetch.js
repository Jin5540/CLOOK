import React, { useState, useEffect } from "react";

const Fetch = () => {
  const [location, setLocation] = useState([]);
  const [addresses, setAdresses] = useState([]);
  const [sweathers, setSweahters] = useState([]);
  const [tms, setTms] = useState([]);
  const [spt, setSpt] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    fetch("/api/location?address=충청남도 아산시 모종동", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        //console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/toptm", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTms(data);
        if(data.time!==undefined & data.message!==undefined){

        }else{
          console.log('console ::: undefined')
        }
        //console.log(data);
        //for(let i=0; i<data.time.length; i++){
          //if(data.time[i]!=="null"){
           // setTime(data.time[i]);
          //}
          
        //}
      });
  }, []);

  useEffect(() => {
    fetch("/api/topspt", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSpt(data);

        //console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/search?saddress=충청남도 아산시", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        //setAdresses(data);
      });
  }, []);

  return (
    <div>
      <ul>{location}</ul>

      <ul>
        {addresses.map((address) => (
          <li>{address}</li>
        ))}
      </ul>
      <ul>
      <li>{tms.tmn}</li>
      <li>{tms.tmx}</li>
      <li>{tms.message}</li>
      <li>{tms.time}</li>
      </ul>
      <ul>
      <li>{spt.icon}</li>
      <li>{spt.t1h}</li>
      <li>{spt.character}</li>
      </ul>
    </div>
  );
};

export default Fetch;
