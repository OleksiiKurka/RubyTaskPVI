import { createContext, useState } from "react";
import axios from 'axios';

export const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const URL = "http://localhost:3000/";
    const API = URL + "/api/v1/";
    const [posts, setPosts] = useState([]);



    function GetPosts() {
        axios.get(API + "posts",
            {
                headers: { "Authorization": "bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.oT7kSePnYs7eVIsRIzIi0UEC7XBclsrO3qrnXwic8Zg" }
            }).then(x => {
                setPosts(x.data);
                console.log(x)
            });
    }

    return <DataContext.Provider value={{ GetPosts,posts }}>{children}</DataContext.Provider>;
}
