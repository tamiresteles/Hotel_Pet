
document.addEventListener("DOMContentLoaded", function () {
    const nomeSalvo = localStorage.getItem("nomeCompletoUsuario");
    const nomeTopo = document.getElementById("nome-usuario-topo");

    if (nomeTopo && nomeSalvo) {
        nomeTopo.textContent = nomeSalvo;
    }
});
