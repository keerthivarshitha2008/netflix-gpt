import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const appStore = configureStore(
    {
        reducer: {
            user: userSlice,
        }
    }
)

console.log("Redux Store:", appStore);

export default appStore;