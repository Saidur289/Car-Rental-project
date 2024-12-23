import { FaRegStar, FaStar } from "react-icons/fa6";


const Slider = ({profileImage, userName, rating, reviewText}) => {
    return (
        <div className="max-w-sm bg-white shadow-md rounded-lg p-6 overflow-hidden">
            <div className="flex items-center">
             <img src={profileImage} 
             className="w-16 h-16 rounded-full border-2 border-gray-200"
             alt="" />
             <div className="ml-4">
                <h2 className="text-lg font-bold">{userName}</h2>
                <div className="flex text-yellow-400">
                    {Array.from({length:5}, (_, index) => index < rating? (
                        <FaStar key={index}/>
                    ) : (<FaRegStar key={index}/>))}
                </div>

             </div>

            </div>
            <p className="mt-4 text-secondary">{reviewText}</p>
        </div>
    );
};

export default Slider;