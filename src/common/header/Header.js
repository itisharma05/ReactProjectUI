import React, {Component, useEffect, useState} from 'react';
import './Header.css';
import Button from "@material-ui/core/Button";
import {Grid, Link} from '@material-ui/core';
import logo from './../../assets/logo.svg';
//import LModal from "../login/LModal";
import Modal from "react-modal";

const Header = (props) => {
    {console.log(props.pageName);}
    const [path , setPath] = useState("");
    const [modalShow,setModalShow] = useState(false);

    useEffect( () => {

        function loadMovie () {
            const str = props.baseUrl + "";
            setPath(str);

        }

        loadMovie();
    }, []);

    return(
            <div className="header">
                <Grid className="grid-container" justifyContent="space-between" container spacing={0} >
                    <a href="/">
                        <img className="brand" alt="" src={logo}/>
                    </a>
                    {props.pageName === 'Details'? <a className="book-btn-aTag" href="/movie/246165d2-a238-11e8-9077-720006ceb890"><Button variant="contained" color="primary" disableElevation style={{left:521}} >BooK Show</Button></a> : ""}
                    <Button className="login-btn custom-btn" variant="contained" color="default" onClick={() => {
                        setModalShow(true);
                    }}>{props.btnName}</Button>
                </Grid>
                {/*<LModal show={modalShow} onHide={() => setModalShow(false)}/>*/}
            </div>
        )
}

export default Header;
