import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            selectedOption: []
        }
    }

    componentDidMount() {
        this.props.getAllDoctorsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctorsRedux !== this.props.allDoctorsRedux || prevProps.language !== this.props.language) {
            this.setState({
                selectedOption: this.buildDataInputSelectDoctor(this.props.allDoctorsRedux)
            })
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
      };

    handleChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    buildDataInputSelectDoctor = (dataInput) =>  {
        let result = [];
        if (dataInput && dataInput.length > 0) {
            result = dataInput.map((item, index) => {
                let value = item.id;
                let label = this.props.language === LANGUAGES.VI ? `${item.firstName} ${item.lastName}`: `${item.lastName} ${item.firstName}`;
                return {
                    value,
                    label
                }
            })
        }
        return result;
    }

    handleSaveContentMarkdown = () => {
      this.props.saveInforDoctorRedux({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
      });
    //   this.setState({
    //     contentMarkdown: '',
    //     contentHTML: '',
    //     description: '',
    //     selectedDoctor: '',
    //   })
  }

    render() {
        let { description, selectedDoctor } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn Bác sĩ</label>
                        <Select
                            className='form-select-doctor'
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.selectedOption}
                        />
                    </div>
                    <div className='content-right'>
                        <label htmlFor='more-infor' className='more-title'>Thông tin giới thiệu</label>
                        <textarea 
                            id='more-infor' 
                            rows='4' 
                            value={description} 
                            className='form-control'
                            onChange={(e)=> this.handleChangeDesc(e)}
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
                <button className='btn btn-primary save-content-doctor' onClick={() => this.handleSaveContentMarkdown()}>Lưu thông tin</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveInforDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
