import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
function App() {
  let [watchlist, setWatchList] = useState([]);
  let [data , setdata] = useState([])
  const updataData = (newData)=>{
    setdata(newData)
    console.log(data)
  }
  let [newNames , setNewNames] = useState([])
  const updataNames = (Names)=>{
    setNewNames(Names)
    console.log(newNames)
  }

  let handleAddToWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp',JSON.stringify(newWatchList))
    setWatchList(newWatchList);
    console.log(newWatchList)
  };

  let removeWatchList = (movieObj)=>{
    let filterWatchList = watchlist.filter((Movies)=>{
      return Movies.id != movieObj.id
    })
    
    setWatchList(filterWatchList)
    localStorage.setItem('moviesApp',JSON.stringify(filterWatchList))
    console.log(filterWatchList)
  }

  useEffect(()=>{
    let moviesFromLS = localStorage.getItem('moviesApp')
    if (!moviesFromLS) {
      return
    }
    setWatchList(JSON.parse(moviesFromLS))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner data={data} newNames={newNames}/>
                <Movies 
              WatchList={watchlist} updataNames={updataNames} updataData ={updataData}handleAddToWatchList={handleAddToWatchList} removeWatchList={removeWatchList}/>
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchlist={setWatchList} removeWatchList={removeWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
