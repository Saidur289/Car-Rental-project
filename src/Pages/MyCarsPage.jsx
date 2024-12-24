import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCarsPage = () => {
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
    console.log(price);
  };
  const handleSortHigherPrice = (price) => {
    setPrice(price);
    console.log(price);
  };
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
  useEffect(() => {
    fetchData();
  }, [user, date, price]);
  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/my-cars/${user?.email}?sort=${date}&price=${price}`
    );
    setCars(data);
  };
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
          await axios.delete(`http://localhost:5000/delete/${id}`);
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

  return (
    <div
      className={`container mx-auto ${
        openModal ? "backdrop-blur-lg bg-gray-400 " : ""
      }`}
    >
      <div className="text-center py-4">
        <details className="dropdown">
          <summary className="btn m-1  bg-indigo-600 text-white hover:text-primary">
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
              className=" text-primary"
            >
              <a>Recent Date</a>
            </li>
          </ul>
        </details>
        <details className="dropdown">
          <summary className="btn m-1   text-primary">
            Sort By Price
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li
              onClick={() => handleSortHigherPrice("dsc")}
              className=" hover:text-primary"
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rent Price</th>
              <th>Availability</th>
              <th>Posted Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 3 */}
            {cars ? (
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
                      className={
                        car?.availability === "Available"
                          ? "text-green-600 bg-green-100/60 px-4 py-2 text-left rounded-xl"
                          : "text-purple-600 bg-purple-100/60 px-4 py-2 text-left rounded-xl"
                      }
                    >
                      {car?.availability}
                    </p>
                  </td>
                  <td>{car?.datePosted}</td>
                  <th>
                    <button
                      onClick={() => handleModalOpen(car._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaEdit></FaEdit>
                    </button>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td>You do not add any car in rent</td>
                <td><Link to = '/add-car'><button>Go To Add Car Page</button></Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <Modal></Modal> */}
      {openModal && (
        <Modal
          id={selectedId}
          fetchData={fetchData}
          closeModal={closeModal}
        ></Modal>
      )}
    </div>
  );
};

export default MyCarsPage;
// onClick={() => document.getElementById("my_modal_5").showModal()}
