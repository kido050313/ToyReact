import { ToyReact, Component } from './ToyReact.js'

class MyComponent extends Component {
    render() {
        return <div>
            <span>hello</span>
            <span>toyReact</span>
            <span>!</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>
    }
}


let a = <MyComponent name="a" id="a">
    <span>hello</span>
    <span>world</span>
    <span>!</span>
</MyComponent>

ToyReact.render(
    a,
    document.body
)

// document.body.appendChild(a);
// 若出现 Cannot read property 'appendChild' of null 
// at ElementWrapper.mountTo 错误,main.html中需添加<body></body> 

