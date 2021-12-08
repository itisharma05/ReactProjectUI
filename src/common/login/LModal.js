import React from "react";
import "./Modal.css";
import Modal from "react-modal";

function LModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {/*<Box>
                <Tab>
                    <Tabs></Tabs>
                </Tab>
            </Box>*/}
        </Modal>
    );
}

export default LModal;