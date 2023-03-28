import React, { Component } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import './ManageSpecialty.scss';
import { createNewSpecialty } from '../../../services/userService';
import { CommonUtils} from '../../../utils';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentMarkdown: '',
            contentHTML: '',
            selectedFile: ''
        }

        this.inputFileRef = React.createRef(null);
    }

    async componentDidMount() {
    }

    componentDidUpdate(preProps, prevState, snapshot){
        
    }

    handleChangeImage = async (e) => {
        let files = e.target.files;
        if(files.length > 0) {
            let file = files[0];
            console.log(file);
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

    handleClickSubmitBtn = async() => {
        let res = await createNewSpecialty({
            name: this.state.name,
            descriptionMarkdown: this.state.contentMarkdown,
            descriptionHTML: this.state.contentHTML,
            image: this.state.imageBase64
        });
        if (res && res.errCode === 0) {
            toast.success(res.message);
            this.setState({
                name: '',
                imageBase64: '',
                contentMarkdown: '',
                contentHTML: '',
            });
            this.inputFileRef.current.value = null;
        } else {
            toast.error(res.message);
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={e => this.handleChangeInput(e, 'name')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='input-label' htmlFor='input-specialty-image'>Ảnh chuyên khoa</label>
                        <input 
                            id='input-specialty-image'
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
                        className='btn-save-specialty'
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
