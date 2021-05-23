
import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { DataContext } from '../../Context/DataContext';

import "./CreatePost.css"


function CreatePost(props) {

    const FormInputs = useRef(null);
    const { URL, user, category, setCategory } = useContext(DataContext);

    useEffect(() => {
        axios.get(URL.api + URL.category, URL.headers(user.token))
            .then(x => {
                if (Array.isArray(x.data))
                    setCategory(x.data);
                else
                    setCategory([...x.data]);
            })
    }
    , [])

    
    const confirm = (ev) => {

        ev.preventDefault();
        let form = FormInputs.current;

        console.log(form["Category"].selectedIndex);

        if (form["Title"].value.trim() === "" ||
            form["Body"].value.trim() === "" ||
            form["Tags"].value.trim() === "" ||
            form["Category"].selectedIndex === 0) { alert("empty field"); return; }

         axios.post(URL.api + URL.posts, {
             title: form["Title"].value,
             body: form["Body"].value,
             tags: form["Tags"].value.split(" "),
             category_id: form["Category"].selectedIndex 
         },URL.headers(user.token)).then(x => {
            alert("Posted please reload page")
         }).catch((err) => { if (err.message) alert("Wrong input data") });
         props.getPage(0);

    }
    return (
        <div className="container">
            <div className="div-input-fiald w-75 m-auto bg-white my-auto mt-3">
                <form className="w-75 mx-auto my-5 py-4" ref={FormInputs}>
                    <p className="newpost-p">Create new post</p>
                    <input type="text" name={"Title"} className="form-control input mt-4" placeholder="Title" required />
                    <input type="text" name={"Body"} className="form-control input mt-4" placeholder="Body" required />
                    <input type="text" name={"Tags"} className="form-control input mt-4" placeholder="Tags" required />
                    <div className="form-group">
                        <select name={"Category"} className="form-control input mt-4" id="Select">
                            <option defaultValue>Select Category</option>
                            {category.length > 0 && 
                                <>
                                    {category.map(x=><option key={"category "+x.name} defaultValue>{x.name}</option>)}
                                </>
                            }
                        </select>
                    </div>
                    <div className="mt-3 col-lg-12 d-flex justify-content-end">
                        <button type="submit" onClick={(ev) => confirm(ev)} className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )


}


export default CreatePost;