import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import HomeHeader from '../../HomePage/HomeHeader.js'
import PreviewDoctor from '../Doctor/PreviewDoctor.js';
import './DetailSpecialty.scss'
import { getAllCodeService } from '../../../services/userService.js';
import { fetchDetailSpecialty } from '../../../services/userService.js';
import { LANGUAGES } from '../../../utils/constant.js';
import * as actions from '../../../store/actions'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceOption: [],
            provinceSelectedOption: [],
            selectedProvince: '',
            allSpecialtyDoctor: [],
            listSpecialtyDoctor: [],
            currentSpecialtyData: {},
            isShowMoreDetailSpecialty: false,
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorRedux();
        let provinceData = await getAllCodeService('PROVINCE');
        if (provinceData && provinceData.errCode === 0) {
            let provinceOption = provinceData.data;
            let provinceSelectedOption = this.renderProvinceOption(provinceOption);
            this.setState({
                provinceSelectedOption: provinceSelectedOption,
                provinceOption: provinceOption,
                selectedProvince: provinceSelectedOption[0]
            })
        }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let detailSpecialty = await fetchDetailSpecialty(this.props.match.params.id);
            let allSpecialtyDoctor = detailSpecialty && detailSpecialty.data && detailSpecialty.data.doctorData ? detailSpecialty.data.doctorData : [];

            if (detailSpecialty && detailSpecialty.errCode === 0) {
                this.setState({
                    currentSpecialtyData: detailSpecialty.data,
                    allSpecialtyDoctor: allSpecialtyDoctor,
                    listSpecialtyDoctor: allSpecialtyDoctor
                })
            }
        }
    }

    renderProvinceOption(arr) {
        let result = LANGUAGES.VI === this.props.language ? [{label: 'Toàn quốc', value: '0'}] : [{label: 'Nationwide', value: '0'}];
        if (arr && arr.length > 0) {
            let res = arr.map(item => {
                let object = {};
                object.label = LANGUAGES.VI === this.props.language ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                return object;
            });
            result = [...result, ...res];
        }
        return result;
    }

    componentDidUpdate(preProps, prevState, snapshot){
        if (preProps.language !== this.props.language) {
            let provinceSelectedOption = this.renderProvinceOption(this.state.provinceOption);
            this.setState({
                provinceSelectedOption: provinceSelectedOption,
            })
        }

        if (prevState.selectedProvince !== this.state.selectedProvince) {
            let listSpecialtyDoctor = [];
            if (this.state.selectedProvince && this.state.selectedProvince.value === '0') {
                listSpecialtyDoctor = this.state.allSpecialtyDoctor;
            } else {
                listSpecialtyDoctor = this.state.allSpecialtyDoctor ? this.state.allSpecialtyDoctor.filter(item => item.provinceId === this.state.selectedProvince.value): [];
            }
            this.setState({
                listSpecialtyDoctor
            })
        }
    }

    handleShowMoreDetaileSpecialty = (value) => {
        this.setState({
            isShowMoreDetailSpecialty: value
        })
    }

    handleChangeSelectedProvince = (selected) => {
        this.setState({
            selectedProvince: selected
        })
    }

    render() {
        let { selectedProvince, listSpecialtyDoctor, provinceSelectedOption, currentSpecialtyData, isShowMoreDetailSpecialty } = this.state;
        return (
            <>  
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-header' style={{background:`url(${currentSpecialtyData.image})`}}>
                        <div className='overlay'>
                            <div className='specialty-content' >
                                <div 
                                    className='intro-content' 
                                    dangerouslySetInnerHTML={{__html: currentSpecialtyData.descriptionHTML}}
                                    style={{'maxHeight': `${isShowMoreDetailSpecialty ? 'none' : '186px'}`}}
                                >
                                </div>
                                {
                                    !isShowMoreDetailSpecialty ? 
                                    <div className='read-more-btn' onClick={()=>this.handleShowMoreDetaileSpecialty(true)}>Đọc thêm</div>
                                    :
                                    <div className='read-litle-btn' onClick={()=>this.handleShowMoreDetaileSpecialty(false)}>Ẩn bớt</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='list-doctor-infor-container'>
                        <div className='wrapper-list-doctor-infor'>
                            <Select
                                className='filter-btn'
                                value={selectedProvince}
                                onChange={this.handleChangeSelectedProvince}
                                options={provinceSelectedOption}
                            />
                                {
                                    listSpecialtyDoctor && listSpecialtyDoctor.length> 0 ? 
                                    listSpecialtyDoctor.map((item, index) => {
                                        return (
                                        <div key={index} className='wrapper-doctor-infor-item'>
                                            <PreviewDoctor idFromParent={item.doctorId}/>
                                        </div>
                                        )
                                    }) : <div>Không tìm thấy bác sĩ nào ở tỉnh này</div>
                                }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
       fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
