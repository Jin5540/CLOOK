import React, { useState, useEffect } from "react";

const Fetch = () => {
  const [location, setLocation] = useState([]);
  const [addresses, setAdresses] = useState([]);
  const [sweathers, setSweahters] = useState([]);
  const [tms, setTms] = useState([]);
  const [spt, setSpt] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [time, setTime] = useState([]);
  const [message, setMessage] = useState([]);
  const [todays, setTodays] = useState([]);
  const [cards, setCards] = useState([]);
  const [uvs, setUvs] = useState([]);

  useEffect(() => {
    fetch("/api/location", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/toptm", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTms(data);
        if ((data.time !== undefined) & (data.message !== undefined)) {
          
          for(let i=0; i<data.message.length; i++){
            message.push(data.message[i]);
            time.push(data.time[i]);
          }
        } else {
          console.log("console ::: undefined");
        }

        console.log(data);

      });
  }, []);

  useEffect(() => {
    fetch("/api/topspt", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSpt(data);

        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/clothes", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setClothes(data);

        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/today", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
      
        setTodays(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/card", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
      
        setCards(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/uv", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
      
        setUvs(data);
        console.log(data);
      });
  }, []);


 // useEffect(() => {
 //   fetch("/api/search?saddress=충청남도 아산시", { method: "GET" })
 //     .then((res) => res.json())
 //     .then((data) => {
 //       //setAdresses(data);
  //    });
  //}, []);

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
      </ul>
      <ul>
        {message.map((m) => (
          <li>{m}</li>
        ))}
      </ul>
      <ul>
        {time.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
      <ul>
        <li>{spt.icon}</li>
        <li>{spt.t1h}</li>
        <li>{spt.character}</li>
        <li>{spt.background}</li>
      </ul>
      <ul>
        {clothes.map((c) => (
          <li>{c.clothes1}
          {c.clothes2}
          {c.item}
          {c.m}
          </li>
          
        ))}
      </ul>
      <ul>
        {todays.map((t) => (
          <li>{t.icon}
          ||{t.tmp}
          ||{t.pop}
          ||{t.ftime}
          </li>
          
        ))}
      </ul>
      <ul>
          <li>{cards.vec}</li>
          <li>{cards.wsd}</li>
          <li>{cards.reh}</li>
          <li>{cards.pcp}</li>
          
      
      </ul>

      <ul>
      {uvs.map((u) => (
          <li>{u.h0}
          </li>
          
        ))}
          
      
      </ul>
    </div>
  );
};

export default Fetch;
