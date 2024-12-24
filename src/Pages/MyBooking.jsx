import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaClock, FaTrash } from 'react-icons/fa';

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
    const handleUpdateCancel = (id) => {

    }
    const handleModernBtn = (id) =>{
      toast(
        (t) => (
          <div>
            <div>
              Are Sure You Want Cancel Booking?
            </div>
            <div>
              <button className='btn bg-red-500 text-white'>Yes</button>
              <button className='btn bg-green-500 text-white'>No</button>

            </div>
          </div>
         
            
          
        ));
       
      
    }
    {/* <button onClick={() => toast.dismiss(t.id)}>Dismiss</button> */}
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
                <tr key={car._id} className='hover'>
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
                  
                  <td><p className={`px-4 py-2 ${car?.status === 'Pending'? 'text-yellow-500 bg-yellow-100/60' : ''} ${car?.status === 'Confirmed'? 'text-green-500 bg-green-100/60' : ''} ${car?.status === 'Cancel'? 'text-red-500 bg-red-100/60' : ''}`}>{car?.status}</p></td>
                  <th>
                   
                    <p title='Cancel the Booking'
                      className="btn btn-ghost btn-xs flex text-xs items-center  text-red-500 bg-white "
                    >
                      <FaTrash></FaTrash> Cancel Book
                    </p>
                    <p title='Update Booking Date'
                      className="btn  btn-xs text-xs flex items-center  text-indigo-600 bg-white "
                    >
                      <FaClock></FaClock> Modify Date
                    </p>

                   
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