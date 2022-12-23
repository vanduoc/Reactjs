import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class OutStandingDoctor extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };

        return (
            <div className='section-common section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <h2 className='title-section'>Bác sĩ nổi bật tuần qua</h2>
                        <button className='btn-section'>tìm kiếm</button>
                    </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Lê Thị Tuyết Lan</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Cơ xương khớp 5</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Cơ xương khớp 6</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Cơ xương khớp 7</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='border-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-img outstanding-doctor-img'></div>
                                        <div className='section-title text-center'>
                                            <h3>Cơ xương khớp 8</h3>
                                            <span className='doctor-special'>Da liễu</span>
                                        </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
