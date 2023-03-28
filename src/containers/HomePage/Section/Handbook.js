import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Handbook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
          };

        return (
            <div className='section-common section-handbook'>
                <div className='section-container-homepage'>
                    <div className='section-header'>
                        <h2 className='title-section'><FormattedMessage id="homepage.handbook"/></h2>
                        <button className='btn-section'><FormattedMessage id="homepage.all-posts"/></button>
                    </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        <div className='section-customize'>
                            <div className='bg-img handbook-img'></div>
                            <div className='section-title'>
                            5 Địa chỉ Niềng răng mắc cài kim loại uy tín Hà Nội
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-img handbook-img'></div>
                            <div className='section-title'>
                            5 Bác sĩ niềng răng giỏi trên 10 năm kinh nghiệm tại Hà Nội
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
