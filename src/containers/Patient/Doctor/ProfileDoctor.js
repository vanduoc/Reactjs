import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { fetchProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { FormattedNumber } from '../../../components/Formating';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
         dataProfile: {}
        }
    }

    async componentDidMount() {
        if(this.props.doctorId) {
          let res = await this.getProfileDoctorData(this.props.doctorId);
          this.setState({
            dataProfile: res
          })
        }
    }

    async componentDidUpdate(preProps, prevState, snapshot){
        if(preProps.doctorId !== this.props.doctorId) {
            let res = await this.getProfileDoctorData(this.props.doctorId);
          this.setState({
            dataProfile: res
          })
          }
    }

    getProfileDoctorData = async(id) => {
        let result = {}
        if(id) {
            let profileData = await fetchProfileDoctorById(id);
            if (profileData && profileData.errCode === 0) {
              result = profileData.data
            }
        }
        return result;
    }

    render() {
        let { dataProfile } = this.state;
        let {language} = this.props;
        let doctorName = '', reviewImageURL = '', positionVi = '', positionEn = '', description = '', address = '', priceVi ='', priceEn= '';
        if(dataProfile) {
            doctorName = LANGUAGES.VI === language ? `${dataProfile.firstName} ${dataProfile.lastName} `: `${dataProfile.lastName} ${dataProfile.firstName} `;
            reviewImageURL = dataProfile.image ? dataProfile.image : '';
            positionVi = dataProfile.positionData ? dataProfile.positionData.valueVi : ''; 
            positionEn = dataProfile.positionData ? dataProfile.positionData.valueEn : ''; 
            description = dataProfile.Markdown ? dataProfile.Markdown.description : ''; 
            address = dataProfile.address ? dataProfile.address : '';
            priceEn = dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData ? dataProfile.Doctor_infor.priceTypeData.valueEn : '';
            priceVi = dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData ? dataProfile.Doctor_infor.priceTypeData.valueVi : '';
        }
        return (
                <>
                    <div className='profile-container'>
                        <div className='content-left' style={{ backgroundImage: `url(${reviewImageURL}`}}>
                        </div>
                        <div className='content-right'>
                            <h5 className='doctor-name'>{LANGUAGES.VI === language ? positionVi : positionEn} {doctorName}</h5>
                            { this.props.isShowDescriptionDoctor && <p className='doctor-description'>{description}</p>}
                            <span className='doctor-address'><i className="fas fa-map-marker-alt"></i>{address}</span>
                        </div>
                    </div>                    
                    {this.props.isShowPrice && <span className='examination-price'>Giá khám: {LANGUAGES.VI === language ? FormattedNumber(priceVi) + ' VND' : FormattedNumber(priceEn) + ' $'}</span>}
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
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
