const socket = io.connect();

socket.on('updateProducts', (data) => {
  const productsTable = document.getElementById('productsTable');
  productsTable.innerHTML = '';
  data.forEach((prod) => {
    productsTable.innerHTML += `<tr><td>${prod.title}</td><td>${prod.price}</td><td><img width="50" height="50" src="${prod.thumbnail}" alt="Producto"></td></tr>`;
  });
});

socket.on('productAdded', () => {
  console.log('Product added');
});

socket.on('productDeleted', () => {
  console.log('Product deleted');
});

const addProduct = () => {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('newProduct', product);
};

const deleteProduct = (id) => {
  socket.emit('deleteProduct', id);
};