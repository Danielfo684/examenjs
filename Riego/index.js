import express from 'express';
import cors from 'cors';
import e from 'express';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

const datos = {
    lista: []
}

// Rutas
app.get('/', (req, res) => {
    //pendiente de programar. Envía el número de secciones con válvulas que tendrá la
    // res.send(5);
    res.send('Bienvenido a la API de válvulas');

});

app.get('/api/items', (req, res) => {
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
  const existingItem = datos.lista.find(item => item.name === newItem.name && item.parent === newItem.parent);
    if (existingItem) {
existingItem.state = newItem.state;
//no he dado ningún uso a la id, pero la dejo en el código por si hace falta en futuros cambios.
existingItem.id = Date.now();
console.log(`Editamos ${existingItem.name} del grupo ${existingItem.parent} con estado ${existingItem.state}`);
res.status(201).json(newItem);
    } else {
        datos.lista.push(newItem);
        newItem.id = Date.now();
        console.log(`Llega ${newItem.name} del grupo ${newItem.parent} con estado ${newItem.state}`);
        res.status(201).json(newItem);
    }
   

});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
