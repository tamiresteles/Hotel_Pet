
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-usuarios");
    const contador = document.getElementById("total-usuarios");
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoFuncao = document.getElementById("funcao");

    if (!tabela) return;

    const usuariosIniciais = [
    {
        id: "001",
        nome: "Rafael",
        sobrenome: "Costa",
        email: "rafael.costa@email.com",
        telefone: "(77) 98888-1122",
        funcao: "cliente",
        status: "ativo"
    },
    {
        id: "002",
        nome: "Juliana",
        sobrenome: "Mendes",
        email: "juliana.mendes@email.com",
        telefone: "(77) 97777-3344",
        funcao: "cliente",
        status: "ativo"
    },
    {
        id: "003",
        nome: "Pedro",
        sobrenome: "Henrique",
        email: "pedro.henrique@email.com",
        telefone: "(77) 96666-5566",
        funcao: "funcionario",
        status: "ativo"
    },
    {
        id: "004",
        nome: "Lucas",
        sobrenome: "Almeida",
        email: "lucas.almeida@email.com",
        telefone: "(77) 95555-7788",
        funcao: "cliente",
        status: "ativo"
    },
    {
        id: "005",
        nome: "Camila",
        sobrenome: "Oliveira",
        email: "camila.oliveira@email.com",
        telefone: "(77) 94444-9900",
        funcao: "gerente",
        status: "ativo"
    }
];

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

if (!usuarios) {
    usuarios = usuariosIniciais;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

    function normalizar(texto) {
        return String(texto || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function pesquisarUsuarios() {
        const nome = normalizar(campoNome.value);
        const email = normalizar(campoEmail.value);
        const funcao = normalizar(campoFuncao.value);

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
                    <a href="#" class="excluir-usuario">
                        Excluir
                    </a>
                </td>
            `;

            linha.children[1].textContent = nomeCompleto;
            linha.children[2].textContent = usuario.email;
            linha.children[3].textContent = usuario.telefone || "";

            const linkExcluir = linha.querySelector(".excluir-usuario");

            linkExcluir.addEventListener("click", function (event) {
                event.preventDefault();

                const reservas =
                    JSON.parse(localStorage.getItem("reservas")) || [];

                const tutoresConhecidos = {
                    rafael: "rafael costa",
                    juliana: "juliana mendes",
                    pedro: "pedro henrique",
                    lucas: "lucas almeida"
                };

                const identificadoresUsuario = [
                    usuario.id,
                    usuario.nome,
                    usuario.sobrenome,
                    nomeCompleto,
                    tutoresConhecidos[normalizar(usuario.nome)]
                ].map(normalizar);

                const possuiReserva = reservas.some(function (reserva) {
                    const tutorDaReserva = normalizar(reserva.tutor);

                    return identificadoresUsuario.includes(tutorDaReserva);
                });

                if (possuiReserva) {
                    alert(
                        "Não é possível excluir este usuário, pois ele possui reservas vinculadas."
                    );
                    return;
                }

                const confirmar = confirm(
                    "Deseja realmente excluir o usuário " + nomeCompleto + "?"
                );

                if (!confirmar) return;

                usuarios = usuarios.filter(function (item) {
                    return String(item.id) !== String(usuario.id);
                });

                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("Usuário excluído com sucesso!");

                pesquisarUsuarios();
            });

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
