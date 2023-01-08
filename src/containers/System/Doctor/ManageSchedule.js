import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import './ManageShedule.scss'

class ManageShedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDoctor: '',
            selectedOption: [],
            allScheduleTime: [],
            currentData: new Date()
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
            this.setState({
                allScheduleTime: this.props.allScheduleTimeRedux
            })
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
            currentData: date[0]
        })
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
                                        return <button className='btn btn-schedule-time' key={index}>
                                                    {language && language === LANGUAGES.VI ? `${item.valueVi}`: `${item.valueEn}`}
                                                </button>
                                    })
                                }
                            </div>
                        </div>
                        <button className='btn btn-primary btn-save-schedule-time'><FormattedMessage id='manage-schedule.save'/></button>
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
