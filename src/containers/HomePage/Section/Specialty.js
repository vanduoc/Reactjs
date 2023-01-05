import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {
        return (
            <div className='section-common section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='title-section'><FormattedMessage id='homepage.popular-specialty'/></h2>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info'/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
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
