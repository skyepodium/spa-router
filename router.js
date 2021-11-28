class Router {
    $routes = {}

    render (name) {
        this.$routes[name]?.component()
    }

    add ({path, name, component}) {
        this.$routes[name] = { 
            path: `/#${path}`, 
            component 
        }
        console.log(this.$routes)
    }

    push ({name, props}) {
        this.render(name)
    }

    constructor({routes}) {
        routes.forEach(item => {
            this.add({...item})
        })
        window.addEventListener('hashchange', e => {
            console.log('e', e)
            console.log('e', e.newURL.split("/#/")[1])
            this.push({name: 'Detail'})
        })
    }
}

class Main {
    constructor($app) {
        const template = `
            <div>
                <h1>Main</h1>
                <a href="#/detail">detail</a>
            </div>
        `
        $app.innerHTML = template
    }    
}

class Detail {
    constructor($app) {
        const template = `
            <div>
                <h1>Detail</h1>
                <a href="#/">main</a>
            </div>
        `
        $app.innerHTML = template
    }    
}

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => {return new Main($app)}
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => {return new Detail($app)}
    }
]

const router = new Router({routes})
const $app = document.querySelector('#app');

router.push({name: 'Main'})
