import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { compareAsc } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Modals = ({ car, closeModal, user }) => {
  const navigate = useNavigate()
   
   
    
  const {
    model,
    dailyPrice,
    datePosted,
    availability,
    owner,
    status,
    image,
     _id
  } = car || {};
  const [startDate, setStartDate] = useState(new Date(datePosted));
  // function for submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const model = form.model.value;
    const dailyPrice = form.dailyPrice.value;
    const bookingDate = startDate
    const availability = form.availability.value;


    const formData = {
      model,
      dailyPrice,
      bookingDate,
      image,
      status,
      job_id: _id,
      user_email: user?.email,
      name: user?.name,
      photo: user?.photoURL
    };

   
    // console.table({id});
     if(availability !== 'Available'){
        return Swal.fire('This car is not available now')
     }
    //  date validation for user cannot book past date 
     if(compareAsc(new Date(), new Date(bookingDate)) === 1) {
        return Swal.fire('You Cannot booking before posted date')
     }
     if(owner?.email === user?.email){
      return toast.error('Access Denied')
     }
     if(!user) return navigate('/login')
    try {
      const { data } = await axios.post(
        `https://car-rental-server-alpha.vercel.app/add-booking`,
        formData
      );
      closeModal()
      form.reset()
      navigate('/my-booking')
      if(data.insertedId) return  Swal.fire(" Booking Successfully");
     
      

      
    } catch (error) {
      Swal.fire("You Already Booking Car", error.massage);
    }
  };
  return (
    <div className="modal-action absolute overflow-y-auto w-11/12 md:w-8/12 lg:w-6/12 lg:h-[90vh] z-50 top-52  md:top-6  left-1/2 transform -translate-x-1/2 bg-gray-600 bg-opacity-50 flex justify-center items-start  shadow-2xl border-4">
      <form onSubmit={handleSubmit} className="w-full bg-white p-4 rounded shadow-2xl shadow-indigo-300 border z-50 ">
        <h1 className="text-xl text-center text-primary"> Booking Car Now </h1>
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Car Model</span>
          </label>
          <input
            type="text"
            placeholder="Car Model"
            name="model"
            defaultValue={model}
            className="input input-bordered"
            required
          />
        </div>
        {/* location */}
        
          {/* Availability */}
          <div className="form-control">
            <label className="label">
              <span className="label-text"> Availability</span>
            </label>
            {availability && (
              <select
                defaultValue={availability}
                name="availability"
                className="select select-ghost w-full max-w-xs"
              >
                <option disabled>Pick Up Availability</option>
                <option>Available</option>
                <option>Not Available</option>
              </select>
            )}
          </div>
        
        {/* Posted Price */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Daily Price</span>
          </label>
          <input
            type="number"
            placeholder="Daily Price"
            name="dailyPrice"
            className="input input-bordered"
            defaultValue={dailyPrice}
            required
          />
        </div>

        {/* Owner Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Owner Name</span>
          </label>
          <input
            type="text"
            placeholder="Owner Name"
            defaultValue={user?.displayName}
            name="Owner_name"
            disabled
            className="input input-bordered"
            required
          />
        </div>
        {/* owner Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Owner Email</span>
          </label>
          <input
            type="text"
            placeholder="HR Email"
            name="Owner_email"
            defaultValue={user?.email}
            disabled
            className="input input-bordered"
            required
          />
        </div>
        {/* deadline*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Posted Date</span>
          </label>
          <DatePicker minDate={new Date()} defaultValue ={datePosted}  dateFormat="dd-MM-yyyy HH:mm" className="input input-bordered w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
       
      
     
        <div className="flex flex-col  items-center justify-center mt-2">
          <button type="submit" className="btn bg-indigo-700 text-white w-full">
            Booking
          </button>
          <button
            type="button"
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
            onClick={closeModal}
          >
            Close Modal
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modals;
