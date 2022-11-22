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
  const [sun, setSun] = useState([]);
  const [air, setAir] = useState([]);

  useEffect(() => {
    fetch("/api/location?address=서울특별시 강남구 역삼동", { method: "GET" })
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

  useEffect(() => {
    fetch("/api/sun", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
      
        setSun(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/air", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
      
        setAir(data);
        console.log(data);
      });
  }, []);


 /*useEffect(() => {
    fetch("/api/search?saddress=충청남도 아산시", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAdresses(data);
        console.log(data);
      });
  }, []);*/

  return (
    <div>
      <ul>{location}</ul>

      <ul>
        {addresses.map((address) => (
          <li>{address}</li>
        ))}
      </ul>
      <ul>
        <li>최저 : {tms.tmn}</li>
        <li>최고 : {tms.tmx}</li>
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
        <li>아이콘 : {spt.icon}</li>
        <li>기온 : {spt.t1h}</li>
        <li>캐릭터 : {spt.character}</li>
        <li>배경 : {spt.background}</li>
      </ul>
      <ul>
        {clothes.map((c) => (
          <li>상의 1 :{c.clothes1}
          || 상의 2 :{c.clothes2}
          {c.item}
          시간 {c.m}
          </li>
          
        ))}
      </ul>
      <ul>
        {todays.map((t) => (
          <li>아이콘 :{t.icon}
          ||기온 : {t.tmp}
          ||강수확률 : {t.pop}
          ||시간 : {t.ftime}
          </li>
          
        ))}
      </ul>
      <ul>
          <li>풍향 : {cards.vec}</li>
          <li>풍속: {cards.wsd}</li>
          <li>습도 : {cards.reh}</li>
          <li>강우량 : {cards.pcp}</li>
          
      
      </ul>

      <ul>
      {uvs.map((u) => (
          <li>자외선 : {u.h0}
          </li>
          
        ))}
          
      
      </ul>

      <ul>
          <li>일출 : {sun.sunrise}</li>
          <li>일몰 : {sun.sunset}</li>
      </ul>

      <ul>
          <li>미세먼지 : {air.pm10Grade1h}</li>
          <li>초미세먼지 : {air.pm25Grade1h}</li>
      </ul>
    </div>
  );
};

export default Fetch;
