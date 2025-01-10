import React, { useEffect, useState } from "react";
import CarsCard from "../components/CarsCard";
import axios from "axios";
import GridVew from "../components/GridVew";
import ListView from "../components/ListView";

const AvailableCar = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState(false)
  const [filter, setFilter] = useState('')
  const [price, setPrice] = useState('')
//   fetchData from database
  useEffect(() => {
    fetchData();
  }, [filter, price]);
  const fetchData = async () => {
    const { data } = await axios.get(`https://car-rental-server-alpha.vercel.app/cars?search=${filter}&price=${price}`);
    setCars(data);
  };
// function for grid view 
const handleGrid = e => {
    e.preventDefault()
    setView(true)
}
const handleList = e => {
    e.preventDefault()
    setView(false)
}

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-100 container mx-auto">
      <div className="space-y-3 text-center md:py-6 md:flex md:justify-evenly  md:items-center  md:border-2">
       <div className="md:pt-3">
       <label className="input input-bordered flex items-center gap-2 ">
          <input type="text" className="grow" placeholder="Search By Location" onChange={(e) =>setFilter(e.target.value)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
       </div>
      <div>
      <div role="tablist" className="tabs tabs-boxed pt-3">
          <a role="tab"className={`tab ${view === true? 'tab-active': ''}`} onClick={handleGrid}>
            Grid
          </a>
          <a role="tab" className={`tab ${view === false? 'tab-active': ''}`} onClick={handleList}>
            List
          </a>
        </div>
      </div>
        <div className="flex items-center justify-center gap-10">
        <button onClick={() => setPrice('dsc')} className="btn btn-wide  text-primary ">Sort By Higher Price</button>
        <button onClick={() => setPrice('asc')} className="btn btn-wide   text-primary ">Sort By Lower Price</button>
        </div>
      </div>
      <div className="py-4 md:pb-8 md:pt-5">
      {
        !view? <ListView cars = {cars}></ListView> : <GridVew cars={cars}></GridVew>
      }
      </div>
       
       
    </div>
  );
};

export default AvailableCar;
