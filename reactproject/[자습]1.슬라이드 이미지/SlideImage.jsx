import React, { useState, useRef, useEffect } from 'react';
import imgArray from './imgArr';

const imgSetting = () => {
    const arr_img = [];
    const imgArr = [...imgArray];
    const slide_img_ea = imgArr.length;
    for(let i=0;i<5;i++){
        if(i===0){
            arr_img.push({ index : imgArr[slide_img_ea-1].index , src : imgArr[slide_img_ea-1].src });
            continue;
        }
        arr_img.push({ index : imgArr[(i - 1) % slide_img_ea].index , src : imgArr[(i - 1) % slide_img_ea].src });
    }
    return arr_img;
};

const SlideImage = () => {
    const [img, setImg] = useState([]);
    const [imgArr, setImgArr] = useState(imgArray);
    const [currImg, setCurrImg] = useState();
    const [stageWidth, setStageWidth] = useState(0);
    const [imgStyle, setImgStyle] = useState({
        transform: `translateX(0)`,
        transition: `all 0.3s ease-in-out`,
    });
    const [currentImgIndex, setCurrentImgIndex] = useState(1);
    const widthRef = useRef();
    const timeout = useRef();

    useEffect(() => {
        setStageWidth(widthRef.current.offsetWidth);
        setImg(imgSetting);
        setCurrImg(imgArr[0].src);
    }, []);

    useEffect(() => {
        if(currentImgIndex === 0){
            const x = stageWidth / 5;
            setCurrentImgIndex(img.length - 2);
            setTimeout(() => {
                setImgStyle({
                    transform: `translateX(${(img.length - 2) * x } px)`,
                    transition: `0ms`,
                })
            }, 400);
            console.log('useEffect-currentIndex[0]',currentImgIndex);
        }

        if(currentImgIndex === img.length - 1){
            const x = stageWidth / 5;
            setCurrentImgIndex(1);
            setTimeout(() => {
                setImgStyle({
                    transform: `translateX(0)`,
                    transition: `0ms`,
                })
            }, 400);
            console.log('useEffect-currentIndex[4]',currentImgIndex);
        }

    },[currentImgIndex]);

    const onClickImg = (e) => {
        setCurrImg(e.target.src);
        console.log('img[0]',img[0].src);
        console.log(stageWidth);
    };

    const leftClick = () => {
        const x = stageWidth / 5;
        setImgStyle({
            transform: `translateX(-${x*(currentImgIndex+1)}px)`,
            transition: `all 0.3s ease-in-out`,
        });
        setCurrentImgIndex(currentImgIndex - 1);
        console.log('currIndex',currentImgIndex);
        console.log('translateX',x*currentImgIndex);
    };
    
    const rightClick = () => {

    };

    return (
        <div className="box-img">
            <div className="thumb-img">
                <img src={currImg}/>
            </div>
            <div className="footer-img">
                <div className="footer-stage-hide">
                    <div className="footer-stage" style={imgStyle} ref={widthRef}>
                        {img.map((item, i) => <img key={i} src={item.src} className="stage_img" onClick={onClickImg} />)}
                    </div>
                </div>
                <div className="imgb-nav">
                    <div className="imgb-prev" onClick={leftClick}>
                        <span>{'<'}</span>
                    </div>
                    <div className="imgb-next" onClick={rightClick}>
                        <span>{'>'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideImage;