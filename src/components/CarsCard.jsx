import { differenceInDays, format } from "date-fns";
import { Fade } from "react-awesome-reveal";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const CarsCard = ({ car }) => {
  const { image, description, dailyPrice, model, location, datePosted, availability , bookingCount} =
    car || {};
  const date = format(new Date(), "yyyy/MM/dd");
  let result = differenceInDays(new Date(date), new Date(datePosted));
  return (
    <Fade cascade>
      <div className="card card-compact bg-base-100 md:min-w-96  shadow-xl hover:scale-105 hover:shadow-md hover:shadow-indigo-400 overflow-hidden">
      <figure className="h-[250px] relative">
        <img
          src={image}
          alt="cars pic"
          className="w-full object-cover h-full"
        />
         <div className="flex gap-1 items-center absolute right-0 top-0 ml-4 mt-4">
         {availability === 'Available' && <div className="badge  badge-outline bg-blue-800 text-white p-1">Available</div>

}
        </div>
      </figure>
      <div className="pl-2  space-y-2 ">
        <h2 className="card-title text-primary text-xl">{model}</h2>
        <p className="text-secondary text-sm">{description.substring(0, 60)}...</p>
        <p className="font-semibold flex items-center gap-1 text-sm">
          <FaSackDollar />
         Daily Price: {dailyPrice}$ per day
        </p>
        {/* <div className="flex gap-1 items-center">
         {availability === 'Available'? <div className="badge badge-secondary badge-outline">Available</div>: <p>Not Available</p>

}
        </div> */}
        <p className="font-semibold flex items-center gap-1 text-sm">
          {" "}
          <MdUpdate />
          {result === 0 ? "Posted Date:  Added a few times ago." : `Posted Date: Added ${result} days ago.`}

         
        </p>
        <p className="font-semibold flex items-center gap-1 text-sm">
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
