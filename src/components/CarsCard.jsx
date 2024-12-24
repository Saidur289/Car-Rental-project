import { differenceInDays, format } from "date-fns";
import { Fade } from "react-awesome-reveal";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const CarsCard = ({ car }) => {
  const { image, description, dailyPrice, model, location, datePosted, availability , bookingCount} =
    car || {};
  // console.log(new Date())
  // const date = format(new Date(), 'MM/dd/yyyy')
  const date = format(new Date(), "yyyy/MM/dd");
  console.log(date);
  console.log(datePosted);
  let result = differenceInDays(new Date(date), new Date(datePosted));
  
  console.log(result);
  console.log(image)
  return (
    <Fade cascade>
      <div className="card card-compact bg-base-100  shadow-xl hover:scale-105 hover:shadow-md hover:shadow-indigo-400 overflow-hidden">
      <figure className="h-[300px]">
        <img
          src={image}
          alt="cars pic"
          className="w-full object-cover h-full"
        />
      </figure>
      <div className="card-body space-y-2 ">
        <h2 className="card-title text-primary text-2xl">{model}</h2>
        <p className="text-secondary text-xl">{description.substring(0, 80)}</p>
        <p className="font-semibold flex items-center gap-1 text-xl">
          <FaSackDollar />
          Daily Price:{dailyPrice}
        </p>
        <p className="font-semibold flex items-center gap-1 text-xl">
          <FaLocationDot /> Location: {location}
        </p>
        <div className="flex gap-1 items-center">
        Availability: {availability === 'Available'? <div className="badge badge-secondary badge-outline">Available</div>: <p>Not Available</p>

}
        </div>
        <p className="font-semibold flex items-center gap-1 text-xl">
          {" "}
          <MdUpdate />
          {result === 0 ? "Date Posted: Added a few times ago." : `Date Posted: Added ${result} days ago.`}

         
        </p>
        <p className="font-semibold flex items-center gap-1 text-xl">
          {" "}
          
          Total Booking: {bookingCount} .
        </p>
        <div className="divider"></div>
        <div className="card-actions ">
         <Link className="w-full" to = {`/details/${car._id}`}> <button className="btn bg-indigo-600 text-white hover:text-primary w-full">
            Book Now
          </button></Link>
        </div>
      </div>
    </div>
    </Fade>
  );
};

export default CarsCard;
