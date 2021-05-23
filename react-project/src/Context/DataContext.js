import { createContext, useState } from "react";


export const DataContext = createContext();


export const DataProvider = ({ children }) => {


    const [posts, setPosts] = useState([]);
    const [category,setCategory] = useState([]);

    const [user, setUser] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
    });

    const setUserStore = (temp, value) => {
        if (temp) {
            localStorage.setItem("username", value.username);
            localStorage.setItem("email", value.email);
            localStorage.setItem("token", value.token);
        }
        setUser(value);
    }
    const clearState = () => {
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        localStorage.setItem("token", "");
        setUser({
            username: "",
            email: "",
            token: ""
        });
    }

    const isAuthorized = () => {
        for (let temp in user) {
            if (!user[temp])
                return false
        }
        return true;
    }

    const [URL] = useState({
        url: "http://localhost:3000",
        api: "http://localhost:3000/api/v1",
        posts: "/posts",
        signin: "/login",
        signup: "/user",
        category:"/categories",
        userPosts: "/userPosts",
        headers: (val) => { return { headers: { 'Authorization': `bearer ${val}` } } }
    });


   
    const objectTOsend = {
        URL,
        clearState,
        posts,
        setPosts,
        user,
        isAuthorized,
        setUserStore,
        category,
        setCategory
    }


    return <DataContext.Provider value={objectTOsend}>{children}</DataContext.Provider>;
}
