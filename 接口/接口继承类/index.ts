//基础类
class BaseControl {
    private state: any
}

//接口继承类  会继承类的私有成员
interface SelectInterface extends BaseControl {
    select(): void
}

//实现一个按钮

class ButtonControl extends BaseControl implements SelectInterface {
    select() {

    }
}
//继承基类 ，但是不校验
class TextControl extends BaseControl {
    log() {

    }
}

class SelectControl implements SelectInterface {
    //即使手动增加私有属性，会报错，因为接口里面继承了基类的state,但是SelectControl并没有继承基类，无法实现私有成员
    private state: any
    select() {

    }

}