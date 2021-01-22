var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];	//box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616'];	//body背景色

var content = document.getElementById('content');
var boxs = document.querySelectorAll('.box');
// console.log(boxs);   NodeList对象，对象的原型身上有一个forEach方法

var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];    //下(0)左(1)上(2)右(3)

var style = document.createElement('style');
var str = '';
for (var i = 0; i < boxBg.length; i++) {
    /* str += '.box:nth-child(1) div{' +
        'background: #f44336 url(images/1.png)' + 'no-repeat center;' +
        '}'; */

    str += `.box:nth-child(${i + 1}) div{
        background: ${boxBg[i]} url(images/${i + 1}.png) no-repeat center;
    }`;
}
style.innerHTML = str;
document.head.appendChild(style);



boxs.forEach(function (box) {
    box.onmouseenter = function (ev) {
        // console.log(getDir(ev, this))
        var dir = getDir(ev, this);
        this.style.transform = 'translateZ(150px)' + rot[dir];
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];
    };
    box.onmouseleave = function () {
        this.style.transform = '';
    };
});

//获取鼠标进入方块的方向 
function getDir(e, box) {
    //
    /* 
        getBoundingClientRect()返回DOM元素的尺寸位置信息
        {
            width:30,
            height:40,
            left:300,
            right:400
            ....
        } 
     */
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;

    var w = box.offsetWidth;
    var h = box.offsetHeight;

    var x = e.clientX - l - w / 2;
    var y = e.clientY - t - h / 2;


    var deg = Math.atan2(y, x) / (Math.PI / 180);   //-180~180  0~360

    var d = (Math.round((deg + 180) / 90) + 3) % 4;

    return d; //0上边1右边2下边3左边
}

document.onmousemove = function (ev) {
    console.log(ev.clientX);
    /*
        
                        -4
                        -3
                        -2
                        -1
        -4  -3  -2  -1  0   1   2   3   4 
                        1
                        2
                        3
                        4


     */
    var x = (0.5 - ev.clientY / window.innerHeight) * 15;    //0~1 -0.5~0.5
    var y = (ev.clientX / window.innerWidth - 0.5) * 15;    //0~1 -0.5~0.5
    content.style.transform = 'perspective(1000px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}






