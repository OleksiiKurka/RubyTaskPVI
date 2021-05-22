
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../Context/DataContext';
import MyCard from './MyCard';




function UserPost() {

    const { URL, user,setPosts, posts} = useContext(DataContext)
    useEffect(
        () => {
            axios.get(URL.api + URL.userPosts, URL.headers(user.token))
                .then(x => {
                    setPosts([x.data]);
                    console.log(x);
                }).catch((err) => { if (err.message) alert("Error") });
        }, [])



    return (
        <>
            {posts.length >0 &&
            
            posts.map(x => <MyCard key={`cards` + x.id} data={x}></MyCard>)}
        </>
    )


}


export default UserPost;