/*
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from "@material-ui/core/Button";

const LoginModal = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    },[]);


    return(
        <div className="modal-background">
            <Button onClick={isModalVisible}>show model</Button>
            {/!*<Modal onBackdropClick={setIsModalVisible(false)}  isOpen={isModalVisible} header="Login">*!/}
            {/!*    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>*!/}
            {/!*        <Tabs centered>*!/}
            {/!*            <Tab label="Item One" />*!/}
            {/!*            <Tab label="Item Two" />*!/}
            {/!*            <Tab label="Item Three" />*!/}
            {/!*        </Tabs>*!/}
            {/!*    </Box>*!/}
            {/!*</Modal>*!/}
        </div>
    )
}

export default LoginModal;


*/
import React, { useState } from "react";
import "./LoginModal.css";
import LModal from "./LModal";

function LoginModal() {
    const [modalOpen, setModalOpen] = useState(false);

    function myBlurFunction(state) {
        if(state) {
            let containerEle = document.getElementById("main");
            containerEle.style = "filter:blur(2px)";
            console.log("in blur");
        }
        else {
            let containerEle = document.getElementById("main");
            containerEle.style = "filter:blur(0px)";
            console.log("out blur");
        }
    }

    return (
        <div  className="App">
            <div id="main">
            <h1>Hey, click on the button to open the modal.</h1>
            <button
                className="openModalBtn"
                onClick={() => {
                    setModalOpen(true);
                    myBlurFunction(1);
                }}
            >
                Open
            </button>
            </div>
            {modalOpen && <LModal setOpenModal={setModalOpen} myBlurFunction={myBlurFunction} modalOpen={modalOpen}/>}
        </div>
    );
}

export default LoginModal;