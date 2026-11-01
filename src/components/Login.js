import { useState, useRef } from "react";
import Header from "./Header";
import { CheckValidData } from "../utils/validate";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";

const Login = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const HandleSigIn = () => {
        // checking email,password validations
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        // console.log(emailValue);
        // console.log(passwordValue);
        const message = CheckValidData(emailValue, passwordValue);
        setErrorMessage(message);

        if(message) return;

        // sign in or sign up logic here
        if(!isSignIn){
            // sign up logic 
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user);
                updateProfile(user, {
                    displayName: name.current.value, 
                    photoURL: "https://avatars.githubusercontent.com/u/247019419?v=4"
                })
                .then(() => {
                    // Profile updated!
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(
                        addUser(
                        {
                            uid: uid, 
                            email: email, 
                            displayName: displayName, 
                            photoURL: photoURL
                        })
                    );
                    navigate("/browse");
                })
                .catch((error) => {
                 // An error occurred
                    setErrorMessage(error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+" "+errorMessage);
                setErrorMessage(errorMessage);
            });
        }
        else{
            // sign in logic
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage);
                    setErrorMessage(errorMessage);
                });
        }
    };

    const ToggleSignIn = ()=>{
        setIsSignIn(!isSignIn);
    };
    return(
        <div>
            <Header/>
            <div className="absolute">
                <img 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_small.jpg"
                alt="bg-image"/>
            </div>
            <form onSubmit = {(e)=> e.preventDefault()} className="w-3/12 absolute bg-black text-white bg-opacity-75  p-12 my-36 mx-auto left-0 right-0">
                <h1 className="text-3xl font-bold pb-5 mx-2">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignIn &&
                <input 
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="p-3 mx-2 my-3 w-full bg-gray-600"
                />
                }
                <input 
                    ref={email}
                    type="text" 
                    placeholder="Email Address"
                    className="p-3 mx-2 my-3 w-full bg-gray-600"
                />
                <input 
                    ref={password}
                    type="Password"
                    placeholder="password"
                    className="p-3 mx-2 my-3 w-full bg-gray-600"
                />
                <p className="text-red-500 font-semibold">{errorMessage}</p>
                <button className="p-4 mx-2 my-4 w-full bg-red-800" onClick={HandleSigIn}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                <p className="font-semibold p-2 cursor-pointer" onClick={ToggleSignIn}>{isSignIn ? "new to Netflix?Sign Up now!" : "already registered Sign In now!"}</p>
            </form>
        </div>
    )
}

export default Login;
