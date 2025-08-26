let movimientos = [];

// Cargar datos desde localStorage al iniciar
window.onload = function() {
  const datosGuardados = localStorage.getItem("movimientos");
  if (datosGuardados) {
    movimientos = JSON.parse(datosGuardados);
    actualizarUI();
  }
}

function guardarEnLocal() {
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

function agregarMovimiento() {
  const descripcion = document.getElementById("descripcion").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const tipo = document.getElementById("tipo").value;

  if (!descripcion || isNaN(monto) || monto <= 0) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const movimiento = { descripcion, monto, tipo };
  movimientos.push(movimiento);
  guardarEnLocal();
  actualizarUI();

  // Limpiar inputs
  document.getElementById("descripcion").value = "";
  document.getElementById("monto").value = "";
}

function eliminarMovimiento(index) {
  movimientos.splice(index, 1);
  guardarEnLocal();
  actualizarUI();
}

function actualizarUI() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let totalIngresos = 0;
  let totalGastos = 0;

  movimientos.forEach((m, index) => {
    const li = document.createElement("li");
    li.classList.add(m.tipo === "ingreso" ? "ingreso" : "gasto");
    li.innerHTML = `
      ${m.descripcion}: $${m.monto}
      <button class="btn-eliminar" onclick="eliminarMovimiento(${index})">X</button>
    `;
    lista.appendChild(li);

    if (m.tipo === "ingreso") totalIngresos += m.monto;
    else totalGastos += m.monto;
  });

  document.getElementById("totalIngresos").textContent = totalIngresos;
  document.getElementById("totalGastos").textContent = totalGastos;
  document.getElementById("saldo").textContent = totalIngresos - totalGastos;
}
