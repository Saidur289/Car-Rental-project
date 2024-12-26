import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyCarsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  // function for sort by latest date
  const handleLatestDate = (date) => {
    setDate(date);
  };
  //   function for sort by recent date
  const handleRecentDate = (date) => {
    setDate(date);
  };
  //   function for sort by lower price
  const handleSortLowerPrice = (price) => {
    setPrice(price);
    // console.log(price);
  };
  //   function for sort by higher price
  const handleSortHigherPrice = (price) => {
    setPrice(price);
    // console.log(price);
  };
  // function for modal
  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedId(null);
    setModalOpen(false);
  };
  const [cars, setCars] = useState([]);
  // fetchData for show in ui
  useEffect(() => {
    fetchData();
  }, [user, date, price]);
  const fetchData = async () => {
    const { data } = await axiosSecure.get(
      `/my-cars/${user?.email}?sort=${date}&price=${price}`
    );
    setCars(data);
  };
  // function for delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://car-rental-server-alpha.vercel.app/delete/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchData();
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };
  const handleChangeStatus = async (id, prev, status) => {
    try {
      const { data } = await axios.patch(
        `https://car-rental-server-alpha.vercel.app/booking-update-status/${id}`,
        { status }
      );
      // console.log(data);
      // update ui
      fetchData();
      Swal.fire(`status updated successfully ${status}`);
    } catch (err) {
      toast.error(err.massage);
    }
  };
  return (
    // <div
    //   className={`container mx-auto ${
    //     openModal ? "backdrop-blur-lg bg-gray-400 " : ""
    //   }`}
    // >
    //   <div className="text-center py-4">
    //     <details className="dropdown">
    //       <summary className="btn m-1  bg-indigo-600 text-white hover:text-primary">
    //         Sort By Date
    //       </summary>
    //       <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    //         <li
    //           onClick={() => handleLatestDate("asc")}
    //           className="hover:text-primary"
    //         >
    //           <a>Latest Date</a>
    //         </li>
    //         <li
    //           onClick={() => handleRecentDate("dsc")}
    //           className=" text-primary"
    //         >
    //           <a>Recent Date</a>
    //         </li>
    //       </ul>
    //     </details>
    //     <details className="dropdown">
    //       <summary className="btn m-1   text-primary">
    //         Sort By Price
    //       </summary>
    //       <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    //         <li
    //           onClick={() => handleSortHigherPrice("dsc")}
    //           className=" hover:text-primary"
    //         >
    //           <a>Higher Price</a>
    //         </li>
    //         <li
    //           onClick={() => handleSortLowerPrice("asc")}
    //         className="text-primary"

    //         >
    //           <a>Lower Price</a>
    //         </li>
    //       </ul>
    //     </details>
    //   </div>
    //   <div className="overflow-x-auto py-8">
    //     <table className="table">
    //       {/* head */}
    //       <thead>
    //         <tr>
    //           <th>Car Image</th>
    //           <th>Car Model</th>
    //           <th>Daily Rent Price</th>
    //           <th>Availability</th>
    //           <th>Posted Date</th>
    //           <th>Action</th>
    //           <th>Update Status</th>
    //           <th>Booking Count</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {/* row 3 */}
    //         {cars ? (
    //           cars.map((car) => (
    //             <tr key={car._id}>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle h-12 w-12">
    //                       <img src={car.image} alt="car photo" />
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <div className="font-bold">{car.owner?.name}</div>
    //                     <div className="text-sm opacity-50">
    //                       {car?.location}
    //                     </div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>{car.model}</td>
    //               <td>${car?.dailyPrice}/day</td>

    //               <td>
    //                 <p
    //                   className={
    //                     car?.availability === "Available"
    //                       ? "text-green-600 bg-green-100/60 px-4 py-2 text-left rounded-xl"
    //                       : "text-purple-600 bg-purple-100/60 px-4 py-2 text-left rounded-xl"
    //                   }
    //                 >
    //                   {car?.availability}
    //                 </p>
    //               </td>
    //               <td>{car?.datePosted}</td>
    //               <th>
    //                 <button
    //                   onClick={() => handleModalOpen(car._id)}
    //                   className="btn btn-ghost btn-xs"
    //                 >
    //                   <FaEdit></FaEdit>
    //                 </button>

    //                 <button
    //                   onClick={() => handleDelete(car._id)}
    //                   className="btn btn-ghost btn-xs"
    //                 >
    //                   <FaTrash></FaTrash>
    //                 </button>
    //               </th>
    //               <td>
    //                <div className="flex gap-1">
    //                <p className={`${car?.status === 'Pending'? 'text-yellow-500 bg-yellow-100/60' : ''} ${car?.status === 'Confirmed'? 'text-green-500 bg-green-100/60' : ''} ${car?.status === 'Canceled'? 'text-red-500 bg-red-100/60' : ''}`}>{car?.status}</p>
    //                <button disabled = {car?.status === 'Canceled' || car?.status === 'Confirmed' ||  car?.bookingCount === 0} title="Confirmed" onClick={() => handleChangeStatus(car?._id, car?.status, 'Confirmed')}  className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='none'
    //             viewBox='0 0 24 24'
    //             strokeWidth='1.5'
    //             stroke='currentColor'
    //             className='w-5 h-5'
    //           >
    //             <path
    //               strokeLinecap='round'
    //               strokeLinejoin='round'
    //               d='m4.5 12.75 6 6 9-13.5'
    //             />
    //           </svg>
    //         </button>
    //         <button disabled = {car?.status === 'Confirmed' || car?.bookingCount === 0  || car?.status === 'Canceled'} title="Cancel"  onClick={() => handleChangeStatus(car?._id, car?.status, 'Canceled')}   className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='none'
    //             viewBox='0 0 24 24'
    //             strokeWidth='1.5'
    //             stroke='currentColor'
    //             className='w-5 h-5'
    //           >
    //             <path
    //               strokeLinecap='round'
    //               strokeLinejoin='round'
    //               d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
    //             />
    //           </svg>
    //         </button>
    //                </div>
    //               </td>
    //               <td className="text-center">{car?.bookingCount}</td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td>You do not add any car in rent</td>
    //             <td><Link to = '/add-car'><button>Go To Add Car Page</button></Link></td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    //   {/* <Modal></Modal> */}
    //   {openModal && (
    //     <Modal
    //       id={selectedId}
    //       fetchData={fetchData}
    //       closeModal={closeModal}
    //     ></Modal>
    //   )}
    // </div>
    <div
      className={`container mx-auto ${
        openModal ? "backdrop-blur-lg bg-gray-400" : ""
      }`}
    >
      <div className="text-center py-4 flex flex-col sm:flex-row sm:justify-center gap-4">
        <details className="dropdown">
          <summary className="btn m-1 bg-indigo-600 text-white hover:text-primary">
            Sort By Date
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li
              onClick={() => handleLatestDate("asc")}
              className="hover:text-primary"
            >
              <a>Latest Date</a>
            </li>
            <li
              onClick={() => handleRecentDate("dsc")}
              className="text-primary"
            >
              <a>Recent Date</a>
            </li>
          </ul>
        </details>
        <details className="dropdown">
          <summary className="btn m-1 text-primary">Sort By Price</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li
              onClick={() => handleSortHigherPrice("dsc")}
              className="hover:text-primary"
            >
              <a>Higher Price</a>
            </li>
            <li
              onClick={() => handleSortLowerPrice("asc")}
              className="text-primary"
            >
              <a>Lower Price</a>
            </li>
          </ul>
        </details>
      </div>
      <div className="overflow-x-auto py-8">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="text-sm md:text-base">
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rent Price</th>
              <th>Availability</th>
              <th>Posted Date</th>
              <th>Action</th>
              <th>Update Status</th>
              <th>Booking Count</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cars) &&  cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="text-sm md:text-base">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={car.image} alt="Car" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car.owner?.name}</div>
                        <div className="text-sm opacity-50">
                          {car?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{car.model}</td>
                  <td>${car?.dailyPrice}/day</td>
                  <td>
                    <p
                      className={`rounded-xl px-4 py-2 ${
                        car?.availability === "Available"
                          ? "text-green-600 bg-green-100/60"
                          : "text-purple-600 bg-purple-100/60"
                      }`}
                    >
                      {car?.availability}
                    </p>
                  </td>
                  <td>
                    {car?.datePosted && format(new Date(car?.datePosted), "P")}
                  </td>
                  <th>
                    <button
                      onClick={() => handleModalOpen(car._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash />
                    </button>
                  </th>
                  <td>
                    <div className="flex gap-2">
                      <p
                        className={`px-4 py-2 rounded-xl ${
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
                      <button
                        disabled={
                          car?.status === "Canceled" ||
                          car?.status === "Confirmed" ||
                          car?.bookingCount === 0
                        }
                        title="Confirmed"
                        onClick={() =>
                          handleChangeStatus(car?._id, car?.status, "Confirmed")
                        }
                        className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-green-500 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                      <button
                        disabled={
                          car?.status === "Confirmed" ||
                          car?.bookingCount === 0 ||
                          car?.status === "Canceled"
                        }
                        title="Cancel"
                        onClick={() =>
                          handleChangeStatus(car?._id, car?.status, "Canceled")
                        }
                        className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="text-center">{car?.bookingCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-primary font-bold">
                You Add  No Cars .{" "}
                <br />
                  <Link to="/add-car mt-1">
                    <button className="btn btn-primary">Add Car Now</button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={selectedId} fetchData={fetchData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MyCarsPage;
// onClick={() => document.getElementById("my_modal_5").showModal()}
