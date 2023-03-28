import React, { Component } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import Select from 'react-select';
import './ManageClinic.scss';
import { createNewClinic } from '../../../services/userService';
import { CommonUtils} from '../../../utils';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentMarkdown: '',
            contentHTML: '',
            provinceOption: [],
            provinceSelectedOption: [],
            selectedProvince: '',
            address: ''
        }

        this.inputFileRef = React.createRef(null);
    }

    async componentDidMount() {
        let provinceData = await getAllCodeService('PROVINCE');
        if (provinceData && provinceData.errCode === 0) {
            let provinceOption = provinceData.data;
            let provinceSelectedOption = this.renderProvinceOption(provinceOption);
            this.setState({
                provinceOption: provinceOption,
                provinceSelectedOption: provinceSelectedOption
            })
        }
    }

    componentDidUpdate(preProps, prevState, snapshot){
        
    }

    renderProvinceOption(arr) {
        let result = [];
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

    handleChangeImage = async (e) => {
        let files = e.target.files;
        if(files.length > 0) {
            let file = files[0];
            let fileToBase64 = await CommonUtils.convertFileToBase64(file);
            this.setState({
                imageBase64: fileToBase64,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChangeInput = (e, id) => {
        this.setState({
            [id]: e.target.value
        })
    }

    handleChangeProvince = (selected) => {
        this.setState({
            selectedProvince: selected
        })
    }

    handleClickSubmitBtn = async() => {
        let res = await createNewClinic({
            name: this.state.name,
            descriptionMarkdown: this.state.contentMarkdown,
            descriptionHTML: this.state.contentHTML,
            image: this.state.imageBase64,
            provinceId: this.state.selectedProvince ? this.state.selectedProvince.value: '',
            address: this.state.address
        });
        if (res && res.errCode === 0) {
            toast.success(res.message);
            this.setState({
                name: '',
                imageBase64: '',
                contentMarkdown: '',
                contentHTML: '',
                selectedProvince: '',
                address: ''
            });
            this.inputFileRef.current.value = null;
        } else {
            toast.error(res.message);
        }
    }

    render() {
        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={e => this.handleChangeInput(e, 'name')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.address}
                            onChange={e => this.handleChangeInput(e, 'address')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Khu vực</label>
                        <Select
                            className='form-select-schedule'
                            value={this.state.selectedProvince}
                            options={this.state.provinceSelectedOption}
                            onChange = {this.handleChangeProvince}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='input-label' htmlFor='input-clinic-image'>Ảnh phòng khám</label>
                        <input 
                            id='input-clinic-image'
                            className='form-control-file'
                            type='file'
                            ref={this.inputFileRef}
                            onChange={e => this.handleChangeImage(e)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                            className='mt-4'
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            value={this.state.contentMarkdown}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                </div>
                <div className='col-12'>
                    <button
                        className='btn-save-clinic'
                        onClick={this.handleClickSubmitBtn}
                    >
                        Save
                    </button>
                </div>
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
