import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };

        return (
            <div className='section-common section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='title-section'>Chuyên khoa phổ biến</h2>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 7</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-img specialty-img'></div>
                                <div className='section-title'>Cơ xương khớp 8</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
