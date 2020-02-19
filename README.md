重新做了一遍这个react项目，修了一些代码，是对react做一个梳理和复习吧

### 关于css适配：

使用的是react-app-rewired，它是在不eject的情形下做一些自定义配置，通过在根目录下配置config-overrides.js

首先需要安装
react-app-rewired
customize-cra

修改package.json配置：

"scripts": {
    
  "start": "react-app-rewired start",

   "build": "react-app-rewired build",

   "test": "react-app-rewired test --env=jsdom"
}

再安装
babel-plugin-import
postcss-pxtorem

根目录下加一个配置文件config-overrides.js
```
const {
  override,
  fixBabelImports,
  addPostcssPlugins
} = require('customize-cra');

module.exports = override(

  addPostcssPlugins([require('postcss-pxtorem')({
    rootValue: 43.1,//这个是设计稿的文字大小
    propList: ['*'],
    minPixelValue: 2//2以下忽略，不转换成rem，适配1px的边框，如果有圆角之类的，改变其值；
  }), 
])
);
```
### 路由跳转

如果该组件需要跳转，则需要引入react-router-dom中的withRouter，这个原理应该是高阶组件的属性代理；
将 history,location,match这三个信息传入组件的props。

### react代码优化之将公共函数抽离出来，放入utils(习惯问题)

### react-redux的原理简单总结
有了react-redux之后，redux数据传递简单好懂，
react-redux相当于一个上下文（context）
provide提供数据；
connect返回一个函数，这个函数返回一个class，这个class接受数据state和dispatch；再作为高阶组件将state和provide传递给需要的子组件（属性代理）

#### Provider简单的一个实现：
```
class Provider extends React.Component {
    //设置上下文信息类型
    static childContextTypes={
        store:PropTypes.object,
    }
    //设置上下文信息
    getChildContext(){
        return this.props.store;
    }

    constructor(props,context){
        super(props,context);
    }
    render(){
        return this.props.children;
    }
}
```
#### connect：
```
function connect(mapStateToProps,mapDispatchToProps){
    return function (Component){
        return class Proxy entends React.Component{
            //获取上下文的store
            static contextTypes={
                store:PropTypes.object;
            }
            constructor(props,context){
                super(props,context);
                this.state=this.queryProps()//把所有返回值赋值给组件的 状态 用于传递给组件
            }
            conponentDidMount(){//组件渲染结束后，当状态改变，重新获取最新的状态信息，重新把component渲染，把新的状态信息通过属性传递给component
                this.context.store.subscribe(()=>{
                    this.setState(this.queryProps());
                })
            }
            render(){
                return <Component {...this.state}></Component>
            }
            //执行mapStateToProps,mapDispatchToProps，拿到所有返回值，合并成一个新对象
            queryProps(){
                let store=this.context.store;
                let mapState=typeof mapStateToProps == 'function'?mapStateToProps(store.getState()):{};
                let mapDispatch=typeof mapDispatchToProps == 'function'?mapDispatchToProps(store.dispatch):null;
                return {...mapState,...mapDispatch}
            }
        }
    }
}
```
### 事件绑定
react事件绑定，React并不是将事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，然后React将事件封装给正式的函数运行和处理。

DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。

同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。
服务端渲染和客户端渲染需要都执行一遍就是为了绑定事件；

合成事件也分成两类：捕获阶段的合成事件onClickCapture和冒泡阶段的合成事件onClick，
事件执行顺序：原生事件(addEventListener)的捕获阶段(true)，原生事件的冒泡阶段，合成事件的捕获阶段，合成事件的冒泡阶段


react事件绑定和html事件绑定的区别：

React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault，
也不能使用e.stopPropagation()。因为本来是冒泡到document上了。
并且需要绑定this，才能拿到组件实例，否则指向的是document；




提到合成事件和原生事件就不得不提setstate了。

### setstate
setstate在合成事件和原生事件中表现形式是不同的。

在合成事件中setState会被添加进一个队列，然后批量执行；如果多个setState参数是一个对象，会合并，然后只执行一次，如果是函数，则会一个一个处理（因为需要获得上一个state）

this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

在原生事件中，setstate会立即执行；setTimeout,setInterval,promise

### jsx语法

利用是对JavaScript 语法扩展，React利用jsx创建虚拟的DOM元素。以此来减少对实际DOM的操作从而提升性能，React 使用 JSX 来替代常规的 JavaScript。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。

JSX语法中，使用的标签类型有两种：DOM类型的标签（div、span等)和React组件类型的标签；区别是小写开头和大写，开头，如果react组件用小写开头，会被处理成自定义标签；

JSX对if else不是很友好，不过可以使用三元运算表达式：

### JSX中的样式


1.行内样式
使用表达式传入样式对象的方式来实现
// 注意这里的两个括号，第一个表示我们在要JSX里插入JS了，第二个是对象的括号

2.添加class（推荐）
不能用class，会认为是个类，所以引用样式需要用className来代替class，
引入css文件，class的引入由 class= 变为了 className=

3.动态设置：
<div style={{ padding: this.state.style.show ? '100px' : '200px' }}> 三元运算符语法






































