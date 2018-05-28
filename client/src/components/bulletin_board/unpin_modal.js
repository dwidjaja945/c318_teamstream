import React, { Component } from 'react';

class UnpinModal extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const modalClass = this.props.openModal ? 'modal show-modal' : 'modal';
        const { post_id, pin_level, pinMessage, openModal, modalCallBack } = this.props;

        return(
            <div className={modalClass}>
                <div className="modal-content">
                    <span className="close-button" onClick= {()=>{
                                               modalCallBack();

                    }}>&times;</span>
                    <h1>Hello, I am a modal!</h1>
                    <button onClick={ () => {
                        pinMessage(post_id, pin_level);
                       modalCallBack();
                    } }
                    >Confirm</button>
                    <button className="cancel" onClick={()=>{
                       modalCallBack();
                    }}>Cancel</button>
                </div>
            </div>
        )   
    }
}
export default UnpinModal;