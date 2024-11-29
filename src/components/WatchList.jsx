import React, { useEffect, useState } from "react";
import gernsids from "./gemre";

export default function WatchList({ watchlist, setWatchList ,removeWatchList}) {
  const [search, setsearch] = useState("")
  let handleSearch = (e)=>{
    setsearch(e.target.value)
  }

  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] = useState("All Genre");
  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };
  let sortInc = () => {
    let sortedInc = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList([...sortedInc]);
  };
  let sortDec = () => {
    let sortedDec = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDec]);
  };
  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return gernsids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genre", ...temp]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre == genre
                  ? " hover:cursor-pointer flex justify-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold items-center mx-4"
                  : "hover:cursor-pointer flex justify-center h-[3rem] w-[9rem] bg-gray-400 rounded-xl text-white font-bold items-center mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-3">
        <input
           onChange={handleSearch}
           value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[20rem] bg-gray-200 px-4 rounded-xl"
        />
      </div>
      <div className="overflow-hiddens border-gray-400">
        <table className="table-auto w-full text-gray-500 text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div className="p-2" onClick={()=>sortInc}>
                  <i class="fa-solid fa-arrow-up-long"></i>
                </div>
                <div className="p-2">Rating</div>
                <div className="p-2" onClick={()=>sortDec}>
                  <i class="fa-solid fa-arrow-down-long"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre == "All Genre") {
                  return true;
                } else {
                  return gernsids[movieObj.genre_ids[0]] == currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6">
                      <img
                        className="h-[8rem] w-[10rem] my-3 bg-cover bg-center rounded-xl"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path})`}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{gernsids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>removeWatchList(movieObj)} className="hover:cursor-pointer text-red-900">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
