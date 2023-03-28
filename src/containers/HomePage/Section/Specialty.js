import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state= {
            specialties: []
        }
    }

    componentDidMount() {
        this.props.fetchAllSpecialtyRedux();
    }
    componentDidUpdate(preProps, prevState, snapshot) {
        if(this.props.specialties !== preProps.specialties) {
            this.setState({
                specialties: this.props.specialties
            })
        }
    }

    handleViewDetailSpecialty = (id) => {
        this.props.history.push(`/detail-specialty/${id}`)
    }

    render() {
        let { specialties } = this.state;
        return (
            <div className='section-common section-specialty'>
                <div className='section-container-homepage'>
                    <div className='section-header'>
                        <h2 className='title-section'><FormattedMessage id='homepage.popular-specialty'/></h2>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info'/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                specialties && specialties.length > 0 ?
                                specialties.map((item, index) => {
                                    let imageBase64 ='';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image)
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item.id)}>
                                            <div className='bg-img specialty-img' style={{backgroundImage: `url(${imageBase64})`}}></div>
                                            <div className='section-title'>{item.name}</div>
                                        </div>
                                    )
                                })
                                : ''
                            }
                            
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
        specialties: state.admin.specialties,
        currentDoctorRedux: state.admin.currentDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
