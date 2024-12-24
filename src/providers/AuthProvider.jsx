import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
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
          console.log('CurrentUser', currentUser)
          if(currentUser?.email){
           const {data} = await axios.post('http://localhost:5000/jwt', {email: currentUser?.email} , {withCredentials: true}) 
           console.log(data);
           setUser(currentUser)
           setLoading(false)
          }
          else{
            const {data} = await axios.post('http://localhost:5000/logout', {},  {withCredentials: true})
            console.log(data);
            setLoading(false)
    
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