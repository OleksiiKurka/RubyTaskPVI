import React, { useContext, useRef } from 'react';
import signinimg from '../../images/signin.png';
import { NavLink } from 'react-router-dom';
import "./Signin.css"
import { DataContext } from '../../Context/DataContext';
import axios from 'axios';

function SignIn() {
    const { URL,setUserStore,user } = useContext(DataContext);
    const FormInputs = useRef(null);
    const checkValOfBox = useRef(null);

    function sighIn(ev) {
        ev.preventDefault();
        let form = FormInputs.current;
        if (form["Email"].value.trim() === "" ||
            form["Password"].value.trim() === "") { alert("empty field"); return; }

        axios.post(URL.url + URL.signin, { email: form["Email"].value, password: form["Password"].value },URL.headers(user.token)
            ).then(x => {
                setUserStore(checkValOfBox.current.checked,{
                    username: x.data.first_name,
                    email: x.data.email,
                    token: x.data.token,
                    user_id:x.data.id,
                    user_role:x.data.role.role
                });
                console.log(x)
            }).catch((err)=>{if(err.message) alert("Wrong input data")});;
    }



return (

    <div className="container">
        <div className=" w-75 m-auto  ">
            <div className="row h-100 bg-white div-input-fiald">

                <div className="col-12 col-lg-6 my-auto  h-100">
                    <form className="w-75 mx-auto my-5" ref={FormInputs}>
                        <p className="signin-p">Sign in</p>
                        <input type="text" name={"Email"} className="form-control input mt-4" placeholder="Name" required />
                        <input type="password" name={"Password"} className="form-control input mt-4" placeholder="Password" required />
                        < div className="custom-control custom-checkbox mt-4">
                            <input ref={checkValOfBox} name={"Remember"} type="checkbox" className="custom-control-input" id="customCheck" name="example1" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember me</label>
                        </div>
                        <div className="mt-3 col-lg-12 d-flex justify-content-end">
                            <button type="submit" onClick={(ev) => sighIn(ev)} className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                    <div className="singin-nav-div my-4">

                        <NavLink to="/signup" className="" >Sign up new account</NavLink>
                    </div>


                </div>
                <div className="d-none d-lg-block col-lg-6">
                    <div className="m-4">
                        <img alt="12" className="img-fluid img-sign" src={signinimg}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


}


export default SignIn;