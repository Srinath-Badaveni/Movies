import React from "react";
import Bookmark from "../images/bookmark.png";
import WatchList from "./WatchList";
export default function Moviescard({
  movieObj,
  poster_path,
  title,
  handleAddToWatchList,
  removeWatchList,
  WatchList,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < WatchList.length; i++) {
      if (WatchList[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div>
      <div
        className="h-[40vh] w-[150px] my-3 drop-shadow-md hover:drop-shadow-xl bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:curser-pointer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >
        {doesContain(movieObj) ? (
          <div
            onClick={() => {
              removeWatchList(movieObj);
            }}
            className="m-1.5 h-6 w-6 rounded-lg bg-gray-900/60 hover:cursor-pointer"
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={() => {
              handleAddToWatchList(movieObj);
            }}
            className="m-1.5 h-6 w-6 rounded-lg bg-gray-900/60 hover:cursor-pointer"
          >
            &#10084;
          </div>
        )}

        {/* <h6 className="text-white font-bold absolute top-0 right-0 pr-2 text-yellow-600 bg-gray-900 rounded-xl p-1">
          rating
        </h6> */}
        <h4 className="text-white font-bold absolute inset-x-0 bottom-0 text-center bg-gray-900/60 rounded-xl">
          {title}
        </h4>
      </div>
    </div>
  );
}
