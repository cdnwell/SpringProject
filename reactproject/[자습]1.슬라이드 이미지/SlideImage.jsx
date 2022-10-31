const React = require('react');
const { useState, useRef } = React;

const SlideImage = () => {


    const onClickImg = () => {
        
    };

    return (
        <div className="box-img">
            <div className="thumb-img">
                <img src="img/ryan-hoffman-982Nb-awyVE-unsplash.jpg"/>
            </div>
            <div className="footer-img">
                <div className="footer-stage-hide">
                    <div className="footer-stage">
                        <img src="img/ryan-hoffman-982Nb-awyVE-unsplash.jpg" className="stage_img" onClick={onClickImg} />
                        <img src="img/ryan-hoffman-A7f7XRKgUWc-unsplash.jpg" className="stage_img" onClick={onClickImg} />
                        <img src="img/ryan-hoffman-u6n1HrW0sdQ-unsplash.jpg" className="stage_img" onClick={onClickImg} />
                    </div>
                </div>
                <div className="imgb-nav">
                    <div className="imgb-prev">
                        <span>{'<'}</span>
                    </div>
                    <div className="imgb-next">
                        <span>{'>'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

module.exports = SlideImage;