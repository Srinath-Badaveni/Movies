import React, { useState } from "react";
import Moviescard from "./Moviescard";
import { useEffect } from "react";
import axios from "axios";
import Scroll from "d:/Users/Srinath/Programing/development/react/my-project/src/components/scroll";
import WatchList from "./WatchList";

export default function Movies({
  handleAddToWatchList,
  removeWatchList,
  WatchList,
  updataData,
  updataNames
}) {
  const [PageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState([]);
  const [items, setItems] = useState([]);
  updataData(items)
  const [Names, setNames] = useState([]);
  updataNames(Names)
  // Function to handle adding a new item to the array
  // const handleAddItem = () => {
  //   if (inputValue) {
  //     // Update state with the new array
  //     setItems((prevItems) => [...prevItems, inputValue]);
  //     setInputValue(''); // Clear input after adding
  //   }
  // };
  const handlePrev = () => {
    if (PageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(PageNo - 1);
    }
  };
  const handleNext = () => {
    setPageNo(PageNo + 1);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ca8c9273964b5fa13c8bf216e6120ee3&language=en-US&page=${PageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [PageNo]);
  useEffect(() => {
    let temp = movies.map((movieObj) => {
      return movieObj.backdrop_path;
    });
    temp = new Set(temp);
    setItems(["", ...temp]);
    // console.log(temp2)
  }, [movies]);
  useEffect(() => {
    let temp1 = movies.map((movieObj) => {
      return movieObj.title;
    });
    temp1 = new Set(temp1);
    setNames(["", ...temp1]);
    console.log(temp1)
  }, [movies]);
  
  return (
    <div className="p-1">
      <div className="font-bold text-2xl gap-8 text-gray-400">Top Picks</div>
      <p className="px-3 text-0.5xl text-gray-400">
        TV shows and movies just for you
      </p>
      <div className=" flex flex-row flex-wrap justify-evenly space-x-4 ">
        {movies.map((movieObj) => {
          setItems
          return (
            <>
              <Moviescard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                title={movieObj.title}
                handleAddToWatchList={handleAddToWatchList}
                removeWatchList={removeWatchList}
                WatchList={WatchList}
              />
            </>
          );
        })}
      </div>
      <Scroll PageNo={PageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}
