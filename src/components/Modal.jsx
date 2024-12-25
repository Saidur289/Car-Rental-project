import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Modal = ({ id, closeModal, fetchData }) => {
  const [car, setCar] = useState({});
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
  } = car || {};
  const [startDate, setStartDate] = useState(new Date());
 
  useEffect(() => {
    fetch(`https://car-rental-server-alpha.vercel.app/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCar(data);
      });
  }, [id]);

  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const model = form.model.value;
    const registerNumber = form.registerNumber.value;
    const location = form.location.value;
    const dailyPrice = form.dailyPrice.value;
    const datePosted = startDate;
    const description = form.description.value;
    const availability = form.availability.value;
    const features = form.features.value.split("\n");
    const image = form.image.value;

    const formData = {
      model,
      registerNumber,
      location,
      dailyPrice,
      datePosted,
      description,
      availability,
      image,
      features,
    };

   
    // console.table({id});

    try {
      const { data } = await axios.put(
        `https://car-rental-server-alpha.vercel.app/cars/${id}`,
        formData
      );
     
      if (data.modifiedCount > 0)
        return Swal.fire("Rent Car updated Successfully");
      form.reset()
      //   update
      fetchData();
    } catch (error) {
      toast.error("Error uploading data:", error);
    }
  };
  return (
    <div className="absolute overflow-y-auto w-11/12 md:w-8/12 lg:w-6/12 lg:h-[90vh] z-50 top-4  left-1/2 transform -translate-x-1/2 bg-gray-600 bg-opacity-50 flex justify-center items-start  shadow-lg border-4">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-4 rounded shadow-2xl border z-50 "
      >
        <h1 className="text-xl text-center text-primary">
          {" "}
          Update Your Rental Car{" "}
        </h1>
        {/* title */}

        <div className="md:flex gap-1">
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
          {/* Vehicle Registration Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Vehicle Registration Number</span>
            </label>
            <input
              type="text"
              placeholder="Vehicle Registration Number"
              name="registerNumber"
              defaultValue={registerNumber}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* location */}
        <div className="md:flex gap-1">
          <div className="form-control">
            <label className="label">
              <span className="label-text"> Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              defaultValue={location}
              className="input input-bordered"
              required
            />
          </div>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Car Image Url </span>
          </label>
          <input
            type="url"
            name="image"
            placeholder="photoUrl"
            defaultValue={image}
            className="input input-bordered"
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
            <span className="label-text">Booking Date</span>
          </label>
          <DatePicker
            defaultValue={datePosted}
            dateFormat="dd-MM-yyyy HH:mm"
            className="input input-bordered w-full"
            disabled
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        {/* features */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Features</span>
          </label>
          <textarea
            name="features"
            className="textarea textarea-bordered"
            defaultValue={features}
            required
            placeholder="Features In Different Line"
          ></textarea>
        </div>
        {/* description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            defaultValue={description}
            name="description"
            className="textarea textarea-bordered"
            placeholder="Job Description"
          ></textarea>
        </div>
        <div className="flex flex-col  items-center justify-center mt-2">
          <button type="submit" className="btn bg-indigo-700 text-white w-full">
            Update
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

export default Modal;
