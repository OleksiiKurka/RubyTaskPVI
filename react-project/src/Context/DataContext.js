import { createContext, useState } from "react";


export const DataContext = createContext();


export const DataProvider = ({ children }) => {


    const [user, setUser] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        user_id: localStorage.getItem("user_id"),
        user_role: localStorage.getItem("user_role"),
    });

    const setUserStore = (temp, value) => {
        if (temp) {
            localStorage.setItem("username", value.username);
            localStorage.setItem("email", value.email);
            localStorage.setItem("token", value.token);
            localStorage.setItem("user_id", value.user_id);
            localStorage.setItem("user_role", value.user_role);
        }
        setUser(value);
    }
    const clearState = () => {
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        localStorage.setItem("token", "");
        localStorage.setItem("user_id", "");
            localStorage.setItem("user_role", "");
            setUser({
                username: "",
                email: "",
                token: "",
                user_id: "",
                user_role: ""
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
        tags: "/tags",
        posts: "/posts",
        signin: "/login",
        signup: "/user",
        category: "/categories",
        userPosts: "/userPosts",
        addComment: "/comments",
        deletePost: "/posts",
        addLike: "/likes",
        deleteLike: "/likes",
        headers: (val) => { return { headers: { 'Authorization': `bearer ${val}` } } }
    });



    const objectTOsend = {
        URL,
        clearState,
        user,
        isAuthorized,
        setUserStore
    }


    return <DataContext.Provider value={objectTOsend}>{children}</DataContext.Provider>;
}
