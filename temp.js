class Router {
    $routes = {}

    constructor() {
        window.addEventListener('popstate', e => {
            console.log('[popstate]', e.state);
            render(e.state ? e.state.path : '/');
          });
        this.$routes = {}
    }

    render (url) {
        this.$routes[url]()
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
                <a href="/detali">detail</a>
                <h1 id="detail">detail</h1>
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
                <a href="/">main</a>
            </div>
        `;
        container.innerHTML = template;
    }    
}


const router = new Router()
const container = document.querySelector('#app');

router.add('/', () => {return new Main(container)});
router.add('/detail', () => {return new Detail(container)});

router.push('/')

const $el = document.querySelector('#detail')
$el.addEventListener('click', (e) => {
    e.preventDefault()

    router.push('/detail')

})

window.addEventListener('DOMContentLoaded', (e) => {
    console.log('e', e)
});