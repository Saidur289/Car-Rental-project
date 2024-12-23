import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import axios from "axios";
import MyDropzone from "../components/MyDropzone";

const AddCarPage = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const model = form.model.value;
    const registerNumber = form.registerNumber.value;
    const location = form.location.value;
    const dailyPrice = form.dailyPrice.value;
    const datePosted = form.datePosted.value;
    const description = form.description.value;
    const availability = form.availability.value;
    const features = form.features.value.split("\n");

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
      owner:{
        email: user?.email,
        photo: user?.photoURL,
        name: user?.displayName,
      },
      bookingCount:0
    };
   
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/add-car",
        formData
      );
      console.log(data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  console.log(image);
  return (
    <div>
      <form onSubmit={handleSubmit} className="card-body">
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Car Model</span>
          </label>
          <input
            type="text"
            placeholder="Car Model"
            name="model"
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
            type="number"
            placeholder="text"
            name="registerNumber"
            className="input input-bordered"
            required
          />
        </div>
        {/* location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered"
            required
          />
        </div>
        {/* Availability */}
        <div className="form-control">
          <label className="label">
            <span className="label-text"> Availability</span>
          </label>
          <select
            defaultValue="Pick Up Availability"
            name="availability"
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick Up Availability</option>
            <option>Available</option>
            <option>Not Available</option>
          </select>
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
            required
          />
        </div>

        {/* Car URL */}
        <MyDropzone setImage={setImage}></MyDropzone>

        {/* <div
          {...getRootProps()}
          style={{
            border: "2px dashed #cccccc",
            padding: "20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} className="input input-bordered" />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}
        {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Let Upload Image </span>
            </label>
            <input
              type="file"
            
              accept="image/*"
              className="input pt-2"
              
            />
          </div> */}

        {/* Owner Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Owner Name</span>
          </label>
          <input
            type="text"
            placeholder="Owner Name"
            name="Owner_name"
            className="input input-bordered"
            required
          />
        </div>
        {/* Hr Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Owner Email</span>
          </label>
          <input
            type="text"
            placeholder="HR Email"
            name="Owner_email"
            defaultValue={user?.email}
            className="input input-bordered"
            required
          />
        </div>
        {/* deadline*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Posted Date</span>
          </label>
          <input
            type="date"
            placeholder="Posted Date"
            name="datePosted"
            className="input input-bordered"
            required
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
            name="description"
            className="textarea textarea-bordered"
            placeholder="Job Description"
          ></textarea>
        </div>
        {/* submit field  */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
      <img src={image} alt="" />
    </div>
  );
};

export default AddCarPage;
