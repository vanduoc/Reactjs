import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { fetchOldDoctorExtraInfo } from '../../../services/userService'

import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { FormattedNumber } from '../../../components/Formating';
import _ from 'lodash';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            selectedOption: [],
            hasOldData: false,

            // save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            AllListClinic: [],
            listClinic: [],
            selectedClinic: '',
            listSpecialty: [],
            selectedSpecialty: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fethcAllRequiredDoctorDataRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                selectedOption: this.buildDataInputSelect(this.props.allDoctorsRedux, "USER")
            })
        }
        if (this.state.selectedDoctor !== prevState.selectedDoctor) {
            let selectedDoctorId = this.state.selectedDoctor.value;
            let res = await fetchOldDoctorExtraInfo(selectedDoctorId);
            if (res && res.errCode === 0 && res.data && res.data.Doctor_infor && res.data.Markdown) {
                this.rederHadOldData(res.data);
            } else {
                this.setState({
                    hasOldData: false,
                    contentMarkdown: '',
                    contentHTML: '',
                    description: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    selectedClinic: '',
                    selectedSpecialty: '',
                    note: ''
                })
            }
        }
        if(prevProps.allRequiredDoctorInforRedux !== this.props.allRequiredDoctorInforRedux) {
            let {listPrice, listPayment, listProvince, listSpecialty, listClinic} = this.props.allRequiredDoctorInforRedux;
            let dataSelectedPrice = this.buildDataInputSelect(listPrice, "PRICE");
            let dataSelectedPayment = this.buildDataInputSelect(listPayment);
            let dataSelectProvince = this.buildDataInputSelect(listProvince);
            let dataSelectSpecialty = this.buildDataInputSelect(listSpecialty, "OTHER");
            let dataSelectedClinic = this.buildDataInputSelect(listClinic, "CLINIC");
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                AllListClinic: dataSelectedClinic,
                listClinic: dataSelectedClinic
            })
        }
        if (prevState.selectedProvince !== this.state.selectedProvince) {
            if (!_.isEmpty(this.state.selectedProvince)) {
                let currentProvinceId = this.state.selectedProvince.value;
                let dataSelectedClinic = this.state.AllListClinic;
                let newListClinic = dataSelectedClinic && dataSelectedClinic.length > 0 ? dataSelectedClinic.filter(item => item.provinceId === currentProvinceId) : '';
                if (this.state.selectedClinic && this.state.selectedClinic.provinceId !== currentProvinceId) {
                    this.setState({
                        listClinic: newListClinic,
                        selectedClinic: ''
                    })
                } else {
                    this.setState({
                        listClinic: newListClinic
                    })
                }
            }
        }
        if (prevState.selectedClinic !== this.state.selectedClinic) {
            if (!_.isEmpty(this.state.selectedClinic) && _.isEmpty(this.state.selectedProvince)) {
                let provinceOfSelectedClinic = this.state.selectedClinic.provinceId;
                if (provinceOfSelectedClinic !== this.state.selectedProvince.value) {
                    let {listProvince} = this.state;
                    let newSelectedProvince = listProvince && listProvince.length > 0 ? listProvince.find(item => item.value === provinceOfSelectedClinic) : '';
                    this.setState({
                        selectedProvince: newSelectedProvince
                    })
                } else return;
                
            }
            
        }
        if (prevProps.language !== this.props.language) {
            if (!_.isEmpty(this.props.allRequiredDoctorInforRedux)) {
                
                let {listPrice, listPayment, listProvince} = this.props.allRequiredDoctorInforRedux;
                let { selectedDoctor, selectedPrice, selectedPayment, selectedProvince} = this.state;
                
                let listDoctors = this.buildDataInputSelect(this.props.allDoctorsRedux, "USER");
                let dataSelectedPrice = this.buildDataInputSelect(listPrice, "PRICE");
                let dataSelectedPayment = this.buildDataInputSelect(listPayment);
                let dataSelectProvince = this.buildDataInputSelect(listProvince);

                selectedDoctor = selectedDoctor ? listDoctors[listDoctors.findIndex(item => item.value === selectedDoctor.value)] : '';
                selectedPrice = selectedPrice ? dataSelectedPrice[dataSelectedPrice.findIndex(item => item.value === selectedPrice.value)] : '';
                selectedPayment = selectedPayment ? dataSelectedPayment[dataSelectedPayment.findIndex(item => item.value === selectedPayment.value)] : '';
                selectedProvince = selectedProvince ? dataSelectProvince[dataSelectProvince.findIndex(item => item.value === selectedProvince.value)] : '';

                this.setState({
                    selectedOption: listDoctors,
                    listPrice: dataSelectedPrice,
                    listPayment: dataSelectedPayment,
                    listProvince: dataSelectProvince,
                    selectedDoctor: selectedDoctor,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                })
            }
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChangeSelect = (selected, name) => {
        let stateName = name.name;
        this.setState({ [stateName]: selected });
      };

    handleChangeTextInput = (e, name) => {
        let stateName = name;
        this.setState({
            [stateName]: e.target.value
        })
    }

    buildDataInputSelect = (dataInput, type) =>  {
        let result = [];
        if (dataInput && dataInput.length > 0) {
            result = dataInput.map((item, index) => {
                let label = '';
                let value = type === 'USER' || type === 'OTHER' || type === 'CLINIC' ? '' + item.id: item.keyMap;
                if (type === "CLINIC") {
                    label = item.name;
                    let provinceId =  item.provinceId;
                    return {
                        value, 
                        label, 
                        provinceId : provinceId ? provinceId : ''
                    }
                } else
                    if (type ==='USER') {
                        label = this.props.language === LANGUAGES.VI ? `${item.firstName} ${item.lastName}`: `${item.lastName} ${item.firstName}`;
                } else
                    if (type ==="PRICE") {
                        label = this.props.language === LANGUAGES.VI ? FormattedNumber(item.valueVi) + ' VNĐ' : item.valueEn + ' $';
                } else 
                    if(type ==="OTHER"){ 
                        label = item.name;
                } else { 
                    label = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                } 
                return {
                    value,
                    label
                }
            })
        }
        return result;
    }

    rederHadOldData = (doctorData) => {
        let { listPrice, listPayment, listProvince, AllListClinic, listSpecialty} = this.state;
        let selectedPriceValue = doctorData.Doctor_infor && doctorData.Doctor_infor.priceId ? doctorData.Doctor_infor.priceId : '' ;
        let selectedPaymentValue = doctorData.Doctor_infor && doctorData.Doctor_infor.paymentId ? doctorData.Doctor_infor.paymentId : '' ;
        let selectedProvinceValue = doctorData.Doctor_infor && doctorData.Doctor_infor.provinceId ? doctorData.Doctor_infor.provinceId : '' ;
        let selectedClinicValue = doctorData.Doctor_infor ? doctorData.Doctor_infor.clinicId : '';
        let selectedSpecialtyValue = doctorData.Doctor_infor ? doctorData.Doctor_infor.specialtyId : '';
        let selectedPrice = '';
        let selectedPayment = '';
        let selectedProvince = '';
        let selectedClinic = '';
        let selectedSpecialty = '';

        if (selectedPaymentValue && selectedPriceValue && selectedProvinceValue && selectedClinicValue && selectedSpecialtyValue) {
            selectedPrice = listPrice[listPrice.findIndex(item => item.value === selectedPriceValue)];
            selectedPayment = listPayment[listPayment.findIndex(item => item.value === selectedPaymentValue)];
            selectedProvince = listProvince[listProvince.findIndex(item => item.value === selectedProvinceValue)];
            selectedClinic = AllListClinic[AllListClinic.findIndex(item => item.value === selectedClinicValue)];
            selectedSpecialty = listSpecialty[listSpecialty.findIndex(item => item.value === selectedSpecialtyValue)];
        }
                
        let note = doctorData.Doctor_infor && doctorData.Doctor_infor.note ? doctorData.Doctor_infor.note : '';
        let description = doctorData.Markdown ? doctorData.Markdown.description : '';
        let contentHTML = doctorData.Markdown ? doctorData.Markdown.contentHTML : '';
        let contentMarkdown = doctorData.Markdown ? doctorData.Markdown.contentMarkdown : '';
        this.setState({
            hasOldData: true,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedClinic,
            selectedSpecialty,
            description,
            note,
            contentHTML,
            contentMarkdown,
        })
    }

    handleSaveContentMarkdown = async() => {
      let isSuccess = await this.props.saveInforDoctorRedux({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
        priceId: this.state.selectedPrice.value,
        paymentId: this.state.selectedPayment.value,
        provinceId: this.state.selectedProvince.value,
        clinicId: this.state.selectedClinic.value,
        specialtyId: this.state.selectedSpecialty.value,
        note:this.state.note,
        action: this.state.hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
      });
      if (isSuccess) {
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            selectedClinic: '',
            selectedSpecialty: '',
            hasOldData: false,

            // save to doctor_infor table
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            note: ''
        })
    }
  }

    render() {

        let { description, selectedDoctor, listPayment, listPrice, 
            listProvince, selectedOption, selectedPrice, selectedPayment,
             selectedProvince, note } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            className='form-select-doctor'
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={selectedOption}
                            name='selectedDoctor'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='content-right'>
                        <label htmlFor='more-infor' className='more-title'>
                            <FormattedMessage id='admin.manage-doctor.introductory' />
                        </label>
                        <textarea 
                            id='more-infor' 
                            rows='4' 
                            value={description} 
                            className='form-control'
                            onChange={(e)=> this.handleChangeTextInput(e, "description")}
                            >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row mt-3'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.price'/></label>
                        <Select
                            className='form-select-doctor'
                            value={selectedPrice}
                            onChange={this.handleChangeSelect}
                            options={listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price'/>}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment'/></label>
                        <Select
                            className='form-select-doctor'
                            value={selectedPayment}
                            onChange={this.handleChangeSelect}
                            options={listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment'/>}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.province'/></label>
                        <Select
                            className='form-select-doctor'
                            value={selectedProvince}
                            onChange={this.handleChangeSelect}
                            options={listProvince}
                            name="selectedProvince"
                            placeholder={<FormattedMessage id='admin.manage-doctor.province'/>}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-clinic'/></label>
                        <Select
                            // className='form-select-doctor'
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelect}
                            options={this.state.listClinic}
                            name="selectedClinic"
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-clinic'/>}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-specialty'/></label>
                        <Select
                            className=''
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelect}
                            options={this.state.listSpecialty}
                            name="selectedSpecialty"
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-specialty'/>}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id='admin.manage-doctor.note'/></label>
                        <textarea className='form-control'
                            onChange={(e)=> this.handleChangeTextInput(e, "note")}
                            value = {note}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        className='mt-4'
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className='btn btn-primary save-content-doctor' onClick={() => this.handleSaveContentMarkdown()}>
                    {
                        this.state.hasOldData ? 
                        <span><FormattedMessage id='admin.manage-doctor.save'/></span>
                        :
                        <span><FormattedMessage id='admin.manage-doctor.add' /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        // currentDoctorRedux: state.admin.currentDoctor,
        allDoctorsRedux: state.admin.doctors,
        allRequiredDoctorInforRedux: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fethcAllRequiredDoctorDataRedux: () => dispatch(actions.fetchRequiredDoctorInfor()),
        // fetchInforDoctorByIdRedux: (id) => dispatch(actions.fetchInforDoctorById(id)),
        saveInforDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
