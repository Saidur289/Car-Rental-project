import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";


const Register = () => {
    const [show, setShow] = useState(false)
    const { handleSignUp, updateUser, handleLoginGoogle}  = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value 
        const email = e.target.email.value 
        const password = e.target.password.value 
        const photo = e.target.photo.value 
        if(!/[a-z]/.test(password)){
            toast.error('password must contain at least one lowercase')
            return;
        }
        if(!/[A-Z]/.test(password)){
            toast.error('password must contain at least one Uppercase')
            return;
        }
        if(password.length < 6){
            toast.error('password must be 6 character')
            return;
        }
        handleSignUp(email, password)
        .then((result) => {
          toast('sign in successfully')
          e.target.reset()
          const updatedData = {
            displayName: name,
            photoURL: photo
          }
          updateUser(updatedData)
          .then(() => {
            navigate(location?.state? location.state : '/')
          })
          .catch((error) => {
           toast.error(error.message)
          })

        })
        .catch((error) => {
          toast.error(error.message)
        })
       
    }
    const handleGoogle = () => {
      handleLoginGoogle()
      .then((result) => {
       toast('sing in successfully')
        navigate(location?.state? location.state : '/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
    }
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 flex justify-center items-center md:py-10">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl p-10">
          <h1 className="font-semibold text-center">Register Now!</h1>
          <form  onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo-URL"
                name="photo"
                className="input input-bordered"
                required
              />
            </div>
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
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={show? 'text': 'password'}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <p onClick={() => setShow(!show)} className="absolute top-12 right-6">{show? <FaEye></FaEye>  : <FaEyeSlash></FaEyeSlash>}</p>
          
            </div>
            <div className="form-control mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-3 rounded-lg transition duration-300">Register</button>
            </div>
          </form>
        
          <p className="p-3 text-center">Already Have an account? <Link className="text-red-500" to = '/login'>Login</Link></p>
          <button onClick={handleGoogle} className="flex items-center justify-center gap-3 mt-3 bg-blue-900 hover:bg-blue-700 text-white text-sm py-3 rounded-lg transition duration-300"><FaGoogle></FaGoogle> Sign Up With Google</button>
        </div>
      </div>
    );
};

export default Register;