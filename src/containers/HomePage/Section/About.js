import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class About extends Component {

    render() {
        
        return (
            <div className='section-common section-about'>
                <div className='section-container-homepage'>
                    <div className='section-header'>
                        <h2 className='title-section'>Truyền thông nói về Chúng tôi</h2>
                    </div>
                    <div className='section-body section-about-content'>
                        <div className='content-left'>
                        <iframe 
                            width="100%" 
                            height="315" 
                            src="https://www.youtube.com/embed/utF5vj7Ljuo" 
                            title="YouTube video player" 
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen></iframe>
                        </div>
                        <div className='content-right'>
                        Từ Đất Nước viết hoa diễn tả tình cảm thiêng liêng đối với Đất Nước. Giọng thơ trữ tình, câu thơ dài ngắn đan xen thể hiện cảm xúc tự nhiên, phóng khoáng. Ngôn ngữ giản dị, sử dụng sáng tạo các chất liệu từ văn học dân gian tạo chiều sâu cho ý thơ. Đất Nước đối với Nguyễn Khoa Điềm là những gì bình thường, gần gũi nhất. Nó có trong cổ tích, ca dao, gắn liền với nguồn mạch quê hương để làm nên một chân dung trọn vẹn về Đất Nước: Thân thương mà hào hùng, vất vả mà thủy chung.
                        </div>
                    </div>
                </div>
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
