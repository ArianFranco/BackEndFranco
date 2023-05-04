const fs = require('fs');

const guardarDatos = (rutaArchivo, data) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(data));
};

const leerDatos = (rutaArchivo) => {
  try {
    const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    return [];
  }
};

const agregarProducto = (producto) => {
  const productos = leerDatos('./productos.json');
  productos.push(producto);
  guardarDatos('./productos.json', productos);
  return productos;
};

const buscarProducto = (id) => {
  const productos = leerDatos('./productos.json');
  const productoEncontrado = productos.find((producto) => producto.id === id);
  return productoEncontrado;
};

const eliminarProducto = (id) => {
  const productos = leerDatos('./productos.json');
  const indiceProducto = productos.findIndex((producto) => producto.id === id);
  if (indiceProducto !== -1) {
    productos.splice(indiceProducto, 1);
    guardarDatos('./productos.json', productos);
  }
  return productos;
};

module.exports = { agregarProducto, buscarProducto, eliminarProducto };