import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props); //Giúp kế thừa props truyền từ login xuống nếu có
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    
    handleChangUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleShowPassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }

    handleChangeSubmid = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login text-center'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label className='input-label'>Username:</label>
                            <input type='text' 
                                className='form-control' 
                                placeholder='Enter your username' 
                                value={this.state.username}  
                                onChange={(event) => {this.handleChangUsername(event)}}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label className='input-label'>Password:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                className='form-control form-password' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(e) => this.handleChangePassword(e)}
                                />
                                <span className='password-icon-btn' onClick={this.handleShowPassword}><i class={this.state.isShowPassword ? "far fa-eye": "far fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={this.handleChangeSubmid}>
                                Log in
                            </button>
                            </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                        <i class="fab fa-google-plus-g google"></i>
                        <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
