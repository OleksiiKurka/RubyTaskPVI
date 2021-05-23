
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../Context/DataContext';
import CreatePost from './CreatePost';
import MyCard from './MyCard';




function UserPost() {

    const { URL, user, setPosts, posts } = useContext(DataContext)
    useEffect(
        () => {
            axios.get(URL.api + URL.userPosts, URL.headers(user.token))
                .then(x => {
                    if (Array.isArray(x.data))
                        setPosts(x.data);
                    else
                        setPosts([x.data]);
                    console.log(x);
                }).catch((err) => { if (err.message) alert("Error") });
        }, [])



    return (
        <>
            <CreatePost></CreatePost>
            {posts.length > 0 &&

                posts.map(x => <MyCard key={`cards` + x.id} data={x}></MyCard>)}
        </>
    )


}


export default UserPost;