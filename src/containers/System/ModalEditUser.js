import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }


    componentDidMount() {
        let editUserData = this.props.editUserData;
        if (editUserData && !_.isEmpty(editUserData)) {
            this.setState({
                id: editUserData.id,
                email: editUserData.email,
                firstName: editUserData.firstName,
                lastName: editUserData.lastName,
                address: editUserData.address
            })
        }
    }

    toggle = () => {
        this.props.toggle();
    }

    handleChangeInput = (e, id) => {
        this.setState({
            [id] : e.target.value   
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        
        return isValid;
    }

    handleUpdateUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.UpdateUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                size='lg' 
                isOpen={true} 
                toggle={this.toggle} 
                className={'modal-user-container'}
            >
                <ModalHeader toggle={this.toggle}>EDIT USER</ModalHeader>
                <ModalBody>
                            <div className='modal-user-body'>
                                <div className='input-container'>
                                    <label>First name</label>
                                    <input type='text' value={this.state.firstName} onChange={(e) => this.handleChangeInput(e, "firstName")} />
                                </div>
                                <div className='input-container'>
                                    <label>Last Name</label>
                                    <input type='text' value={this.state.lastName} onChange={(e) => this.handleChangeInput(e, "lastName")} />
                                </div>
                                <div className='input-container'>
                                    <label>Email</label>
                                    <input disabled type='email' value={this.state.email} onChange={(e) => this.handleChangeInput(e, "email")} />
                                </div>
                                <div className='input-container'>
                                    <label>Address</label>
                                    <input type='text' value={this.state.address} onChange={(e) => this.handleChangeInput(e, "address")} />
                                </div>
                            </div>
                </ModalBody> 
                <ModalFooter>
                <Button color="primary" className='px-3' onClick={this.handleUpdateUser}>
                    Save change
                </Button>{' '}
                <Button color="secondary" className='px-3' onClick={this.toggle}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



