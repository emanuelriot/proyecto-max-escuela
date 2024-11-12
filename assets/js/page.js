function save() {
    const text = document.querySelector('#note').value;
    if (text.trim() === '') {
        alert('Escribe algo para guardar');
        return
    }

    let book = localStorage.getItem("book");

    if (book === null) {
        let id = Math.floor(Math.random() * 10000000)

        let data = [];
        data.push({
            id: id,
            note: text
        })

        localStorage.setItem("book", JSON.stringify(data));
    } else {
        let data = JSON.parse(book)
        let id = Math.floor(Math.random() * 10000000)

        data.push({
            id: id,
            note: text
        })

        localStorage.setItem("book", JSON.stringify(data));
    }

    document.querySelector('#note').value = '';
    listTemplate();
}

function listTemplate() {
    const book = localStorage.getItem("book");
    let data = JSON.parse(book)

    if (book === null) {
        document.querySelector('.notes').innerHTML = '';
    } else {
        let html = '';
        data.forEach(element => {
            html += `<div class="note_template">
                <span>${element.note}</span>
                <div onclick="deleteTemplate(${element.id})" class="note_close hover_active"></div>
                <div onclick="editTemplate(${element.id})" class="note_edit hover_active"></div>
            </div>`;
        });

        document.querySelector('.notes').innerHTML = html;
    }
}

function editTemplate(id) {
    const book = localStorage.getItem("book");
    if (book != null) {
        let data = JSON.parse(book)
        data.forEach(element => {
            if (element.id === id) {
                document.querySelector('#note').value = element.note;
            }
        });
    }
}

function deleteTemplate(id) {
    const book = localStorage.getItem("book");
    if (book != null) {
        let data = JSON.parse(book)
        let data_aux = [];

        data.forEach(element => {
            if (element.id != id) {
                data_aux.push({
                    id: element.id,
                    note: element.note
                })
            }
        });

        localStorage.setItem("book", JSON.stringify(data_aux));
    }

    listTemplate();
}















function sendmail() {

    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let message = document.querySelector('#message').value

    if (name.trim() == '') {
        document.querySelector('#alertBox').innerHTML = 'Ingrese un nombre'
        alertPopup(true);
        return
    }

    if (email.trim() == '') {
        document.querySelector('#alertBox').innerHTML = 'Ingrese un correo'
        alertPopup(true);
        return
    }

    if (message.trim() == '') {
        document.querySelector('#alertBox').innerHTML = 'Ingrese un mensaje'
        alertPopup(true);
        return
    }

    if (!validarEmail(email)) {
        document.querySelector('#alertBox').innerHTML = 'Ingrese un correo electronico valido'
        alertPopup(true);
        return
    }

    const tries = localStorage.getItem("tries");
    if (tries === null) {
        let numbers = {
            number: 0
        }

        localStorage.setItem("tries", JSON.stringify(numbers));
    }

    const tries_aux = localStorage.getItem("tries");
    let intentos = JSON.parse(tries_aux);

    if (intentos.number >= 3) {
        document.querySelector('#alertBox').innerHTML = 'Alcanzaste el limite de intentos, gracias por probar esta demo.'
        alertPopup(true);
    } else {
        intentos.number++

        let numbers = {
            number: intentos.number
        }

        localStorage.setItem("tries", JSON.stringify(numbers));

        loader(true)

        let send = {
            name: name,
            email: email,
            message: message
        }

        fetch(window.location.origin + "/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(send)
        })
            .then(response => response.json())
            .then(data => {
                loader(false)
                document.querySelector('#name').value = ''
                document.querySelector('#email').value = ''
                document.querySelector('#message').value = ''
                if (data.success) {
                    document.querySelector('#alertBox').innerHTML = 'Gracias por contactarnos'
                    alertPopup(true);
                } else {
                    document.querySelector('#alertBox').innerHTML = 'Hubo un error intente mas tarde'
                    alertPopup(true);
                }
            })
            .catch(error => {
                let data = { success: false, error: 'TryCatch Error, consult data.error', error_code: error }
                console.log(data);
            })
    }
}

function loader(band = true) {
    if (band)
        document.querySelector('.load').style.display = 'block';
    else
        document.querySelector('.load').style.display = 'none'
}

function alertPopup(band = true) {
    if (band)
        document.querySelector('.alert').style.display = 'block';
    else
        document.querySelector('.alert').style.display = 'none'
}

function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        return true
    } else {
        return false
    }
}