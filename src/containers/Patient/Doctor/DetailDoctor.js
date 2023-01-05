import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
// import { getDetailDoctor } from '../../../services/userService';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let res = await getDetailDoctor(this.props.match.params.id);
        //     console.log(res);
        // }
    }

    componentDidUpdate(preProps, prevState, snapshot){

    }

    render() {
        return (
            <React.Fragment>
                <HomeHeader />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>

                        </div>
                        <div className='content-right'>
                            <h3 className='doctor-name'>Bác sĩ Chuyên khoa II Lê Văn Tùng</h3>
                            <p className='doctor-describe'>Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh
                            Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris)
                            Bác sĩ nhận khám từ 16 tuổi trở lên
                            </p>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>

                    </div>
                    <div className='comment-about-doctor'></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
