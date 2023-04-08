import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from "../../../../utils";
import './RemedyModal.scss'
import {CommonUtils} from "../../../../utils";
import { FormattedMessage } from "react-intl";
import _ from 'lodash'
import React from "react";

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.dataFromParent !== this.props.dataFromParent) {
            let {dataFromParent} = this.props;
            if (!_.isEmpty(dataFromParent)) {
                this.setState({
                    email: dataFromParent.email
                })
            } 
        }
    }

    toggle = () => {
        return this.props.closeRemedyModal();
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeImage = async (e) => {
        let files = e.target.files;
        if(files.length > 0) {
            let file = files[0];
            let fileToBase64 = await CommonUtils.convertFileToBase64(file);
            this.setState({
                imgBase64: fileToBase64,
            })
        }
    }

    handleClickSubmit = () => {
        let {email, ...rest} = this.props.dataFromParent;
        let dataSended = {
            ...this.state,
            ...rest
        }
        this.props.sendRemedy(dataSended);
    }
    
    render () {
        
        return ( 
            <Modal 
                size='lg' 
                isOpen={this.props.isOpen} 
                toggle={this.toggle} 
                className={'remedy-modal'}
                centered
            >
                <ModalHeader toggle={this.toggle} className="remedy-modal-header">Gửi hóa đơn khám bệnh</ModalHeader>
                <ModalBody>
                    <div className="remedy-modal-body row">
                        <div className="form-group col-6">
                            <label>Địa chỉ email</label>
                            <input 
                                className="form-control" 
                                type="email" 
                                value={this.state.email} 
                                onChange={e => this.handleChangeEmail(e)}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label>Chọn ảnh hóa đơn</label>
                            <input className="form-control" type="file" onChange={(e) => this.handleChangeImage(e)}></input>
                        </div>
                    </div>
                </ModalBody> 
                <ModalFooter>
                    <Button 
                        color="primary" 
                        className='px-3'
                        onClick={this.handleClickSubmit}
                    >
                        <FormattedMessage id="patient.booking-modal.btnConfirm"/>
                    </Button>{' '}

                    <Button color="secondary" className='px-3' onClick={this.toggle}>
                        <FormattedMessage id="patient.booking-modal.close"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)