import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services'
import './UserManage.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            editUserData : {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async() => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
        console.log('get user from node.js', response);
    }

    handleClickAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errCode !== 0) {
                alert(respone.message)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');            
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClickEditUser = async (data) => {
        try {
            this.setState({
                editUserData: data,
                isOpenModalEditUser: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    UpdateUser = async (data) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
            }
            else {
                if (res && res.errCode !== 0) {
                    alert(res.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClickDeleteUser = async (id) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            }
            else {
                alert(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen = {this.state.isOpenModalUser}
                    toggle = {this.toggleModalUser}
                    createNewUser = {this.createNewUser}
                />

                {
                    this.state.isOpenModalEditUser && 
                    <ModalEditUser 
                        // isOpen = {this.state.isOpenModalEditUser}
                        toggle = {this.toggleModalEditUser}
                        editUserData = {this.state.editUserData}
                        UpdateUser = {this.UpdateUser}
                    />
                }

                <div className="title text-center">QUẢN LÝ NGƯỜI DÙNG</div>
                <div className='mx-3'>
                    <button 
                        className='btn btn-primary px-3'
                        onClick={this.handleClickAddNewUser}
                    >
                    <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                <table id='users-table'>
                        <thead>
                            <tr>
                                <th>Fisrt Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            arrUsers.length > 0 && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => this.handleClickEditUser(item)}>Edit</button>
                                            <button onClick={() => this.handleClickDeleteUser(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
