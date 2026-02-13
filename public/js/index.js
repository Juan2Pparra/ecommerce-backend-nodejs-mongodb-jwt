document.addEventListener('DOMContentLoaded', () => {
  cargarCatalogo();
  mostrarUsuario();
});

function mostrarUsuario() {
  const usuarioSpan = document.getElementById('usuarioNombre');
  const nombre = localStorage.getItem('nombre');
  const email = localStorage.getItem('email');
  const rol = localStorage.getItem('rol');

  if (nombre) {
    usuarioSpan.innerHTML = `
      <div class="perfil-menu">
        <span class="perfil-nombre">${nombre} ▼</span>
        <div class="perfil-dropdown">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Rol:</strong> ${rol}</p>
          <button id="cerrarSesion">Cerrar sesión</button>
        </div>
      </div>
    `;

    const perfilNombre = document.querySelector('.perfil-nombre');
    const dropdown = document.querySelector('.perfil-dropdown');

    perfilNombre.addEventListener('click', () => {
      dropdown.classList.toggle('visible');
    });

    document.getElementById('cerrarSesion').addEventListener('click', () => {
      localStorage.clear();
      window.location.href = 'login.html';
    });

    window.addEventListener('click', (e) => {
      if (!e.target.closest('.perfil-menu')) {
        dropdown.classList.remove('visible');
      }
    });
  } else {
    usuarioSpan.innerHTML = '<a href="login.html">Iniciar sesión</a>';
  }
}

async function cargarCatalogo() {
  const contenedor = document.getElementById('catalogoProductos');
  contenedor.innerHTML = '';

  try {
    const res = await fetch('http://localhost:3000/api/productos');
    const productos = await res.json();

    productos.forEach(prod => {
      const imagenSrc = prod.imagen
        ? `http://localhost:3000/uploads/${prod.imagen}`
        : '';

      contenedor.innerHTML += `
        <div class="producto">
          <img src="${imagenSrc}" alt="${prod.nombre}" />
          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion}</p>
          <p><strong>$${prod.precio}</strong></p>

          <label>Talla:</label>
          <select id="talla-${prod._id}">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <label>Cantidad:</label>
          <input type="number" id="cantidad-${prod._id}" value="1" min="1" max="10" />

          <button onclick="agregarCarrito('${prod._id}')">Agregar al Carrito</button>
        </div>
      `;
    });
  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
}
async function agregarCarrito(id) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Debes iniciar sesión');
    return;
  }

  const talla = document.getElementById(`talla-${id}`).value;
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);

  try {
    const res = await fetch('http://localhost:3000/api/carrito/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productoId: id,
        talla,
        cantidad
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("ERROR BACKEND:", data);
      alert(data.message || 'Error al agregar al carrito');
      return;
    }

    alert('Producto agregado correctamente al carrito ');

  } catch (error) {
    console.error("ERROR FETCH:", error);
    alert('Error al conectar con el servidor');
  }
}


