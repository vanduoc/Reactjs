import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LANGUAGES, CRUD_ACTIONS} from '../../../utils/constant';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import './UserRedux.scss'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            uploadImageUrl: '',
            isOpenLightbox: false,
            action: CRUD_ACTIONS.CREATE,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: ''
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.uploadImageUrl && prevState.uploadImageUrl !== this.state.uploadImageUrl) {
            URL.revokeObjectURL(prevState.uploadImageUrl);
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.UserRedux !== this.props.UserRedux) {
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                avatar: '',
                userEditId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleChangeImage = (e) => {
        let files = e.target.files;
        let file = files[0];
        let objectUrl = URL.createObjectURL(file);
        this.setState({
            uploadImageUrl: objectUrl,
            avatar: file
        })
    }

    checkValidateInput = (data) => {
        let ids = ["email", "password", "firstName", "lastName", "phoneNumber", "address", "gender", "positionId", "roleId"]
        for( let x of ids) {
            if (!data[x]) {
                alert('Missing parameter ' + x);
                return false;
            }
        }
        return true;
    }

    handleChangeInput = (e, inputName) => {
        this.setState({
            [inputName]: e.target.value
        })
    }

    handleEditUserFromParent = (user) => {
        let {email, address, firstName, lastName, phoneNumber, gender, avatar} = user;
        this.setState({
            email,
            password: 'HASHCODE',
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position: user.positionId,
            role: user.roleId,
            avatar,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        });
    }

    handleSaveUser = () => {
        let dataInput = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            positionId: this.state.position,
            roleId: this.state.role,
            avatar: this.state.avatar,
            id: this.state.userEditId
        }
        let isValid = this.checkValidateInput(dataInput);
        if (isValid) {
            if (this.state.action === CRUD_ACTIONS.CREATE)
                this.props.createNewUserRedux(dataInput);
            if (this.state.action === CRUD_ACTIONS.EDIT)
                this.props.editUserRedux(dataInput);
        }
        else return;
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let uploadImageUrl = this.state.uploadImageUrl;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar, action } = this.state;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRole = this.props.isLoadingRole;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage User By Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>{isLoadingGender || isLoadingPosition || isLoadingRole ? 'On Loading Data': ''}</div>
                            <div className='col-12'><h4 style={{'textTransform': 'uppercase'}}><FormattedMessage id='manage-user.add'/></h4></div>
                            <div className='col-3 form-group'>
                                <label htmlFor='email'><FormattedMessage id='manage-user.email'/></label>
                                <input id="email" value={email} disabled={action === CRUD_ACTIONS.CREATE ? false : true} onChange={(e) => this.handleChangeInput(e, 'email')} className='form-control' type='email' />
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor='password'><FormattedMessage id='manage-user.password'/></label>
                                <input id="password" disabled={action === CRUD_ACTIONS.CREATE ? false : true} value={password} onChange={(e) => this.handleChangeInput(e, 'password')} className='form-control' type='password' />
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor='firstName'><FormattedMessage id='manage-user.first-name'/></label>
                                <input id="firstName" value={firstName} onChange={(e) => this.handleChangeInput(e, 'firstName')} className='form-control' type='text' />
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor='lastName'><FormattedMessage id='manage-user.last-name'/></label>
                                <input id="lastName" value={lastName} onChange={(e) => this.handleChangeInput(e, 'lastName')} className='form-control' type='text' />
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor="phoneNumber"><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' value={phoneNumber} onChange={(e) => this.handleChangeInput(e, 'phoneNumber')} id='phoneNumber' type="text"/>
                            </div>
                            <div className='col-9 form-group'>
                                <label htmlFor="address"><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' value={address} onChange={(e) => this.handleChangeInput(e, 'address')} id='address' type="text" />
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor="gender"><FormattedMessage id='manage-user.gender'/></label>
                                <select id='gender' className='form-control' value={gender} onChange={(e) => this.handleChangeInput(e, 'gender')}>
                                    { genders && genders.length > 0 && genders.map((gender, index) => {
                                        return <option key={index} value={gender.key}>{language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor="postion"><FormattedMessage id='manage-user.position'/></label>
                                <select id='postion' className='form-control' value={position} onChange={(e) => this.handleChangeInput(e, 'position')}>
                                { positions && positions.length > 0 && positions.map((position, index) => {
                                        return <option key={index} value={position.key}>{language === LANGUAGES.VI ? position.valueVi : position.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor="role"><FormattedMessage id='manage-user.role'/></label>
                                <select id='role' className='form-control' value={role} onChange={(e) => this.handleChangeInput(e, 'role')}>
                                { roles && roles.length > 0 && roles.map((role, index) => {
                                        return <option key={index} value={role.key}>{language === LANGUAGES.VI ? role.valueVi : role.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label htmlFor="Image"><FormattedMessage id='manage-user.image'/></label>
                                <div className='preview-image-container'>
                                    <input type='file' id='previewImg' className='form-control' onChange={this.handleChangeImage} hidden/>
                                    <label htmlFor='previewImg' className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    {uploadImageUrl && <div className='preview-image' onClick={()=>{this.setState({isOpenLightbox: true});}} style={{backgroundImage: `url(${uploadImageUrl})`, cursor: 'pointer'}}></div>}
                                </div>  
                            </div>
                            {this.state.isOpenLightbox && 
                            <Lightbox
                                mainSrc={uploadImageUrl}
                                onCloseRequest={() =>{this.setState({ isOpenLightbox: false })}}
                            />}
                            <div className='col-12 mt-3'>
                                <button className={action === CRUD_ACTIONS.CREATE ? 'btn btn-primary': 'btn btn-warning'} onClick={this.handleSaveUser}>
                                    <FormattedMessage id={action === CRUD_ACTIONS.CREATE? 'manage-user.save': 'manage-user.edit'}/>
                                </button>
                                </div>
                            <div className='col-12 mt-5'><TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        UserRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
