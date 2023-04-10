import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { fetchPatientForDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './ManagePatient.scss'
import { toast } from 'react-toastify';
import RemedyModal from './Modal/RemedyModal';
import { postSendRemedy } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            listPatient: [],
            isOpenModal: false,
            dataRemedyModal: {},
            isLoading: false
        }
    }

    async componentDidMount() {
        this.getPatientForDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentDate !== this.state.currentDate) {
            this.getPatientForDoctor();
        }
    }

    getPatientForDoctor = async () => {
        let doctorId = this.props.userInfo.id;
        let formatedCurrentDate = new Date(this.state.currentDate).getTime();
        let res = await fetchPatientForDoctor(doctorId, formatedCurrentDate);
        if (res && res.errCode === 0) {
            this.setState({
                listPatient: res.data
            })
        }
    }

    handleBtnConfirm = (item) => {
        let dataRemedyModal = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData && item.patientData.email ? item.patientData.email : '',
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            language: this.props.language
        }
        this.setState({
            isOpenModal: true,
            dataRemedyModal: dataRemedyModal
        })
    }

    sendRemedy = async (data) => {
        this.setState({
            isLoading: true
        })
        let res = await postSendRemedy(data);
        this.setState({
            isLoading: false
        })
        if (res && res.errCode === 0) {
            toast.success('Successfully !!!');
            this.closeRemedyModal();
            this.getPatientForDoctor();
        }
        else {
            toast.error('Something went wrong...!!!');
        }
        
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenModal: false,
            dataRemedyModal: {}
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
      }

    render() {
        return (
            <>
                
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Đang gửi...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            <FormattedMessage id='menu.doctor.manage-patient'/>
                        </div>
                        <div className='m-p-content row'>
                            <div className='time-picker col-4'>
                                <label className=''>Chọn ngày khám</label>
                                <DatePicker
                                    className='form-control'
                                    value={this.state.currentDate}
                                    onChange={this.handleOnchangeDatePicker}
                                />
                            </div>
                            <table className='m-p-table col-12'>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Giới tính</th>
                                        <th>Địa chỉ</th>
                                        <th>Thời gian</th>
                                        <th>Hành động</th>
                                    </tr>
                                    {
                                        this.state.listPatient && this.state.listPatient.length > 0? 
                                        this.state.listPatient.map((item, index) => {
                                            let genderVi = item.patientData && item.patientData.genderData ? item.patientData.genderData.valueVi : '';
                                            let genderEn = item.patientData && item.patientData.genderData ? item.patientData.genderData.valueEn : '';
                                            let timeVi = item.timeTypeData ? item.timeTypeData.valueVi : '';
                                            let timeEn = item.timeTypeData ? item.timeTypeData.valueEn : '';
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patientData ? item.patientData.firstName : ''}</td>
                                                    <td>{this.props.language === LANGUAGES.VI ? genderVi : genderEn}</td>
                                                    <td>{item.patientData ? item.patientData.address: ''}</td>
                                                    <td>{this.props.language === LANGUAGES.VI ? timeVi : timeEn}</td>
                                                    <td>
                                                        <button onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td colSpan='6' style={{textAlign: 'center'}}>Bác sĩ không có lịch khám bệnh nào!!!</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <RemedyModal isOpen={this.state.isOpenModal} closeRemedyModal={this.closeRemedyModal} dataFromParent={this.state.dataRemedyModal} sendRemedy={this.sendRemedy}/>
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
