import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES} from '../../../utils/constant';
import * as actions from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: []
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let genders = await getAllCodeService('gender');
        //     if (genders && genders.errCode === 0) {
        //         this.setState({
        //             genderArr: genders.data
        //         })
        //     }
        //     let roles = await getAllCodeService('role');
        //     if (roles && roles.errCode === 0) {
        //         this.setState({
        //             roleArr: roles.data
        //         })
        //     }
        //     let positions = await getAllCodeService('position');
        //     if (positions && positions.errCode === 0) {
        //         this.setState({
        //             positionArr: positions.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage User By Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><h4 style={{'text-transform': 'uppercase'}}><FormattedMessage id='manage-user.add'/></h4></div>
                            <div className='col-3 form-group'>
                                <label for='email'><FormattedMessage id='manage-user.email'/></label>
                                <input id="email" className='form-control' type='email' />
                            </div>
                            <div className='col-3 form-group'>
                                <label for='password'><FormattedMessage id='manage-user.password'/></label>
                                <input id="password" className='form-control' type='password' />
                            </div>
                            <div className='col-3 form-group'>
                                <label for='firstName'><FormattedMessage id='manage-user.first-name'/></label>
                                <input id="firstName" className='form-control' type='text' />
                            </div>
                            <div className='col-3 form-group'>
                                <label for='lastName'><FormattedMessage id='manage-user.last-name'/></label>
                                <input id="lastName" className='form-control' type='text' />
                            </div>
                            <div className='col-3 form-group'>
                                <label for="phoneNumber"><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' id='phoneNumber' type="text"/>
                            </div>
                            <div className='col-9 form-group'>
                                <label for="address"><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' id='address' type="text" />
                            </div>
                            <div className='col-3 form-group'>
                                <label for="gender"><FormattedMessage id='manage-user.gender'/></label>
                                <select id='gender' className='form-control'>
                                    { genders && genders.length > 0 && genders.map((gender, index) => {
                                        return <option key={index} value={gender.key}>{language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label for="postion"><FormattedMessage id='manage-user.position'/></label>
                                <select id='postion' className='form-control'>
                                { positions && positions.length > 0 && positions.map((position, index) => {
                                        return <option key={index} value={position.key}>{language === LANGUAGES.VI ? position.valueVi : position.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label for="roleId"><FormattedMessage id='manage-user.role'/></label>
                                <select id='roleId' className='form-control'>
                                { roles && roles.length > 0 && roles.map((role, index) => {
                                        return <option key={index} value={role.key}>{language === LANGUAGES.VI ? role.valueVi : role.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3 form-group'>
                                <label for="Image"><FormattedMessage id='manage-user.image'/></label>
                                <select id='Image' className='form-control'>
                                    <option selected>Choose...</option>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div className='col-12 mt-3'><button className='btn btn-primary'><FormattedMessage id='manage-user.save'/></button></div>
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
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
