
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../Context/DataContext';
import MyCard from './MyCard';




function Search() {
    const [posts, setPosts] = useState([]);
    const { URL, user } = useContext(DataContext)
    const findByRef = useRef(null);
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get(URL.api + URL.category, URL.headers(user.token))
            .then(x => {
                if (Array.isArray(x.data))
                    setCategory(x.data);
                else
                    setCategory([...x.data]);
            }).then(axios.get(URL.api + URL.tags, URL.headers(user.token))
                .then(x => {
                    if (Array.isArray(x.data)) {
                        let temp = [...new Set(x.data.map(x => x.tag))]
                        setTags(temp);
                    }
                    else
                        setTags([x.data.tag]);

                }))

    }
        , [])



    const getPage = (typeOfsearch = "") => {

        let temp = "";
        switch (typeOfsearch) {
            case "/findPostByTittle":
                if (findByRef.current["Title"].value.trim() != "")
                    temp = findByRef.current["Title"].value;
                else return;
                break;

            case "/findPostByTags":
                if (findByRef.current["Tags"].value.trim() != "")
                    temp = findByRef.current["Tags"].value;
                else return
                break;

            case "/findPostByCategory":
                if (findByRef.current["Category"].selectedIndex != 0)
                    temp = category[findByRef.current["Category"].selectedIndex - 1].name;
                else return

                break;
            default: break;
        }
        axios.get(URL.api + typeOfsearch + "?value=" + temp, URL.headers(user.token))
            .then(x => {
                if (Array.isArray(x.data))
                    setPosts([...x.data]);
                else
                    setPosts([x.data]);
            }).catch((err) => { if (err.message) alert("Error") });
    }

    return (
        <>

            <div className="container">
                <div className="div-input-fiald w-75 m-auto bg-white my-auto mt-3">
                    <form className="w-75 mx-auto my-5 py-4" ref={findByRef}>
                        <p className="newpost-p">Search Posts</p>

                        <div className="input-group mb-3">
                            <input type="text" name={"Title"} className="form-control input" placeholder="Tittle" aria-label="Recipient's username" />
                            <a className="btn btn-outline-secondary ml-3" onClick={(ev) => getPage("/findPostByTittle")} type="button" >Find by Tittle</a>
                        </div>

                        <div className="input-group mb-3">
                            <select name={"Tags"} className="form-control input" id="Select">
                                <option defaultValue>Select Tags</option>
                                {tags.length > 0 &&
                                    <>
                                        {tags.map(x => <option key={"tags  " + x} >{x}</option>)}
                                    </>
                                }
                            </select>
                            <a className="btn btn-outline-secondary ml-3" onClick={(ev) => getPage("/findPostByTags")} type="button">Find by Tags</a>
                        </div>

                        <div className="input-group mb-3">
                            <select name={"Category"} className="form-control input" aria-label="Recipient's username" id="Select">
                                <option defaultValue>Select Category</option>
                                {category.length > 0 &&
                                    <>
                                        {category.map(x => <option key={"category " + x.name} >{x.name}</option>)}
                                    </>
                                }
                            </select>
                            <a className="btn btn-outline-secondary ml-3" onClick={(ev) => getPage("/findPostByCategory")} type="button">Find by Category</a>
                        </div>
                    </form>
                </div>
            </div>





            <div className="container">
                {posts &&
                    posts.map(x => <MyCard key={`cards` + x.id} data={x}></MyCard>)
                }
            </div>


        </>
    )


}


export default Search;