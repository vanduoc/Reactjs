import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES} from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

import * as actions from "../../store/actions";
import { Link } from 'react-router-dom';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.lang;

        return (
            <React.Fragment>
            <div className='home-header-uder-container'></div>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
                        <Link to='/home' className='header-logo'>
                        </Link>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b> <FormattedMessage id='home-header.speciality'/></b></div>
                            <div className='subs-title'><FormattedMessage id='home-header.searchDoctor'/></div>
                        </div>
                        <div className='child-content'>
                            <div>
                                <b>
                                <FormattedMessage id='home-header.health-facility'/>
                                </b>
                            </div>
                            <div className='subs-title'><FormattedMessage id='home-header.select-room'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.doctor'/></b></div>
                            <div className='subs-title'><FormattedMessage id='home-header.select-doctor'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.fee'/></b></div>
                            <div className='subs-title'><FormattedMessage id='home-header.check-health'/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle'></i>
                            <FormattedMessage id='home-header.support'/>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'}>
                            <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language-en active': 'language-en'}>
                            <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
