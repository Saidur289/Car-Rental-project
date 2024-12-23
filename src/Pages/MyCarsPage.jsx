import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";
import Modal from "../components/Modal";


const MyCarsPage = () => {
  const { user } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null)
  const [openModal, setModalOpen] = useState(false)
  const handleModalOpen = (id) => {
    setSelectedId(id)
    setModalOpen(true)
  }
  const closeModal = () => {
    setSelectedId(null)
    setModalOpen(false)
  }
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/my-cars/${user?.email}`
    );
    setCars(data);
  };
  console.log(cars);
  return (
   <div className={`container mx-auto ${openModal ? 'backdrop-blur-lg bg-gray-400 ': ''}`}>
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
         {
            cars ? cars.map((car) =>  <tr key={car._id}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={car.image}
                      alt="car photo"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{car.owner?.name}</div>
                  <div className="text-sm opacity-50">{car?.location}</div>
                </div>
              </div>
            </td>
            <td>
            {car.model}
             
            </td>
            <td>${car?.dailyPrice}/day</td>

            <td>
                <p className={car?.availability  === 'Available'? 'text-green-600 bg-green-100/60 px-4 py-2 text-left rounded-xl': 'text-purple-600 bg-purple-100/60 px-4 py-2 text-left rounded-xl'}>{car?.availability}</p>
            </td>
            <td>{car?.datePosted}</td>
            <th>
             
             <button onClick={() => handleModalOpen(car._id) }  className="btn btn-ghost btn-xs">
                <FaEdit></FaEdit>
              </button>
             
              <button className="btn btn-ghost btn-xs">
                <FaTrash></FaTrash>
              </button>
            </th>
          </tr>)  : <tr><td>You do not add any car in rent</td></tr>
         }
        </tbody>
      </table>
    </div>
    {/* <Modal></Modal> */}
    {
     openModal && <Modal id ={selectedId} fetchData = {fetchData} closeModal = {closeModal}></Modal>
    }
   </div>
  );
};

export default MyCarsPage;
// onClick={() => document.getElementById("my_modal_5").showModal()}