import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services';
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props); //Giúp kế thừa props truyền từ login xuống nếu có
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            isShowPassword: false,
        }
    }

    
    handleChangUsername = (event) => {
        this.setState({
            username: event.target.value,
            errMessage: '',
        });
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            errMessage: '',
        });
    }

    handleShowPassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }

    handleLogin = async () => {
        this.setState({errMessage: ''});
        try {
           let data = await handleLoginApi(this.state.username, this.state.password);
           if( data && data.errCode !== 0) {
            this.setState({
                errMessage: data.message
            })
           }else {
            this.props.userLoginSuccess(data.user);
           }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.handleLogin();
        }
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
                                onKeyDown={this._handleKeyDown}
                                />
                                <span className='password-icon-btn' onClick={this.handleShowPassword}><i className={this.state.isShowPassword ? "far fa-eye": "far fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={this.handleLogin}>
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
                        <i className="fab fa-google-plus-g google"></i>
                        <i className="fab fa-facebook-f facebook"></i>
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
