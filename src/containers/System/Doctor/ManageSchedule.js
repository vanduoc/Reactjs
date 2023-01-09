import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import './ManageShedule.scss'
import { saveBulkCreateSchedule } from '../../../services/userService';

class ManageShedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDoctor: '',
            selectedOption: '',
            allScheduleTime: '',
            currentDate: '',
        }
    }

    componentDidMount() {
        this.props.getAllDoctorsRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctorsRedux !== this.props.allDoctorsRedux || prevProps.language !== this.props.language) {
            this.setState({
                selectedOption: this.buildDataInputSelectDoctor(this.props.allDoctorsRedux)
            })
        }
        if(prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux) {
            let data = this.props.allScheduleTimeRedux;
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false;
                    return item;
                });
                this.setState({
                    allScheduleTime: data
                })
            }

        }
    }

    buildDataInputSelectDoctor = (dataInput) =>  {
        let result = [];
        if (dataInput && dataInput.length > 0) {
            result = dataInput.map((item, index) => {
                let value = item.id;
                let label = this.props.language === LANGUAGES.VI ? `${item.firstName} ${item.lastName}`: `${item.lastName} ${item.firstName}`;
                return {
                    value,
                    label
                }
            })
        }
        return result;
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
      };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
      }

    handleClickBtnTime = (time) => {
        let { allScheduleTime } = this.state;
        if (allScheduleTime && allScheduleTime.length > 0 && time) {
            allScheduleTime = allScheduleTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                allScheduleTime: allScheduleTime
            })
        }
      }

    handleSaveSchedule = async() => {
        let data = this.validateAndChangeDataSaved();
        if (data) {
            let res = await saveBulkCreateSchedule(data);
            console.log(res)
        }
    }

    validateAndChangeDataSaved = () => {
        let allScheduleTimeSelected = [];
        let data = '';
        let { allScheduleTime, selectedDoctor, currentDate} = this.state;
        if(!selectedDoctor) {
            alert('Invalid selected doctor!');
            return false;
        }
        if (!currentDate) {
            alert('Invalid date!');
            return false;
        }
        if (allScheduleTime && allScheduleTime.length > 0)
        {
            allScheduleTimeSelected = allScheduleTime.filter((item) => {return item.isSelected});
        }
        if(allScheduleTimeSelected && allScheduleTimeSelected.length > 0) {
            let formatedDate = new Date(currentDate).getTime();
            data = allScheduleTimeSelected.map(item => ({
                doctorId: selectedDoctor.value,
                timeType: item.keyMap,
                date: formatedDate,
            }))
        } else {
            alert('Invalid schedule time!');
            return false;
        }
        return data;
    } 

    render() {
        let { allScheduleTime } = this.state;
        let { language } = this.props;
        return (
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id='manage-schedule.title'/>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id='manage-schedule.choose-doctor'/>
                                </label>
                                <Select
                                    className='form-select-doctor'
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.selectedOption}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-schedule.choose-date'/></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {
                                    allScheduleTime && allScheduleTime.length > 0 && allScheduleTime.map((item, index) => {
                                        return <button 
                                                className={item.isSelected? `btn btn-schedule-time active`: 'btn btn-schedule-time'} 
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}
                                                >
                                                    {language && language === LANGUAGES.VI ? `${item.valueVi}`: `${item.valueEn}`}
                                                </button>
                                    })
                                }
                            </div>
                        </div>
                        <button 
                            className='btn btn-primary btn-save-schedule-time' 
                            onClick={this.handleSaveSchedule}
                        >
                        <FormattedMessage id='manage-schedule.save'/>
                        </button>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctorsRedux: state.admin.doctors,
        allScheduleTimeRedux: state.admin.allScheduleTime,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
