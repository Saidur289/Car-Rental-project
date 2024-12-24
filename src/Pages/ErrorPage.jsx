import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
           <div>
            <h1>404 Page Not Found</h1>
            <Link to = '/'><button className="btn bg-indigo-600 text-white">Go To Home</button></Link>
            </div> 
            <div>

            </div>
        </div>
    );
};

export default ErrorPage;