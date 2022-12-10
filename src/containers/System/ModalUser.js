import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggle();
    }

    handleChangeInput = (e, id) => {
        this.setState({
            [id] : e.target.value
        })
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                size='lg' 
                isOpen={this.props.isOpen} 
                toggle={this.toggle} 
                className={'modal-user-container'}
            >
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                            <div className='modal-user-body'>
                                <div className='input-container'>
                                    <label>Email</label>
                                    <input type='email' value={this.state.email} onChange={(e) => this.handleChangeInput(e, "email")} />
                                </div>
                                <div className='input-container'>
                                    <label>Password</label>
                                    <input type='password' value={this.state.password} onChange={(e) => this.handleChangeInput(e, "password")} />
                                </div>
                                <div className='input-container'>
                                    <label>First name</label>
                                    <input type='text' value={this.state.firstName} onChange={(e) => this.handleChangeInput(e, "firstName")} />
                                </div>
                                <div className='input-container'>
                                    <label>Last Name</label>
                                    <input type='text' value={this.state.lastName} onChange={(e) => this.handleChangeInput(e, "lastName")} />
                                </div>
                                <div className='input-container max-width'>
                                    <label>Address</label>
                                    <input type='text' value={this.state.address} onChange={(e) => this.handleChangeInput(e, "address")} />
                                </div>
                            </div>
                </ModalBody> 
                <ModalFooter>
                <Button color="primary" className='px-3' onClick={this.handleAddNewUser}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



