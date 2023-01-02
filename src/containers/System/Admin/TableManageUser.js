import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.getAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                users: this.props.usersRedux
            })
        }
    }

    render() {
        let { users } = this.state;
        return (
                <table id='table-manage-user'>
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
                        {users && users.length > 0 && users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button onClick={() => this.props.handleEditUserFromParent(user)}>Edit</button>
                                        <button onClick={() => this.props.deleteAUserRedux(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                    </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserRedux : () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
