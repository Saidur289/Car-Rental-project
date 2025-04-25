import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    // declare state for hold data
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const handleSignUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email, password)
    }
    const handleSingIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        
          if(currentUser?.email){
           await axios.post('https://car-rental-server-alpha.vercel.app/jwt', {email: currentUser?.email} , {withCredentials: true}) 
           setUser(currentUser)
           setLoading(false)
          }
          else{
             await axios.post('https://car-rental-server-alpha.vercel.app/logout', {},  {withCredentials: true})
            setLoading(false)
            setUser(null)
    
          }
          
          
          
        })
        return () => {
          return unsubscribe()
        }
      }, [])
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }
    const handleLoginGoogle = () => {
        return signInWithPopup(auth, provider)
    }
    const authInfo = {
        handleSignUp,
        handleSingIn,
        handleSignOut,
        user,
        setUser,
        updateUser,
        handleLoginGoogle,
        loading
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;