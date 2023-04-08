import React, { Component } from 'react';
import { connect } from "react-redux";
import { verifyBookAppoinment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: '',
            statusVerify: false
        }
    }

    async componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        let res = await verifyBookAppoinment({doctorId, token});
        if (res && res.errCode === 0) {
            this.setState({
                notify: res.message,
                statusVerify: true
            })
        }
    }

    componentDidUpdate(preProps, prevState, snapshot){
        
    }

    render() {
        return (
            <>
                <HomeHeader />
                <h1 className='mt-3' style={{fontSize: '16px', fontWeight: '600', textAlign:'center', color: '#01c501', textTransform: 'uppercase'}}>
                    {
                        this.state.statusVerify ?
                        this.state.notify : 'Loading data....'
                    }

                </h1>
            </>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
