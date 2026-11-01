import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser, removeUser} from "../utils/userSlice";    


const Body = ()=>{
    const dispatch = useDispatch(); 

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
        
    ])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            } 
            else {
                // User is signed out
                dispatch(removeUser());
            }
        });
    },[dispatch]);

    return(
        <div>
            <RouterProvider router = {appRouter} />
        </div>
    )
}

export default Body;