//这里会报错 。会推断右侧的参数为事件类型（mouseevent ）。但是上面没有clickTime 属性 ，这里是上下文自动推测
document.onmousedown = function (ev) {
    console.log(ev.clickTime)
}
//这里手动断开上下文类型，指明为any类型
document.onmousedown = function (ev:any) {
    console.log(ev.clickTime)
}
