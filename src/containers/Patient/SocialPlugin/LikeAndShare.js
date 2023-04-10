import React, { Component, version } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
class LikeAndShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : process.env.REACT_APP_FACEBOOK_APP_ID, // App ID
            //   channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
              status     : true, // check login status
              cookie     : true, // enable cookies to allow the server to access the session
              xfbml      : true,  // parse XFBML
              version: 'v16.0'
            });
        
            // Additional initialization code here
          };
        
          // Load the SDK Asynchronously
          (function(d){
             var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement('script'); js.id = id; js.async = true;
             js.src = `//connect.facebook.net/${locale}/sdk.js`;
             ref.parentNode.insertBefore(js, ref);
           }(document));

    }

    componentDidMount() {
        this.initFacebookSDK();
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.language !== preProps.language) {
            this.initFacebookSDK();
        }
    }
    
    render () {
        let { dataHref } = this.props;
        console.log('check dataHref', dataHref);
        return (
            <>
                <div 
                    className="fb-like" 
                    data-href={dataHref} 
                    data-width="800" 
                    data-layout="standard" 
                    data-action="like" 
                    data-size="small" 
                    data-share="true"
                >
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare)