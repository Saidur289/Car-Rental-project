import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const Login = () => {
   const {handleSingIn, handleLoginGoogle} = useContext(AuthContext)
   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state || '/'
   console.log(from);
   // function for login 
   const handleLogin = e => {
    e.preventDefault()
    const form = e.target 
    const email = form.email.value 
    const password = form.password.value
    
    handleSingIn(email, password)
    .then((result) => {
      e.target.reset()
      toast('user sign in successfully')
      navigate(from)
    })
    .catch((error) => {
      toast.error(error.message)
    })
  
   }
  //  function for google login
   const handleGoogle = () => {
    handleLoginGoogle()
    .then((result) => {
      console.log('login successfully');
      toast('user successfully sign in')
      navigate(from)
    })
    .catch((error) => {
      toast.error(error.message)
    })
  }
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 flex justify-center items-center md:py-10">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none shadow-lg p-10">
           <h1 className="font-semibold text-center text-primary">Login Your Account</h1>
         <form onSubmit={handleLogin}  className="card-body">
           <div className="form-control">
             <label className="label">
               <span className="label-text">Email</span>
             </label>
             <input
               type="email"
               name="email"
               placeholder="email"
               className="input input-bordered"
               required
             />
           </div>
           <div className="form-control">
             <label className="label">
               <span className="label-text">Password</span>
             </label>
             <input
               type="password"
               name="password"
               placeholder="password"
               className="input input-bordered"
               required
             />
             
           </div>
           <div className="form-control mt-6">
             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-3 rounded-lg transition duration-300">Login</button>
           </div>
         </form>
        
         <p className="text-center font-semibold">Do Not Have An Account? <Link className="text-red-500 " to = '/register'>Register</Link></p>
         <button onClick={handleGoogle} className="flex items-center justify-center gap-3 mt-3 bg-blue-900 hover:bg-blue-700 text-white text-sm py-3 rounded-lg transition duration-300"><FaGoogle></FaGoogle> Sign In With Google</button>
       </div>
       
       
      </div>
    );
};

export default Login;