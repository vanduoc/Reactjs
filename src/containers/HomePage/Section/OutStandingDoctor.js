import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';



class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctorHomeRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorHomeRedux !== this.props.topDoctorHomeRedux) {
            this.setState({
                topDoctors: this.props.topDoctorHomeRedux
            })
        }
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
          let topDoctors = this.state.topDoctors;
        console.log('topdoctorHome: ',topDoctors);

        return (
            <div className='section-common section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='title-section'>Bác sĩ nổi bật tuần qua</h2>
                        <button className='btn-section'>tìm kiếm</button>
                    </div>
                <div className='section-body'>
                    <Slider {...settings}>
                            { topDoctors && topDoctors.length > 0 && topDoctors.map((doctor, index) => {
                                let nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName}`
                                let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`
                                let imageBase64 ='';
                                if (doctor.image) {
                                    imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='border-customize' >
                                            <div className='outer-bg'>
                                                <div className='bg-img outstanding-doctor-img' style={{backgroundImage: `url(${imageBase64})`}}></div>
                                                <div className='section-title text-center'>
                                                    <h3>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                                                    <span className='doctor-special'>Da liễu</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </Slider>
                </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorHomeRedux: state.admin.topDoctorHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctorHomeRedux: () => dispatch(actions.fetchTopDoctorHome())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
