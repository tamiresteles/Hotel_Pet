document.addEventListener("DOMContentLoaded", function () {
    const nomeSalvo = localStorage.getItem("nomeCompletoUsuario");

    const nomeTopo = document.getElementById("nome-usuario-topo");
    const nomeSaudacao = document.getElementById("nome-usuario-saudacao");

    if (nomeSalvo) {
        if (nomeTopo) {
            nomeTopo.textContent = nomeSalvo;
        }

        if (nomeSaudacao) {
            nomeSaudacao.textContent = nomeSalvo;
        }
    }
});
