class Router {
    $routes = {}

    render (url) {
        this.$routes[url ? url : "/#/"]()
    }

    constructor() {
        window.addEventListener('hashchange', e => {
            this.render(`/#/${e.newURL.split("/#/")[1]}`);
        })
        this.$routes = {}
    }

    add (url, component) {
        this.$routes[url] = component
    }

    push (url) {
        window.history.pushState({}, '', url)
        this.render(url)
    }
}

class Main {
    constructor(container) {
        const template = `
            <div>
                <h1>Main</h1>
                <a href="#/detail">detail</a>
            </div>
        `;
        container.innerHTML = template;
    }    
}

class Detail {
    constructor(container) {
        const template = `
            <div>
                <h1>Detail</h1>
                <a href="#/">main</a>
            </div>
        `;
        container.innerHTML = template;
    }    
}


const router = new Router()
const container = document.querySelector('#app');

router.add('/#/', () => {return new Main(container)});
router.add('/#/detail', () => {return new Detail(container)});

router.push('/#/')

const $el = document.querySelector('#detail')
