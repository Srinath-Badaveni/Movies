import React from "react";
import { useState, useEffect } from "react";

export default function Banner({data,newNames}) {
  const [number, setNumber] = useState(1);
  const maxNumber = 20;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumber((prevNumber) => (prevNumber < maxNumber ? prevNumber + 1 : 0));
      console.log(number)
    }, 10000); // Increment every 1000 milliseconds (1 second)
    
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data[number]})`,
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-900/60 p-3 italic">
      {newNames[number]}
      </div>
    </div>
  );
}
