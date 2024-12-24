import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaClock, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    const { data } = await axiosSecure.get(`/booking/${user.email}`);
    setCars(data);
  };
  const handleUpdateCancel = async (id, prev, status) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/booking-update-status/${id}`,
        { status }
      );
      // update ui
      fetchData();
      toast.success(`status updated successfully ${status}`);
    } catch (err) {
      toast.error(err.massage);
    }
  };
  const handleModernBtn = (id, prev, status) => {
    console.log(id, prev, status);
    toast((t) => (
      <div className="flex flex-col space-y-1">
        <div>Are Sure You Want Cancel Booking?</div>
        <div className="flex gap-1">
          <button
            onClick={() => {
              toast.dismiss(t.id), handleUpdateCancel(id, prev, status);
            }}
            className="btn bg-red-500 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn bg-green-500 text-white"
          >
            No
          </button>
        </div>
      </div>
    ));
  };
  const handleDate = async(id, startDate) => {
    console.log(id, startDate);
    const { data } = await axios.patch(`http://localhost:5000/update-booking/${id}`, {startDate});
    // update ui
    console.log(data);
    fetchData()
    toast.success('Booking Date Updated Successfully')
  };
  // modal for update booking date
  const handleModernDate = (id) => {
    toast((t) => (
      
      <div className="flex flex-col space-y-1">
        <div>
          <h1 className="text-primary text-center font-thin">Update Booking Date</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Posted Date And Time</span>
            </label>
            <DatePicker
              dateFormat="dd-MM-yyyy HH:mm"
              className="input input-bordered w-full"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              placeholderText="Select Date and Time"
              selected={startDate}
              onChange={(date) =>{
                console.log(date);
               setStartDate(date)}
              }  
              
            />
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => {
              if(startDate){
                handleDate(id, startDate),
                toast.dismiss(t.id)
              }
              else{
                toast.error('please select a date')
              }
              
            }}
            className="btn bg-red-500 text-white"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn bg-green-500 text-white"
          >
            No
          </button>
        </div>
      </div>
    ));
  };
  {
    /* <button onClick={() => toast.dismiss(t.id)}>Dismiss</button> */
  }
  return (
    <div className="overflow-x-auto py-8">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Car Image</th>
            <th className="text-left px-4 py-2">Car Model</th>
            <th className="text-left px-4 py-2">Daily Rent Price</th>
            <th className="text-left px-4 py-2">Booking Date And Time</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((car) => (
              <tr key={car._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={car.image} alt="Car" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{car.user?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 font-bold text-primary">
                  {car.model}
                </td>
                <td className="px-4 py-2">${car?.dailyPrice}/day</td>
                <td className="px-4 py-2">
                  <p
                    className={`rounded-xl px-4 py-2 text-sm ${
                      car?.availability === "Available"
                        ? "text-green-600 bg-green-100/60"
                        : "text-purple-600 bg-purple-100/60"
                    }`}
                  >
                    {format(new Date(car?.bookingDate), "dd-MM-yyyy HH:mm")}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <p
                    className={`rounded-xl px-4 py-2 text-sm ${
                      car?.status === "Pending"
                        ? "text-yellow-500 bg-yellow-100/60"
                        : car?.status === "Confirmed"
                        ? "text-green-500 bg-green-100/60"
                        : car?.status === "Canceled"
                        ? "text-red-500 bg-red-100/60"
                        : ""
                    }`}
                  >
                    {car?.status}
                  </p>
                </td>
                <td className="px-4 py-2 flex flex-col items-center justify-center">
                  <button
                    title="Cancel the Booking"
                    disabled={
                      car?.status === "Pending" || car?.status === "Canceled"
                    }
                    onClick={() =>
                      handleModernBtn(car?.job_id, car?.status, "Canceled")
                    }
                    className="btn btn-ghost btn-xs   text-xs text-red-500 bg-white"
                  >
                    <FaTrash className="hidden md:block" /> Cancel
                  </button>
                  <button
                    title="Update Booking Date"
                    onClick={() => handleModernDate(car?._id)}
                    className="btn btn-xs   text-xs text-indigo-600 bg-white ml-2"
                  >
                    <FaClock className="hidden md:block" />
                    Modify 
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooking;
