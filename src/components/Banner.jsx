import { Link } from "react-router-dom";

const Banner = () => {
  return (
  <div className="min-h-screen">
  <div className=" relative bg-bg-banner bg-cover bg-center bg-no-repeat h-[500px] md:h-screen object-cover flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60 "></div>
      {/* Content on top of overlay */}
      <div className="relative z-10 flex  items-center justify-center h-full ">
        <h1 className="text-center text-2xl md:text-5xl text-white  font-bold">
        Freedom to Drive, Without the Hassle.
        <div>
       <Link to = '/available'> <button className="btn bg-transparent hover:text-black px-6 py-2 text-white  outline-none rounded-xxl">View Available Car</button></Link>
        </div>
        </h1>
        
      </div>
    </div>
  </div>
  );
};

export default Banner;
