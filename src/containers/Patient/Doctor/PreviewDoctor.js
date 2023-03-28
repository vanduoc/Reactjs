import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileDoctor from './ProfileDoctor';
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfor from './DoctorExtraInfor'
import './PreviewDoctor.scss'
import { Link } from 'react-router-dom';

class PreviewDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    async componentDidUpdate(preProps, prevState, snapshot){}


    render() {
        return (
            <div className='wrapper-preview-doctor'>
                <div className='content-preview-left'>
                    <ProfileDoctor doctorId= {this.props.idFromParent} isShowDescriptionDoctor/>
                    <Link to={`/detail-doctor/${this.props.idFromParent}`} className='see-more-btn'>Xem Thêm</Link>
                </div>
                <div className='content-preview-right'>
                    <DoctorSchedule currentDoctorId= {this.props.idFromParent}/>
                    <span className='middle-separate'></span>
                    <DoctorExtraInfor idFromParent= {this.props.idFromParent}/>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDoctor);
