import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () =>{
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const HandleSignOut = () =>{
        signOut(auth).then(() => {
           // Sign-out successful.
           navigate("/");
        })
        .catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }

    return(
        <div className="absolute flex justify-between w-screen py-7 px-7 bg-gradient-to-b from-black">
            <img 
            className="w-44"
            src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAchJje9GUBJ_ehbO0uOApH8QmRyuvK0LQI9obzFeGtfkpfLyh4FdolMZR4PtvyNoOomDcY7BzTbhFC3gJinH0UadYBg807AKDSPyfsUDm9T3CZKn9OSZN3II7060MZESFcb6YOS9jvzh.svg"
            alt="logo"/>
            {user && 
                <div className="flex">
                    <img 
                    className="w-10 h-10 rounded-full object-cover" 
                    alt="user" 
                    src={user.photoURL}
                    />
                <button className="bg-green-300 px-4 py-2 mx-4 rounded-lg text-black font-bold" onClick={HandleSignOut}>Sign Out</button>
            </div>
            }
        </div>
    )
}

export default Header;