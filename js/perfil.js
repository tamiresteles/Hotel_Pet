document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-perfil");
    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");

    // Carrega os dados salvos
    nome.value = localStorage.getItem("nomeUsuario") || "Camila";
    sobrenome.value = localStorage.getItem("sobrenomeUsuario") || "Oliveira";

    // Salva os dados do perfil
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const primeiroNome = nome.value.trim();
        const ultimoNome = sobrenome.value.trim();
        const nomeCompleto = `${primeiroNome} ${ultimoNome}`;

        localStorage.setItem("nomeUsuario", primeiroNome);
        localStorage.setItem("sobrenomeUsuario", ultimoNome);
        localStorage.setItem("nomeCompletoUsuario", nomeCompleto);

        // Atualiza o nome no cabeçalho da página
        const nomeTopo = document.getElementById("nome-usuario-topo");

        if (nomeTopo) {
            nomeTopo.textContent = nomeCompleto;
        }

        alert("Perfil atualizado com sucesso!");
    });

    // Restaura os últimos dados salvos
    formulario.addEventListener("reset", function (event) {
        event.preventDefault();

        nome.value = localStorage.getItem("nomeUsuario") || "Camila";
        sobrenome.value = localStorage.getItem("sobrenomeUsuario") || "Oliveira";
    });
});
