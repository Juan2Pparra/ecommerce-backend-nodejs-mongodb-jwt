// Cambiar entre formularios de login y registro
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");

    document.querySelectorAll(".formulario").forEach((form) => {
      form.classList.remove("active");
    });
    document.getElementById(target).classList.add("active");

    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Registro
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreRegistro").value;
  const email = document.getElementById("emailRegistro").value;
  const password = document.getElementById("passwordRegistro").value;
  const rol = document.getElementById("rolRegistro").value;

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password, rol }),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("registerError").innerText = data.message;
      document.getElementById("registerError").style.display = "block";
      document.getElementById("registerSuccess").style.display = "none";
      return;
    }

    document.getElementById("registerSuccess").innerText = data.message;
    document.getElementById("registerSuccess").style.display = "block";
    document.getElementById("registerError").style.display = "none";
  } catch (error) {
    document.getElementById("registerError").innerText = "Error al conectar con el servidor";
    document.getElementById("registerError").style.display = "block";
    document.getElementById("registerSuccess").style.display = "none";
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("loginError").innerText = data.message;
      document.getElementById("loginError").style.display = "block";
      return;
    }

    // Guardar token y datos del usuario en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);
    localStorage.setItem("email", data.email);
    localStorage.setItem("rol", data.rol);

    // Redirigir a la página principal
    window.location.href = "index.html"; 
  } catch (error) {
    document.getElementById("loginError").innerText = "Error al conectar con el servidor";
    document.getElementById("loginError").style.display = "block";
  }
});
