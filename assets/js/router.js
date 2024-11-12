// ROUTERJS LITE 2.2.1.0 by ZIXFOX
// Se simplifico para este proyecto demostración
// No necesita dependencias

const SPA_MODE = true; // activar o desactivar la funcionalidad single page application
let TYPEPAGE = 'public'; // valor por defecto

let InitJs = {
    callback: (obj = null) => { /*console.log('Callback',obj);*/ },
    intro: (obj = null) => { Router.animationRedirect('in') },
    output: (obj = null) => { Router.animationRedirect('out') },
    animationFlag: true,
    animationMethod: null,
}

const Router = {
    // Capturamos los eventos
    addEvent: (parent, evt, selector, handler) => {
        parent.addEventListener(evt, function (event) {
            if (event.target.matches(selector + ', ' + selector + ' *')) {
                handler.apply(event.target.closest(selector), arguments);
            }
        }, false);
    },

    redirect: (url = "#") => {
        let linkContinue = false;

        if (url == "") {
            linkContinue = true;
            url = "/";
        } else if (url.charAt(0) != '/') {
            linkContinue = true;
            url = "/" + url;
        } else if (url.includes('#')) {
            linkContinue = false;
        } else {
            linkContinue = true;
        }

        if (linkContinue) {
            Router.routerURL({ url: url });
        }
    },

    createLocalStorage: () => {
        if (localStorage.getItem('Router') === null) {
            let pathRouter = document.location.pathname, pathNames = null;
            if (pathRouter.trim() === '') pathRouter = '/';

            if (pathRouter != '/') {
                let aux_get = pathRouter.split('/');
                pathNames = aux_get.filter(uri => uri != '');
            }

            let dataRouterStorage = {
                oldPage: {
                    path: document.location.pathname,
                    arrayPath: pathNames
                }
            }

            localStorage.setItem('Router', JSON.stringify(dataRouterStorage));
        }
    },

    // La función solo se ejecuta por la etiqueta <a>
    routerURL: (obj) => {
        let routerStorage = JSON.parse(localStorage.getItem('Router'));
        let path = document.location.pathname, get = null;
        if (path.trim() === '') path = "/";

        if (path != "/") {
            let aux_get = path.split('/');
            get = aux_get.filter(uri => uri != '');
        }

        routerStorage.oldPage = {
            path: document.location.pathname,
            arrayPath: get
        }

        localStorage.setItem('Router', JSON.stringify(routerStorage));

        history.pushState('', 'title', obj.url); // orden -> state, title, url

        Router.routerCallback();
    },

    // La función se ejecuta al detectar un cambio en la navegación
    routerCallback: () => {
        let slash = document.location.pathname;
        if (SPA_MODE == true && slash.includes('#') == false) {
            Router.renderPHP();
        }
    },

    renderPHP: () => {
        let path = document.location.pathname;

        var send = {
            uri: path,
            type: TYPEPAGE,
            data: null // Si quiero mandar datos en los enlaces A FUTURO
        };

        InitJs.output();

        fetch(window.location.origin + "/router/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(send)
        })
            .then(response => response.json())
            .then(data => {
                Router.reWriteMetaDom(data.webinfo);
                Router.printPHP(data);
            })
            .catch(error => {
                let data = { success: false, error: 'TryCatch Error, consult data.error', error_code: error }
                console.log(data);
                console.log('No es posible acceder acceder a esta dirección');
                history.go(-1);
            })
    },

    reWriteMetaDom: (seo) => {
        document.title = seo.title;
        // Se elimino el resto de meta tag porque esto solo es una demostración
    },

    printPHP: (data) => {
        if (data.success) {
            let complete = () => {
                clearInterval(timer);
                timer = null;
            }
            let flagInterval = () => {
                if (InitJs.animationFlag) {
                    let html = document.querySelector('#' + data.id);
                    html.innerHTML = '';
                    html.innerHTML = data.html;
                    InitJs.intro();
                    InitJs.callback(data);
                    complete();
                    return;
                }
            }
            let timer = setInterval(flagInterval, 100);
        } else {
            console.log(data.error);
            console.log(data);
            history.back();
        }
    },

    reloadJs: () => {
        var arrayScript = [];
        var arrayTemp = document.querySelectorAll('script[data-script="reaload"]');
        arrayTemp.forEach(element => {
            arrayScript.push({
                src: element.getAttribute("src")
            });
            element.remove();
        })

        var body = document.getElementsByTagName('body')[0];

        arrayScript.forEach(element => {
            var script = document.createElement('script');
            script.src = element.src;
            script.setAttribute('data-script', 'reaload');
            body.append(script);
        })
    },

    animationRedirect: (type = 'in') => {
        let passTrue = true;

        if (typeof animationRedirect === 'undefined') {
            passTrue = false;
        } else if (typeof animationRedirect != 'object') {
            passTrue = false;
        }

        if (passTrue) {
            // Delete for this project
        } else {
            // ANIMACION POR DEFECTO
            InitJs.animationMethod = null;

            if (type === 'in') {
                InitJs.animationFlag = false;
                let loader = document.querySelector('.loader_transition_page')
                loader.classList.add('loader_transition_page_close')
                setTimeout(() => {
                    loader.classList.add('loader_transition_page_disable')
                    loader.classList.remove('loader_transition_page_open', 'loader_transition_page_close')
                }, 400);
                setTimeout(() => {
                    loader.classList.remove('loader_transition_page_disable')
                }, 430);
                setTimeout(() => { InitJs.animationFlag = true }, 430);
            } else if (type === 'out') {
                InitJs.animationFlag = false;
                let loader = document.querySelector('.loader_transition_page')
                loader.classList.add('loader_transition_page_open')
                setTimeout(() => { InitJs.animationFlag = true }, 400);
            }
        }
    }
}

// Capturar evento click de todos los <a>
Router.addEvent(document, 'click', 'a[href]', function (e) {

    // En caso de existir data-disable-router se hara la redirección normal de la etiqueta a

    let target = this.getAttribute('target')
    let a_url = this.getAttribute('href')

    if (target == '_blank') {
        e.preventDefault();
        window.open(a_url, '_blank');
    } else {
        let url = a_url;

        let linkContinue = false;
        if (url == "") {
            e.preventDefault();
            linkContinue = true;
            url = "/";
        } else if (url.charAt(0) != '/') {
            e.preventDefault();
            linkContinue = true;
            url = "/" + url;
        } else if (url.includes('#')) {
            linkContinue = false;
        } else {
            e.preventDefault();
            linkContinue = true;
        }

        if (linkContinue) {
            Router.routerURL({ url: url });
        }
    }
});

Router.createLocalStorage();

// Se ejecuta por botones de navegación (go back or to next)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('popstate', (e) => {
    Router.routerCallback();
});

