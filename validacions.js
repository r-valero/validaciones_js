document
  .getElementById('registroForm')
  .addEventListener('submit', function (e) {
    e.preventDefault()
    let esValido = true

    // Limpiar mensajes de error
    document
      .querySelectorAll('.error')
      .forEach((span) => (span.textContent = ''))
    document.getElementById('mensajeExito').textContent = ''

    // Validar Nombre Completo
    const nombre = document.getElementById('nombre').value.trim()
    const palabrasNombre = nombre.split(' ')
    const regexNombre = /^[A-Z][a-z]+$/
    if (
      !nombre ||
      palabrasNombre.length < 3 ||
      !palabrasNombre.every((palabra) => regexNombre.test(palabra))
    ) {
      document.getElementById('error-nombre').textContent =
        'Debe ingresar al menos 3 palabras, cada una con mayúscula inicial.'
      esValido = false
    }

    // Validar Correo Electrónico
    const email = document.getElementById('email').value.trim()
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
      !regexEmail.test(email) ||
      email.startsWith('@') ||
      email.endsWith('@')
    ) {
      document.getElementById('error-email').textContent =
        'Ingrese un correo válido y que no inicie ni termine con "@".'
      esValido = false
    }

    // Validar Edad
    const edad = parseInt(document.getElementById('edad').value, 10)
    if (isNaN(edad) || edad < 18 || edad > 100) {
      document.getElementById('error-edad').textContent =
        'La edad debe ser un número entre 18 y 100.'
      esValido = false
    }

    // Validar Teléfono
    const telefono = document.getElementById('telefono').value.trim()
    const regexTelefono = /^\d{10}$/
    if (!regexTelefono.test(telefono)) {
      document.getElementById('error-telefono').textContent =
        'El número debe contener exactamente 10 dígitos sin espacios ni símbolos.'
      esValido = false
    }

    // Validar Género
    const genero = document.getElementById('genero').value
    if (!genero) {
      document.getElementById('error-genero').textContent =
        'Debe seleccionar un género.'
      esValido = false
    }

    // Validar Fecha de Nacimiento
    const fechaNacimiento = new Date(
      document.getElementById('fechaNacimiento').value
    )
    const hoy = new Date()
    const edadCalculada = hoy.getFullYear() - fechaNacimiento.getFullYear()
    const cumpleEsteAno =
      hoy.getMonth() > fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() &&
        hoy.getDate() >= fechaNacimiento.getDate())
    const edadFinal = cumpleEsteAno ? edadCalculada : edadCalculada - 1

    if (isNaN(fechaNacimiento.getTime())) {
      document.getElementById('error-fechaNacimiento').textContent =
        'Debe ingresar una fecha válida.'
      esValido = false
    } else if (edadFinal < 18) {
      document.getElementById('error-fechaNacimiento').textContent =
        'Debe ser mayor de 18 años.'
      esValido = false
    }

    // Validar Comentarios
    const comentarios = document.getElementById('comentarios').value
    if (comentarios.length > 300) {
      document.getElementById('error-comentarios').textContent =
        'Los comentarios no deben exceder los 300 caracteres.'
      esValido = false
    }

    // Si todo es válido
    if (esValido) {
      document.getElementById('mensajeExito').textContent =
        'Formulario enviado exitosamente.'
      // Aquí puedes enviar el formulario con fetch() o similar si lo necesitas
      // e.target.submit(); // Solo si quieres realmente enviarlo
    }
  })
