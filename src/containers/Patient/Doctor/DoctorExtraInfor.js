import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { FormattedNumber } from '../../../components/Formating';
import { fetchDoctorExtraInfor } from '../../../services/userService';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoctor: '',
            isShowDetailInfor: false,
        }
    }

    async componentDidMount() {
        if (this.props.idFromParent) {
            let result = await fetchDoctorExtraInfor(this.props.idFromParent);
            if (result && result.errCode === 0)
            this.setState({
             currentDoctor : result.data
            })
        }
    }

    async componentDidUpdate(preProps, prevState, snapshot){
        if (preProps.idFromParent !== this.props.idFromParent) {
            let result = await fetchDoctorExtraInfor(this.props.idFromParent);
            if (result && result.errCode === 0)
            this.setState({
             currentDoctor : result.data
            })
        }
    }

    handleShowDetailInfor = (input) => {
        this.setState({
            isShowDetailInfor: input
        })
    }

    render() {
        let { currentDoctor, isShowDetailInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='clinic-infor'>
                    <h3 className='clinic-title'><FormattedMessage id='patient.extra-infor-doctor.clinic-address' /></h3>
                    <span className='clinic-name'>{currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.clinicData ? currentDoctor.Doctor_infor.clinicData.name : ''}</span>
                    <span className='clinic-address'>{currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.clinicData ? currentDoctor.Doctor_infor.clinicData.address : ''}</span>
                    <div className='price'>
                        <span className='price-title'><FormattedMessage id='patient.extra-infor-doctor.examination-price' /></span>
                        {
                            !isShowDetailInfor ? (
                                <>
                                <span className='num-price'>
                                    {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.priceTypeData && LANGUAGES.VI === language ? FormattedNumber(currentDoctor.Doctor_infor.priceTypeData.valueVi) + ' vnd' : ''}
                                    {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.priceTypeData && LANGUAGES.EN === language ? currentDoctor.Doctor_infor.priceTypeData.valueEn + ' $' : ''}
                                </span>
                                <span className='see-more' onClick={() => this.handleShowDetailInfor(true)}> <FormattedMessage id='patient.extra-infor-doctor.see-more'/></span>
                                </>
                            ) : (
                                <>
                                    <div className='see-more-price'>
                                        <div className='price-up'>
                                            <div className='price-wrapper'>
                                                <span className='price-title'><FormattedMessage id='patient.extra-infor-doctor.examination-price'/></span>
                                                <span className='price-num'>
                                                    {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.priceTypeData && LANGUAGES.VI === language ? FormattedNumber(currentDoctor.Doctor_infor.priceTypeData.valueVi) + ' vnd' : ''}
                                                    {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.priceTypeData && LANGUAGES.EN === language ? currentDoctor.Doctor_infor.priceTypeData.valueEn + ' $' : ''}
                                                </span>
                                            </div>
                                            <div className='note'>
                                                {
                                                    currentDoctor && currentDoctor.Doctor_infor ? currentDoctor.Doctor_infor.note : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='price-down'>Phòng khám có hình thức thanh toán chi phí bằng 
                                            {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.paymentTypeData && LANGUAGES.VI === language ? ' ' + currentDoctor.Doctor_infor.paymentTypeData.valueVi.toLowerCase(): ''}
                                            {currentDoctor.Doctor_infor && currentDoctor.Doctor_infor.paymentTypeData && LANGUAGES.EN === language ? ' ' + currentDoctor.Doctor_infor.paymentTypeData.valueEn.toLowerCase(): ''}
                                        </div>
                                    </div>
                                    <span className='hide-price-table' onClick={() => this.handleShowDetailInfor(false)}> <FormattedMessage id='patient.extra-infor-doctor.hide-price-table'/></span>
                                </>
                            )
                        }
                    </div>
                    <span className='insurance-infor'>
                        <span className='insurance-title'><FormattedMessage id='patient.extra-infor-doctor.insurance'/></span> 
                        <span  className='see-more'> <FormattedMessage id='patient.extra-infor-doctor.see-more'/></span>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
