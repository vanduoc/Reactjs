import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { fetchAllClinic } from '../../../services/userService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';


class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state= {
            allClinics: []
        }
    }
    async componentDidMount() {
        let res = await fetchAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                allClinics: res.data
            })
        }
    }
    componentDidUpdate(preProps, prevState, snapshot) {
    }

    render() {
        let { allClinics } = this.state;
        console.log(allClinics);
        return (
            <div className='section-common section-medical-facility'>
                <div className='section-container-homepage'>
                    <div className='section-header'>
                        <h2 className='title-section'><FormattedMessage id='homepage.medical-facility'/></h2>
                        <button className='btn-section'><FormattedMessage id='homepage.search' /></button>
                    </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>

                        {
                            allClinics && allClinics.length > 0 ? allClinics.map((item, index) => {
                                let imageBase64 ='';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image)
                                    }
                                return (
                                    <Link to={`/detail-clinic/${item.id}`} className='section-customize' key={index}>
                                        <div className='bg-img medical-facility-img' style={{backgroundImage: `url(${imageBase64})`}}></div>
                                        <div className='section-title'>{item.name}</div>
                                    </Link>
                                )
                            }) : ''
                            
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
