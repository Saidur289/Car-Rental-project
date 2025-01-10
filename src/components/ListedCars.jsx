import axios from "axios";
import { useEffect, useState } from "react";
import CarsCard from "./CarsCard";


const ListedCars = () => {
    const [cars, setCars] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async() => {
        const {data} = await axios.get('https://car-rental-server-alpha.vercel.app/cars')
        setCars(data)
    }
    return (
        <div className="bg-gradient-to-r from-indigo-100 to-purple-200 pb-12">
            <div className="space-y-3 p-5">
                <h1 className="text-xl md:text-3xl text-center py-5">Choose from Our Premium Fleet of Rental Cars</h1>
                <p className="text-black text-center md:w-4/5 md:mx-auto pb-5">Explore our diverse selection of vehicles tailored to meet your every need. From fuel-efficient sedans like the Toyota Camry and Honda Civic to luxurious models like the Tesla Model S and Mercedes-Benz C-Class, we have the perfect ride for every journey.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-hidden">
             {
                cars.slice(0, 8).map((car) => <CarsCard key={car._id} car ={car}></CarsCard>)
             }
            </div>
        </div>
    );
};

export default ListedCars;