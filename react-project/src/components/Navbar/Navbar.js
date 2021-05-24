
import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { DataContext } from '../../Context/DataContext';

function Navbar(params) {

    const { isAuthorized, clearState  } = useContext(DataContext);

   
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <NavLink to="/" className="navbar-brand" >DataStorage</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to="/" className="nav-item nav-link active" >Home <span className="sr-only">(current)</span></NavLink>
                        {!isAuthorized() ?
                            <>
                                <NavLink to="/signin" className="nav-item nav-link" >Sign in</NavLink>
                                <NavLink to="/signup" className="nav-item nav-link" >Sign up</NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/Posts" className="nav-item nav-link" >Posts</NavLink>
                                <NavLink to="/MyPost" className="nav-item nav-link">My Posts</NavLink>
                                <NavLink to="/Search" className="nav-item nav-link">Search Posts</NavLink>
                                <button onClick={()=>clearState()} className="nav-item nav-link btn btn-secondary text-white ">Log out </button>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;