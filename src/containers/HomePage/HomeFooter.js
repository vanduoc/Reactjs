import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class About extends Component {

    render() {
        
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Duoc IT Pro.</p> <a target='_blank' href='https://youtube.com'>More information, please visit to my Youtube Chanel</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
