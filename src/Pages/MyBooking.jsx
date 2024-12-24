import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const MyBooking = () => {
    const {user} = useContext(AuthContext)
    const [cars, setCars] = useState([])
    useEffect(() => {
        fetchData()
    }, [user])
    const fetchData = async() => {
        const {data} = await axios.get(`http://localhost:5000/booking/${user.email}`)
        setCars(data)
    }
    return (
        <div className="overflow-x-auto py-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rent Price</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 3 */}
            {cars && (
              cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={car.image} alt="car photo" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car.user?.name}</div>
                        <div className="text-sm opacity-50">
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='font-bold text-primary'>{car.model}</td>
                  <td>${car?.dailyPrice}/day</td>

                  <td>
                    <p
                      className={
                        car?.availability === "Available"
                          ? "text-green-600 bg-green-100/60 px-4 py-2 text-left rounded-xl"
                          : "text-purple-600 bg-purple-100/60  px-4 py-2 text-left rounded-xl"
                      }
                    >
                      {car?.bookingDate}
                    </p>
                  </td>
                  
                  <td><p className='text-purple-600 px-4 py-2  bg-purple-100/60 '>{car?.status}</p></td>
                  <th>
                   
                    <button
                      className="btn btn-ghost btn-xs  bg-indigo-600 text-white hover:text-primary "
                    >
                      Book Now
                    </button>

                   
                  </th>
                </tr>
              ))
            ) 
            }
          </tbody>
        </table>
      </div>
    );
};

export default MyBooking;