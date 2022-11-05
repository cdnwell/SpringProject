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