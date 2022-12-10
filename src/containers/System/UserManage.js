import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService } from '../../services'
import './UserManage.scss';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
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

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errCode !== 0) {
                alert(respone.message)
            } else {
                this.setState({
                    isOpenModalUser: false,
                })
                await this.getAllUserFromReact();
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
                                            <button>Edit</button>
                                            <button>Delete</button>
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
