import React, { useState, useRef, useEffect } from 'react';
import imgArray from './imgArr';

const SlideImage = () => {
    const [img, setImg] = useState([]);
    const [imgArr, setImgArr] = useState(imgArray);
    const [currImg, setCurrImg] = useState();
    const [stageWidth, setStageWidth] = useState(0);
    const [imgStyle, setImgStyle] = useState();
    const widthRef = useRef();
    const timeout = useRef();

    useEffect(() => {
        setStageWidth(widthRef.current.offsetWidth);
        setImg(imgSetting);
        setCurrImg(imgArr[0].src);
    }, []);

    const imgSetting = () => {
        const arr_img = [];
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

    const onClickImg = (e) => {
        setCurrImg(e.target.src);
        console.log('img[0]',img[0].src);
        console.log(stageWidth);
    };

    const leftClick = () => {
        const arr_cpy = [...img];
        const arr_cpy2 = new Array(5);
        const slide_img_ea = imgArr.length;
        const x = stageWidth / 5;

        for(let i=0;i<5;i++){
            if(i===4){
                //4번째 이미지의 클래스명을 가져온다.
                // const className = arr_img[4].attr('class');
                //숫자 파싱
                const number = arr_cpy[i].index;
                arr_cpy2[4] = imgArr[(number+1) % slide_img_ea];
                continue;
            }
            arr_cpy2[i] = arr_cpy[i+1];
        }
        console.log(arr_cpy2);
        setImgStyle({
            transform: `translateX(-${x}px)`
        });
        console.log('x', x);
        console.log('imgStyle', imgStyle);
        timeout.current = setTimeout(() => setImg([...arr_cpy2]),300);
        console.log(img);
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
                    <div className="footer-stage" ref={widthRef}>
                        {img.map((item, i) => <img key={i} style={imgStyle} src={item.src} className="stage_img" onClick={onClickImg} />)}
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