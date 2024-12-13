import { Check } from './check.js';

const Cliente = {
  send: (data) => {
    fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Ítem creado:', data);
      })
      .catch(error => {
        console.error('Error al crear el ítem:', error);
      });

  },
  get: () => {
    fetch('http://localhost:3000/')
      .then(response => response.text())
      .then(response => {
        //pendiente de programar para que se hagan tantos grupos como secciones con válvulas haya
             // for (let i = 1; i <= response; i++) {
        //   const check = new Check(document.getElementById(`grupo${i}`), Cliente);
        //   check.addCheck("riego1", document.getElementById(`riego1`));
        //   check.addCheck("riego2");
        // }
        console.log(response);
      })
      .catch(error => {
        console.error('Error al obtener la bienvenida:', error);
      });
  },
  getStates: () => {
    fetch('http://localhost:3000/api/items')
      .then(response => response.json())
      .then(data => {
    
        //hago un for of dentro del json que recibo para buscar el elemento que quiero y cambiar su estado
        for (const item of data) {
          const parentElement = document.getElementById(item.parent);
          console.log(item);
          if (parentElement) {
            // Busca el input por el atributo name
            const check = parentElement.querySelector(`label[data-name="${item.name}"] input[type="checkbox"]`
            );
            console.log('check:', check);
            if (check) {
              check.checked = item.state; // Corrige el estado del checkbox
              console.log('check:', check);
            }
          }
        }
      })
      .catch(error => {
        console.error('Error al obtener los ítems:', error);
      });
  }
  
}

Cliente.get();
Cliente.getStates();


const check1 = new Check(document.getElementById("grupo1"), Cliente);
check1.addCheck("riego1", document.getElementById("riego1")
);
check1.addCheck("riego2");

const check2 = new Check(document.getElementById("grupo2"), Cliente);
check2.addCheck("riego1");
check2.addCheck("riego2");

const check3 = new Check(document.getElementById("grupo3"), Cliente);
check3.addCheck("riego1");
check3.addCheck("riego2");

const check4 = new Check(document.getElementById("grupo4"), Cliente);
check4.addCheck("riego1");
check4.addCheck("riego2");

const check5 = new Check(document.getElementById("grupo5"), Cliente);
check5.addCheck("riego1");
check5.addCheck("riego2");


