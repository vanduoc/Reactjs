import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from "../../../utils";
import './BookingModal.scss'
import * as actions from '../../../store/actions';
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DatePicker from "../../../components/Input/DatePicker";
import Select from 'react-select';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { postPatientBookingAppointment } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromParent: {},
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthDay: '',
            genderSelectOption: '',
            selectedGender: '',
            reason: '',
        }
    }

    componentDidMount() {
        if (this.props.data)
            this.setState({
                dataFromParent: this.props.data
            })
        this.props.getGenderRedux();
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.data !== this.props.data) {
            this.setState({
                dataFromParent: this.props.data
            })
        }

        if (preProps.genders !== this.props.genders) {
            this.setState({
                genderSelectOption: this.renderGenderData(this.props.genders)
            })
        }

        if (preProps.language !== this.props.language) {
            this.setState({
                genderSelectOption: this.renderGenderData(this.props.genders)
            })
        }
    }

    toggle = () => {
        if (typeof this.props.toggleFromParent === 'function')
        this.props.toggleFromParent();
    }

    handleChangeInput = (e, id) => {
        this.setState({
            [id]: e.target.value
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }

    handleChangeGender = (selectedGender) => {
        this.setState({
            selectedGender: selectedGender
        })
    }

    renderGenderData = (data) => {
        let result = [];
        if (data && data.length > 0) {
            result = data.map(item => {
                let object = {};
                object.value = item.keyMap;
                object.label = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                return object
            })
        }
        return result;
    }
    renderDoctorName = (data) => {
        if (data && data.doctorName ) {
            let name = LANGUAGES.VI === this.props.language ? data.doctorName.firstName + ' ' + data.doctorName.lastName : data.doctorName.lastName + ' ' + data.doctorName.firstName;
            return name
        }
        return '';
    }

    handleClickSubmit = async () => {
        let birthDay = new Date(this.state.birthDay).getTime();
        let timeString = this.renderTimeBooking(this.state.dataFromParent);
        let doctorName = this.renderDoctorName(this.state.dataFromParent);
    
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            birthDay: birthDay,
            gender: this.state.selectedGender.value,
            reason: this.state.reason,
            doctorId: this.state.dataFromParent ? this.state.dataFromParent.doctorId : '',
            date: this.state.dataFromParent && this.state.dataFromParent.date ? this.state.dataFromParent.date.value : '',
            timeType: this.state.dataFromParent && this.state.dataFromParent.time ? this.state.dataFromParent.time.timeType : '',
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment Success!");
        }
        else {
            toast.error("Booking a new appointment Error!");
        }
    }

    renderTimeBooking = (inputData) => {
        let {language} = this.props
        if (inputData && !_.isEmpty(inputData)) {
            let timeVi = inputData.time && inputData.time.Allcode ? inputData.time.Allcode.valueVi : '';
            let timeEn = inputData.time && inputData.time.Allcode ? inputData.time.Allcode.valueEn : '';
            let date = inputData.date ? inputData.date.label: '';
            return language === LANGUAGES.VI ? `${timeVi} - ${date}` : `${timeEn} - ${date}`
        }
        return '';
    }

    render () {
        let { dataFromParent } = this.state;
        let doctorId = dataFromParent && dataFromParent.doctorId ? dataFromParent.doctorId : '' ;
        
        return ( 
            <Modal 
                size='lg' 
                isOpen={this.props.isOpen} 
                toggle={this.toggle} 
                className={'modal-booking-container'}
                centered
            >
                <ModalHeader toggle={this.toggle} className="modal-booking-header"><FormattedMessage id="patient.booking-modal.title"/></ModalHeader>
                <ModalBody>
                    <div className="modal-booking-content row">
                        <ProfileDoctor doctorId={doctorId} isShowDescriptionDoctor={true} isShowPrice/>
                        <div className="booking-time">{this.renderTimeBooking(this.state.dataFromParent)}</div>
                        <div className="modal-booking-body">
                            <div className="form-group col-6 pr-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.fullName"/></label>
                                <input 
                                    className="form-control" 
                                    placeholder="Nhập họ và tên..."
                                    value={this.state.fullName}
                                    onChange={e => this.handleChangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className="form-group col-6 pl-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.phoneNumber"/></label>
                                <input 
                                    className="form-control" 
                                    placeholder="039 xxxx xxx"
                                    value={this.state.phoneNumber}
                                    onChange={e => this.handleChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="form-group col-6 pr-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.email"/></label>
                                <input 
                                    className="form-control" 
                                    placeholder="Nhập email..."
                                    value={this.state.email}
                                    onChange={e => this.handleChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="form-group col-6 pl-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.address"/></label>
                                <input 
                                    className="form-control" 
                                    placeholder="tên đường, xã/thị trấn..."
                                    value={this.state.address}
                                    onChange={e => this.handleChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="form-group col-6 pr-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                />
                            </div>
                            <div className="form-group col-6 pl-10">
                                <label className=""><FormattedMessage id="patient.booking-modal.gender"/></label>
                                <Select
                                    value={this.state.selectedGender}
                                    options={this.state.genderSelectOption}
                                    onChange = {this.handleChangeGender}
                                />
                            </div>
                            <div className="note-reason form-group col-12">
                                <label className=""><FormattedMessage id="patient.booking-modal.reason"/></label>
                                <textarea
                                    className="form-control"
                                    onChange={(e) => this.handleChangeInput(e, 'reason')}
                                >
                                </textarea>
                            </div>

                        </div>
                    </div>
                </ModalBody> 
                <ModalFooter>
                <Button 
                    color="primary" 
                    className='px-3'
                    onClick={this.handleClickSubmit}
                >
                    <FormattedMessage id="patient.booking-modal.btnConfirm"/>
                </Button>{' '}
                <Button color="secondary" className='px-3' onClick={this.toggle}>
                <FormattedMessage id="patient.booking-modal.close"/>
                </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderStart())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)