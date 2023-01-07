import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions'
import './DetailDoctor.scss'
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.props.fetchInforDoctorByIdRedux(id)
        }
    }

    componentDidUpdate(preProps, prevState, snapshot){
        if (preProps.currentDoctorRedux !== this.props.currentDoctorRedux) {
            this.setState({
                currentDoctor: this.props.currentDoctorRedux
            })
        }
    }

    render() {
        console.log(this.state);
        let reviewImageURL = this.state.currentDoctor.image;
        let language = this.props.language;
        let {Markdown, positionData, firstName, lastName} = this.state.currentDoctor;
        let position = '';
        let name = '';
        if (firstName && lastName) {
            name = language === LANGUAGES.VI ? `${firstName} ${lastName}`: `${lastName} ${firstName}`;
        }
        if (positionData) {
            position = language === LANGUAGES.VI ? `${positionData.valueVi}`: `${positionData.valueEn}`;
        }
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ backgroundImage: `url(${reviewImageURL}`}}>
                        </div>
                        <div className='content-right'>
                            <h3 className='doctor-name'>{`${position} ${name}`}</h3>
                            <p className='doctor-describe'>{
                                Markdown ? `${Markdown.description}`: ''
                            }</p>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>
                    { Markdown ? <div dangerouslySetInnerHTML={{__html: Markdown.contentHTML}}></div>: ''}
                    </div>
                    <div className='comment-about-doctor'></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentDoctorRedux: state.admin.currentDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInforDoctorByIdRedux: (id) => dispatch(actions.fetchInforDoctorById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
