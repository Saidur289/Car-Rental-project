import pic from '../assets/images/car-7.jpg'

const Discount = () => {
    return (
        <div className='md:flex   md:h-[500px]'>
            <div className='p-10 md:w-1/2  flex flex-col items-center justify-center space-y-1 md:space-y-5 bg-bg-hero bg-no-repeat bg-cover hover:scale-105 animate-animation_left ease-in-out overflow-hidden'>
                <h2 className='text-xl md:text-4xl text-white text-center font-bold'>Best Collection For Black Friday</h2>
                <h1 className='text-sm p-4 md:text-2xl text-white text-center font-semibold'>Luxury cars at $99/day this holiday season!”</h1>
                <button className='bg-indigo-500 text-white rounded-xl outline-none px-5 py-2 hover:bg-transparent '>Book Now</button>

            </div>
            <div className='h-1/2 md:h-[500px] md:w-1/2 relative rounded-xl animate-animation_right'>
                <img src={pic} className='h-full w-full object-cover' alt="" />
                <p className='text-xl font-bold absolute right-2 top-20  md:right-5 md:top-5 text-white'>Get 15% off for weekend rentals! </p>
            </div>
        </div>
    );
};

export default Discount;