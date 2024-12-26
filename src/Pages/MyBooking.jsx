import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaClock, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DateModal from "../CustomModal/DateModal";
import OurRevenue from "./OurRevenue";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
        `https://car-rental-server-alpha.vercel.app/booking-update-status/${id}`,
        { status }
      );
      // update ui
      fetchData();
      toast.success(`status updated successfully ${status}`);
    } catch (err) {
      toast.error(err.massage);
    }
  };
  const result = cars.filter(car => car?.status === 'Confirmed').reduce((pre, car) => pre + parseFloat(car.dailyPrice || 0) * 1.1, 0).toFixed(2);
  const handleModernBtn = (id, prev, status) => {
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
  const [selectedId, setSelectedId] = useState(null);
  // modal for update booking date
  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setSelectedId(id)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
            <th className="text-left px-4 py-2">Daily Rent Price With 10% Tax</th>
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
                <td className="px-4 py-2">${(parseFloat(car?.dailyPrice || 0) * 1.1).toFixed(2)}
                  /day  </td>
                <td className="px-4 py-2">
                  <p
                    className={`rounded-xl px-4 py-2 text-sm ${
                      car?.availability === "Available"
                        ? "text-green-600 bg-green-100/60"
                        : "text-purple-600 bg-purple-100/60"
                    }`}
                  >                    {car?.bookingDate  && format(new Date(car?.bookingDate), 'dd-MM-yyyy HH:mm') } 
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
                    onClick={() => handleModalOpen(car?._id)}
                    className="btn btn-xs   text-xs text-indigo-600 bg-white ml-2"
                  >
                    <FaClock className="hidden md:block" />
                    Modify 
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td className="text-sm text-primary font-bold text-left">Total Price After Confirmed:{result}</td>
          </tr>
        </tfoot>
      </table>
      {
        openModal && (
          <DateModal id = {selectedId} closeModal = {closeModal} fetchData = {fetchData}></DateModal>
        )
      }
      <OurRevenue cars = {cars}></OurRevenue>
    </div>
  );
};

export default MyBooking;
