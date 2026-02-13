async function cargarCarrito() {
  const token = localStorage.getItem('token');
  const contenedor = document.getElementById('contenedor-carrito');
  const totalSpan = document.getElementById('total-carrito');

  let total = 0;

  if (!token) {
    contenedor.innerHTML = '<p>Debes iniciar sesión para ver tu carrito.</p>';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/carrito', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    contenedor.innerHTML = '';

    if (!data.productos || data.productos.length === 0) {
      contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
      return;
    }

    data.productos.forEach(item => {
      const prod = item.productoId;
      if (!prod) return;

      const subtotal = prod.precio * item.cantidad;

      const rutaImagen = prod.imagen.startsWith('http')
        ? prod.imagen
        : `http://localhost:3000/uploads/${prod.imagen}`;

      contenedor.innerHTML += `
        <div class="producto">
          <img src="${rutaImagen}" width="80"/>

          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion}</p>

          <p><strong>Talla:</strong> ${item.talla}</p>

          <div class="cantidad">
            <button onclick="cambiarCantidad('${prod._id}', ${item.cantidad - 1})">➖</button>
            <span>${item.cantidad}</span>
            <button onclick="cambiarCantidad('${prod._id}', ${item.cantidad + 1})">➕</button>
          </div>

          <p><strong>Subtotal:</strong> $${subtotal}</p>

          <button onclick="eliminarProducto('${prod._id}')">
            Eliminar
          </button>
        </div>
      `;

      total += subtotal;
    });

    totalSpan.textContent = total;

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<p>Error al cargar el carrito.</p>';
  }
}


// ELIMINAR
async function eliminarProducto(productoId) {
  const token = localStorage.getItem('token');

  await fetch(`http://localhost:3000/api/carrito/remove/${productoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  cargarCarrito();
}


// ACTUALIZAR CANTIDAD
async function cambiarCantidad(productoId, nuevaCantidad) {
  if (nuevaCantidad < 1) return;

  const token = localStorage.getItem('token');

  await fetch(`http://localhost:3000/api/carrito/update/${productoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ cantidad: nuevaCantidad })
  });

  cargarCarrito();
}


document.addEventListener('DOMContentLoaded', cargarCarrito);
