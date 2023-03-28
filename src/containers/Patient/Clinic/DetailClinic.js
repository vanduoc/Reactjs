import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import HomeHeader from '../../HomePage/HomeHeader.js'
import PreviewDoctor from '../Doctor/PreviewDoctor.js';
import './DetailClinic.scss'
import { fetchDetailClinic } from '../../../services/userService.js';
import { LANGUAGES } from '../../../utils/constant.js';
import * as actions from '../../../store/actions'

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinicDoctor: [],
            currentClinicData: {},
            isShowMoreDetailClinic: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let detailClinic = await fetchDetailClinic(this.props.match.params.id);

            if (detailClinic && detailClinic.errCode === 0) {
                let listClinicDoctor =  detailClinic.data && detailClinic.data.clinicData ? detailClinic.data.clinicData : [];
                this.setState({
                    listClinicDoctor: listClinicDoctor,
                    currentClinicData: detailClinic.data,
                })
            }
        }
    }

    renderProvinceOption(arr) {
        let result = LANGUAGES.VI === this.props.language ? [{label: 'Toàn quốc', value: '0'}] : [{label: 'Nationwide', value: '0'}];
        if (arr && arr.length > 0) {
            let res = arr.map(item => {
                let object = {};
                object.label = LANGUAGES.VI === this.props.language ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                return object;
            });
            result = [...result, ...res];
        }
        return result;
    }

    componentDidUpdate(preProps, prevState, snapshot){
        if (preProps.language !== this.props.language) {
            
        }
    }

    handleShowMoreDetaileClinic = (value) => {
        this.setState({
            isShowMoreDetailClinic: value
        })
    }

    render() {
        let { listClinicDoctor,  currentClinicData, isShowMoreDetailClinic } = this.state;
        console.log(currentClinicData);
        return (
            <>  
                <HomeHeader />
                <div className='detail-clinic-container'>
                    <div className='detail-clinic-header' style={{background:`url(${currentClinicData.image})`}}>
                        <div className='overlay'>
                            <div className='clinic-content' >
                                <div 
                                    className='intro-content' 
                                    dangerouslySetInnerHTML={{__html: currentClinicData.descriptionHTML}}
                                    style={{'maxHeight': `${isShowMoreDetailClinic ? 'none' : '186px'}`}}
                                >
                                </div>
                                {
                                    !isShowMoreDetailClinic ? 
                                    <div className='read-more-btn' onClick={()=>this.handleShowMoreDetaileClinic(true)}>Đọc thêm</div>
                                    :
                                    <div className='read-litle-btn' onClick={()=>this.handleShowMoreDetaileClinic(false)}>Ẩn bớt</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='list-doctor-infor-container'>
                        <div className='wrapper-list-doctor-infor'>
                                {
                                    listClinicDoctor && listClinicDoctor.length> 0 ? 
                                    listClinicDoctor.map((item, index) => {
                                        return (
                                        <div key={index} className='wrapper-doctor-infor-item'>
                                            <PreviewDoctor idFromParent={item.doctorId}/>
                                        </div>
                                        )
                                    }) : <div>Không tìm thấy bác sĩ nào phòng khám này</div>
                                }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
