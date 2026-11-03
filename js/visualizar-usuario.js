
document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(function (item) {
        return item.id === id;
    });

    if (!usuario) {
        alert("Usuário não encontrado!");
        window.location.href = "usuarios.html";
        return;
    }

    const nomeCompleto =
        usuario.nome + " " + (usuario.sobrenome || "");

    // Dados pessoais
    const campos = document.querySelectorAll(
        ".informacoes-usuario .campo-visualizacao strong"
    );

    const dados = [
        usuario.id,
        nomeCompleto,
        usuario.email,
        usuario.telefone,
        usuario.funcao === "funcionario"
            ? "Funcionário"
            : usuario.funcao === "gerente"
                ? "Gerente"
                : "Cliente",
        usuario.status === "ativo" ? "Ativo" : "Inativo"
    ];

    campos.forEach(function (campo, indice) {
        campo.textContent = dados[indice] || "";
    });

    // Endereço
    const endereco = document.querySelectorAll(
        ".dados-endereco .campo-visualizacao strong"
    );

    const dadosEndereco = [
        usuario.cep,
        usuario.cidade,
        usuario.endereco,
        usuario.numero
    ];

    endereco.forEach(function (campo, indice) {
        campo.textContent = dadosEndereco[indice] || "";
    });

    // Foto do usuário
    const imagem = document.querySelector(".foto-usuario img");

    if (usuario.foto && imagem) {
        imagem.src = usuario.foto;
    }

    // Link para editar o usuário selecionado
    const botaoEditar = document.querySelector(
        ".botoes-visualizar-usuario .botao-principal"
    );

    if (botaoEditar) {
        botaoEditar.href = "editar-usuario.html?id=" + usuario.id;
    }
});
