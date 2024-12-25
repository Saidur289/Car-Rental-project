import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaCalendarCheck, FaDollarSign, FaListAlt } from "react-icons/fa";
import Modals from "../CustomModal/Modals";
import { format } from "date-fns";


const CarDetailsPage = () => {
    const {user} = useContext(AuthContext)
    const [openModal, setModalOpen] = useState(false);
    const handleModalOpen = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
     const [car, setCar] = useState({});
     const {id} = useParams()
      useEffect(() => {
        fetch(`https://car-rental-server-alpha.vercel.app/cars/${id}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setCar(data);
          });
      }, [id]);
      const {
        model,
        registerNumber,
        location,
        dailyPrice,
        datePosted,
        description,
        availability,
        image,
        features,
        owner,
      } = car || {};
     
      
    return (
        <div className="flex flex-col md:flex-row items-start gap-6 p-4 bg-white shadow-lg rounded-lg">
      {/* Left: Image */}
      <div className="flex-1">
        <img
          src={image}
          alt="Car Model"
          className="w-full md:h-[400px] rounded-lg object-cover"
        />
      </div>

      {/* Right: Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{model}</h2>
        <h2 className="text-2xl font-bold mb-4">{location}</h2>

        <div className="flex items-center mb-2">
          <FaDollarSign className="text-blue-500 mr-2" />
          <p className="text-lg font-semibold">Price Per Day: ${dailyPrice}</p>
        </div>

        <div className="flex items-center mb-2">
          <FaCalendarCheck className="text-green-500 mr-2" />
          <p className="text-lg font-semibold">Availability: {availability}</p>
        </div>
        <div className="flex items-center mb-2">
          <FaCalendarCheck className="text-green-500 mr-2" />
          <p className="text-lg font-semibold">Posted Date: {datePosted && format(new Date(datePosted), 'P')}</p>
        </div>

        <div className="flex items-start mb-2">
          <FaListAlt className="text-gray-500 mt-1 mr-2" />
          <ul className="list-disc ml-4">
           {
            features && features.map((feature, index) => <li key={index}>
                {feature}
            </li>)
           }
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
         Description: {description}
          </p>
          <p className="text-gray-700">
         Vehicle Register Number: {registerNumber}
          </p>
        </div>

        {/* Book Now Button */}
        <button onClick={() => handleModalOpen()} className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
      {
        openModal && <Modals user = {user} car = {car} closeModal = {closeModal}></Modals>
      }
    </div>
    );
};

export default CarDetailsPage;