
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataContext';
import CreatePost from './CreatePost';
import MyCard from './MyCard';




function UserPost() {

    const [posts, setPosts] = useState([]);
    const { URL, user } = useContext(DataContext);
    const [page, setPage] = useState([1]);
    const [pagePageCount, setPageCount] = useState(0);

    useEffect(
        () => {
            axios.get(URL.api + URL.userPosts + "?page=" + page[0], URL.headers(user.token))
                .then(x => {
                    if (Array.isArray(x.data))
                        setPosts(x.data);
                    else
                        setPosts([x.data]);
                    setPageCount(x.data[0].page_count);
                }).catch((err) => { if (err.message) alert("Error") });
        }, page)

    const getPage = (val) => {
        if (page[0] + val > pagePageCount || page[0] + val < 1)
            return;
        setPage(x => [x[0] + val]);

        axios.get(URL.api + URL.userPosts + "?page=" + page[0], URL.headers(user.token))
            .then(x => {
                if (Array.isArray(x.data))
                    setPosts([...x.data]);
                else
                    setPosts([x.data]);
                    setPageCount(x.data.page_count);
            }).catch((err) => { if (err.message) alert("Error") });
    }


    return (
        <>
            <CreatePost getPage={getPage}></CreatePost>
            <div className="container">
                {posts.length > 0 &&

                    posts.map(x => <MyCard key={`cards` + x.id} getPage={getPage} data={x}></MyCard>)}
            </div>
            <ul className="pagination justify-content-center">
            {page[0] > 1 &&
                <li className="page-item"><a onClick={() => getPage(-1)} className="page-link" href="#">Previous</a></li>
            }
            {page[0] < pagePageCount &&
                <li className="page-item"><a onClick={() => getPage(1)} className="page-link" href="#">Next</a></li>
            }
        </ul>
        </>
    )


}


export default UserPost;