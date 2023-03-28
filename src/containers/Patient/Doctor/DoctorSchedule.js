import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import lacalization from 'moment/locale/vi'; //sd moment dưới dạng tiếng việt

import './DoctorSchedule.scss'; 
import { fetchScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { BookingModal } from '../Modal';
import _ from 'lodash';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: {},
            allDaysSelectOption: [],
            allScheduleDoctorTime: '',
            selectedSchedule: {},
            isShowBookingModal: false
        }
    }

    componentDidMount() {
        let allDaysOfWeek = this.getAllDaysOfWeek();
        this.setState({
            allDaysSelectOption: allDaysOfWeek,
            selectedDay: allDaysOfWeek[0]
        });
    }

    async componentDidUpdate(preProps, prevState, snapshot){
        if (preProps.language !== this.props.language) {
            let allDaysOfWeek = this.getAllDaysOfWeek();
            this.setState({
                allDaysSelectOption: allDaysOfWeek,
                selectedDay : allDaysOfWeek.find(item => item.value === this.state.selectedDay.value)
            })
        }

        if (preProps.currentDoctorId !== this.props.currentDoctorId) {
            if (this.state.selectedDay && !_.isEmpty(this.state.selectedDay)) {
                let res = await fetchScheduleDoctorByDate(this.props.currentDoctorId, this.state.selectedDay.value);
                if (res && res.errCode === 0) {
                    this.setState({
                        allScheduleDoctorTime: res.data
                    })
                }
            }
        }

        if (prevState.selectedDay !== this.state.selectedDay) {
            let res = await fetchScheduleDoctorByDate(this.props.currentDoctorId, this.state.selectedDay.value);
            if (res && res.errCode === 0) {
                this.setState({
                    allScheduleDoctorTime: res.data
                })
            }
        }
    }

    getAllDaysOfWeek() {
        let allDaysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            obj.label = LANGUAGES.VI === this.props.language ? moment(new Date()).add(i, 'days').format('dddd - DD/MM') : moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDaysOfWeek.push(obj);
        }

        // Change name of current Day label
        if (LANGUAGES.VI === this.props.language) {
            allDaysOfWeek[0].label = "Hôm nay " + allDaysOfWeek[0].label.slice(allDaysOfWeek[0].label.indexOf('-'))
        } else allDaysOfWeek[0].label = "Today " + allDaysOfWeek[0].label.slice(allDaysOfWeek[0].label.indexOf('-'))
        return allDaysOfWeek;
    }

    handleChangeDate = (selectedDay) => {
        this.setState({
            selectedDay: selectedDay
        })
    }

    handleClickScheduleBtn = (time) => {
        this.setState({
            selectedSchedule: time ? time : {}
        })
        this.toggleBookingModal();
    }

    toggleBookingModal = () => {
        this.setState({
            isShowBookingModal: !this.state.isShowBookingModal
        })
    }


    render() {
        let { allDaysSelectOption, allScheduleDoctorTime, selectedDay, isShowBookingModal } = this.state;
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <Select
                            className='form-select-schedule'
                            value={selectedDay}
                            options={allDaysSelectOption}
                            onChange = {this.handleChangeDate}
                        />
                    </div>
                    <div className='all-variable-time_header'>
                        <i className="fas fa-calendar-alt"></i>
                        <FormattedMessage id='patient.detail-doctor.schedule' />
                    </div>
                    <div className='all-variable-time'>
                        {
                            allScheduleDoctorTime && allScheduleDoctorTime.length > 0 ?
                            (   <>
                                {allScheduleDoctorTime.map((item, index) => {
                                    let scheduleVi = item.Allcode && item.Allcode.valueVi ? item.Allcode.valueVi : '';
                                    let scheduleEn = item.Allcode && item.Allcode.valueEn ? item.Allcode.valueEn : '';
                                    return (
                                        <div 
                                            className="btn btn-doctor-schedule-item" key={index} 
                                            onClick={() => this.handleClickScheduleBtn(item)}
                                        >
                                            {this.props.language === LANGUAGES.VI ? scheduleVi: scheduleEn}
                                        </div>
                                    )
                                })}
                                <div className='book-free'><i className="far fa-hand-point-up"></i><FormattedMessage id='patient.detail-doctor.book-free' /></div>
                                </>
                            ): <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                        }
                    </div>
                </div>
                <BookingModal
                    toggleFromParent={this.toggleBookingModal}
                    isOpen = {isShowBookingModal}
                    data = {{
                            doctorId: this.props.currentDoctorId,
                            time: this.state.selectedSchedule,
                            date: this.state.selectedDay,
                        }}
                    
                />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
