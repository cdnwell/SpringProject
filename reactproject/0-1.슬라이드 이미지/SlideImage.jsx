import React, { useState, useRef, useEffect } from 'react';
import imgArray from './imgArr';

const imgSetting = () => {
    const arr_img = [];     //반환 할 배열 값
    const imgArr = [...imgArray];
    const slide_img_ea = imgArr.length;

    arr_img.push(imgArr[slide_img_ea-1]);
    for(let i=0;i<4;i++){
        arr_img.push(imgArr[i%slide_img_ea]);
    }

    return arr_img;
};

const SlideImage = () => {
    const [img, setImg] = useState([]);
    const [imgArr, setImgArr] = useState(imgArray);     //원본 이미지
    const [currImg, setCurrImg] = useState();
    const [stageWidth, setStageWidth] = useState(0);
    const [imgStyle, setImgStyle] = useState();
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const widthRef = useRef();
    const timeout = useRef();

    useEffect(() => {
        setStageWidth(widthRef.current.offsetWidth);
        setImg(imgSetting);
        setCurrImg(imgArr[0].src);
    }, []);

    useEffect(() => {
        let tmpImg = [];
        const img_len = imgArr.length;
        tmpImg.push(imgArr[(currentImgIndex-1+img_len)%img_len]);
        for(let i=0;i<4;i++){
            tmpImg.push(imgArr[(currentImgIndex+i)%img_len]);
        }
        console.log('tmpImg',tmpImg);
        setImg([...tmpImg]);
        console.log('img',img);
        setImgStyle({
            transform: `translateX(0px)`,
            transition: `0ms`,
        });
    },[currentImgIndex]);

    const onClickImg = (e) => {
        setCurrImg(e.target.src);
        console.log('img[0]',img[0].src);
        console.log(stageWidth);
    };

    const leftClick = () => {
        const x = stageWidth / 5;
        const img_len = imgArr.length;
        console.log('currIndex-pre',currentImgIndex);
        setImgStyle({
            transform: `translateX(${-x}px)`,
            transition: `all 0.3s ease-in-out`,
        });
        setTimeout(() => {
            setCurrentImgIndex((currentImgIndex-1+img_len)%img_len);
        },350);
        console.log('currIndex',currentImgIndex);
        console.log('translateX',x*(currentImgIndex-1));
    };
    
    const rightClick = () => {
        const x = stageWidth / 5;
        const img_len = imgArr.length;
        
        setImgStyle({
            transform: `translateX(${x}px)`,
            transition: `all 0.3s ease-in-out`,
        });
        setTimeout(()=>{
            setCurrentImgIndex((currentImgIndex + 1)%img_len);
        },350);
        
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