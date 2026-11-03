
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-usuarios");
    const contador = document.getElementById("total-usuarios");
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoFuncao = document.getElementById("funcao");

    if (!tabela) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function pesquisarUsuarios() {
        const nome = normalizar(campoNome.value.trim());
        const email = normalizar(campoEmail.value.trim());
        const funcao = normalizar(campoFuncao.value.trim());

        const encontrados = usuarios.filter(function (usuario) {
            const nomeCompleto = normalizar(
                usuario.nome + " " + (usuario.sobrenome || "")
            );

            return nomeCompleto.includes(nome) &&
                normalizar(usuario.email).includes(email) &&
                (!funcao || normalizar(usuario.funcao) === funcao);
        });

        tabela.innerHTML = "";

        encontrados.forEach(function (usuario) {
            const linha = document.createElement("tr");

            const nomeCompleto =
                usuario.nome + " " + (usuario.sobrenome || "");

            const funcaoExibida = {
                cliente: "Cliente",
                funcionario: "Funcionário",
                gerente: "Gerente"
            };

            linha.innerHTML = `
                <td>${usuario.id}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${funcaoExibida[usuario.funcao] || usuario.funcao}</td>
                <td>${usuario.status === "ativo" ? "Ativo" : "Inativo"}</td>
                <td>
                    <a href="visualizar-usuario.html?id=${usuario.id}">
                        Visualizar
                    </a>
                    <a href="editar-usuario.html?id=${usuario.id}">
                        Editar
                    </a>
                </td>
            `;

            linha.children[1].textContent = nomeCompleto;
            linha.children[2].textContent = usuario.email;
            linha.children[3].textContent = usuario.telefone || "";

            tabela.appendChild(linha);
        });

        let mensagem = document.getElementById("nenhum-usuario-encontrado");

        if (encontrados.length === 0) {
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
                encontrados.length +
                (encontrados.length === 1
                    ? " usuário encontrado"
                    : " usuários encontrados");
        }
    }

    campoNome.addEventListener("input", pesquisarUsuarios);
    campoEmail.addEventListener("input", pesquisarUsuarios);
    campoFuncao.addEventListener("change", pesquisarUsuarios);

    pesquisarUsuarios();
});
