import React, { useContext, useRef } from 'react';
import signupimg from '../../images/signup.png';
import "./Signup.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../Context/DataContext';

function SignUp(params) {

    const FormInputs = useRef(null);
    const { URL,setUserStore } = useContext(DataContext);

    function sighIn(ev) {
        ev.preventDefault();
        let form = FormInputs.current;
        if (form["First_name"].value.trim() === "" ||
            form["Last_name"].value.trim() === "" ||
            form["Password"].value.trim() === "" ||
            form["Email"].value.trim() === "" ||
            form["Age"].value.trim() === "" ||
            form["About"].value.trim() === "" 
            ) { alert("empty field"); return; }

        axios.post(URL.url + URL.signup, {
            first_name: form["First_name"].value,
            last_name: form["Last_name"].value,
            password: form["Password"].value,
            email: form["Email"].value,
            age: form["Age"].value,
            about: form["About"].value,
            role_id: 2

        }).then(x => {
            setUserStore(false,{
                username: x.data.user.first_name,
                email: x.data.user.email,
                token: x.data.token
            });
            console.log(x)
        }).catch((err) => { if (err.message) alert("Wrong input data") });

    }

    return (
        <>

            <div className="container">
                <div className=" w-75 m-auto  ">
                    <div className="row h-100 bg-white div-input-fiald">
                        <div className="col-12 col-lg-6 my-auto h-100">
                            <form className="w-75 mx-auto my-4" ref={FormInputs}>
                                <p className="signin-p">Sign up</p>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" name={"First_name"} className="form-control input mt-4" placeholder="First name" required />
                                    </div>
                                    <div className="col">
                                        <input type="text" name={"Last_name"} className="form-control input mt-4" placeholder="Last name" required />
                                    </div>
                                </div>
                                <input type="email" name={"Email"} className="form-control input mt-4" placeholder="Email" required />
                                <input type="password" name={"Password"} className="form-control input mt-4" placeholder="Password" required />


                                <div className="row">
                                    <div className="col">
                                        <input type="number" name={"Age"} className="form-control input mt-4" placeholder="Age" required />
                                    </div>
                                    <div className="col">
                                        <input type="text" name={"Role"} className="form-control input mt-4" value="user" readOnly placeholder="Role (user)" required />
                                    </div>
                                </div>

                                <textarea  name={"About"} className="form-control input mt-4" rows="1"></textarea>
                                <div className="mt-3 col-lg-12 d-flex justify-content-end">
                                    <button type="submit" onClick={(ev) => sighIn(ev)} className="btn btn-primary">Sign in</button>
                                </div>
                            </form>
                            <div className="singup-nav-div my-4">
                                <NavLink to="/signin" className="" >I am already member</NavLink>
                            </div>


                        </div>
                        <div className="d-none d-lg-block col-lg-6">
                            <div className="m-4">
                                <img alt="12" className="img-fluid img-sign" src={signupimg}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default SignUp;