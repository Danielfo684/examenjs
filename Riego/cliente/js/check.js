export class Check {
    constructor(parent,client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
    }

    changeValue(name, value,element) {
        const data = this.states.find((item) => item.name == name);
        // hacer algo más.
        data.state = value;
        //función para enviar los datos al servidor cuando se cambien los valores
        //función para cambiar el contenido del span y que nos salga ON o OFF

        this.client.send(data);
        if (value) {
            element.textContent = 'ON';
        } else {
            element.textContent = 'OFF';
        }
    }



    addCheck(name, parentElement) {
        this.states.push({
            name: name,
            state: false,
            parent: this.parent.id
        })
        const check = document.createElement("label");
        check.classList.add("form-switch");
        check.dataset.name = name;
        this.parent.appendChild(check);
        const input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        check.appendChild(input);
        check.appendChild(document.createElement("i"));
        const span = document.createElement('span');
        const text = document.createTextNode('OFF');
        span.appendChild(text);
        check.appendChild(span);
        input.addEventListener('change', (event)=> {

            //añadimos una función al listener para cambiar el valor y para cambiar el contenido del span
            this.changeValue(name, event.target.checked, span);
        })
    }
}