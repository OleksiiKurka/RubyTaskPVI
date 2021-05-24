
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataContext';
import CreatePost from './CreatePost';
import MyCard from './MyCard';




function Post() {


    const [posts, setPosts] = useState([]);
    const { URL, user } = useContext(DataContext)
    const [page, setPage] = useState([1]);
    const [pagePageCount, setPageCount] = useState(0);
    useEffect(
        () => {
            axios.get(URL.api + URL.posts + "?page=" + page[0], URL.headers(user.token))
                .then(x => {
                    if (Array.isArray(x.data))
                        setPosts([...x.data]);
                    else
                        setPosts([x.data]);
                    setPageCount(x.data[0].page_count);
                }).catch((err) => { if (err.message) alert("Error") });
        }, page)

    const getPage = (val) => {
        if (page[0] + val > pagePageCount || page[0] + val < 1)
            return;
        axios.get(URL.api + URL.posts + "?page=" + page[0], URL.headers(user.token))
            .then(x => {
                if (Array.isArray(x.data))
                    setPosts([...x.data]);
                else
                    setPosts([x.data]);
                console.log(x);
                if (pagePageCount != x.data[0].page_count)
                    setPageCount([x.data[0].page_count]);
            }).catch((err) => { if (err.message) alert("Error") });
        setPage(x => [x[0] + val]);
    }

    return (
        <>
            <CreatePost></CreatePost>
            <div className="container">
                {posts &&
                    posts.map(x => <MyCard getPage={getPage} key={`cards` + x.id} data={x}></MyCard>)
                }
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


export default Post;