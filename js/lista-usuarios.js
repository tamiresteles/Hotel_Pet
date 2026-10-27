
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-usuarios");
    const contador = document.getElementById("total-usuarios");
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoFuncao = document.getElementById("funcao");

    if (!tabela) {
        return;
    }

    const linhasOriginais = Array.from(tabela.querySelectorAll("tr"));

    function pesquisarUsuarios() {
        const nome = campoNome.value.trim().toLowerCase();
        const email = campoEmail.value.trim().toLowerCase();
        const funcao = campoFuncao.value.trim().toLowerCase();

        let totalEncontrados = 0;

        linhasOriginais.forEach(function (linha) {
            const celulas = linha.querySelectorAll("td");

            const nomeUsuario = celulas[1].textContent.trim().toLowerCase();
            const emailUsuario = celulas[2].textContent.trim().toLowerCase();
            const funcaoUsuario = celulas[4].textContent.trim().toLowerCase();

            const correspondeNome = nomeUsuario.includes(nome);
            const correspondeEmail = emailUsuario.includes(email);
            const correspondeFuncao =
                !funcao ||
                funcaoUsuario === funcao ||
                (funcao === "funcionario" &&
                    funcaoUsuario === "funcionário");

            const mostrar =
                correspondeNome &&
                correspondeEmail &&
                correspondeFuncao;

            linha.style.display = mostrar ? "" : "none";

            if (mostrar) {
                totalEncontrados++;
            }
        });

        let mensagem = document.getElementById("nenhum-usuario-encontrado");

        if (totalEncontrados === 0) {
            if (!mensagem) {
                mensagem = document.createElement("p");
                mensagem.id = "nenhum-usuario-encontrado";
                mensagem.textContent = "Nenhum usuário encontrado.";
                mensagem.style.textAlign = "center";
                tabela.closest(".tabela-container").appendChild(mensagem);
            }
        } else if (mensagem) {
            mensagem.remove();
        }

        if (contador) {
            contador.textContent =
                totalEncontrados +
                (totalEncontrados === 1
                    ? " usuário encontrado"
                    : " usuários encontrados");
        }
    }

    if (campoNome) {
        campoNome.addEventListener("input", pesquisarUsuarios);
    }

    if (campoEmail) {
        campoEmail.addEventListener("input", pesquisarUsuarios);
    }

    if (campoFuncao) {
        campoFuncao.addEventListener("change", pesquisarUsuarios);
    }

    const formulario = campoNome
        ? campoNome.closest("form")
        : null;

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            pesquisarUsuarios();
        });
    }

    pesquisarUsuarios();
});
