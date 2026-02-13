document.getElementById('formPublicar').addEventListener('submit', async function (e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión como diseñador');
    return;
  }

  const formData = new FormData(this);

  try {
    const res = await fetch('http://localhost:3000/api/disenos/publicar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    const mensaje = document.getElementById('mensaje');

    if (res.ok) {
      mensaje.style.color = 'green';
      mensaje.textContent = data.message || '¡Diseño subido con éxito!';
      this.reset();

      // Esperar 2 segundos y redirigir al catálogo
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      mensaje.style.color = 'red';
      mensaje.textContent = data.message || 'Error al publicar diseño';
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
    console.error(error);
  }
});
