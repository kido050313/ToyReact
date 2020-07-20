class ElementWrapper { // 实dom
    constructor(type) {
        // console.log(type)
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(vchild) {
        // console.log(vchild)
        vchild.mountTo(this.root);
    }
    mountTo(parent) {
        // 真正的parent
        parent.appendChild(this.root)
    }
}
 
class TextWrapper { // 实dom
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Component { // 虚dom
    constructor() {
        this.children = []
    }
    setAttribute(name, value) {
        this[name] = value;
    }
    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent)
    }
    appendChild(vchild) {
        this.children.push(vchild)
    }
        
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        let element;
        if(typeof type === "string") {
            element = new ElementWrapper(type)
        } else {
            element = new type;
        }
        for(let name in attributes) {
            element.setAttribute(name, attributes[name])
        }
        let insertChild = (children) => {
            for(let child of children) {
                if (typeof child === 'string') {
                    child = new TextWrapper(child);
                }
                if (typeof child === 'object' && child instanceof Array) {
                    insertChild(child)
                } else {
                    if(!(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)
                    ) {
                        child = String(child);
                    }
                    if(typeof child === "string") {
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child)
                }
            }
        }
        insertChild(children)
        return element;
    },

    render(vdom, element) {
        vdom.mountTo(element)

        // 如果是实dom直接添加
        // element.appendChild(vdom);

    }
}