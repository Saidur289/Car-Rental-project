import { Link } from "react-router-dom";
import pic from '../assets/images/download.jpg'

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center border-4 shadow-sm">
           <div className="flex gap-1">
           <div className="flex-1">
            <h1>404 Page Not Found</h1>
            <Link to = '/'><button className="btn bg-indigo-600 text-white">Go To Home</button></Link>
            </div> 
            <div className="flex-1">
            <img src={pic} alt="" />
            </div>
           </div>
        </div>
    );
};

export default ErrorPage;