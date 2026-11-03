
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");

    if (!formulario) {
        return;
    }

    // Usuários que já existem na tabela
    const usuariosIniciais = [
        {
            id: "001",
            nome: "Rafael",
            sobrenome: "Costa",
            email: "rafael.costa@email.com",
            telefone: "(77) 98888-1122",
            funcao: "cliente",
            status: "ativo",
            cep: "47500-000",
            cidade: "Paratinga",
            endereco: "Rua das Flores",
            numero: "215"
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

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const email = document.getElementById("email").value.trim();

        const emailExiste = usuarios.some(function (usuario) {
            return usuario.email.toLowerCase() === email.toLowerCase();
        });

        if (emailExiste) {
            alert("Este e-mail já está cadastrado!");
            return;
        }

        const maiorId = usuarios.reduce(function (maior, usuario) {
            return Math.max(maior, Number(usuario.id));
        }, 0);

        const novoUsuario = {
            id: String(maiorId + 1).padStart(3, "0"),
            nome: document.getElementById("nome").value.trim(),
            sobrenome: document.getElementById("sobrenome").value.trim(),
            email: email,
            telefone: document.getElementById("telefone").value.trim(),
            cep: document.getElementById("cep").value.trim(),
            cidade: document.getElementById("cidade").value.trim(),
            endereco: document.getElementById("endereco").value.trim(),
            numero: document.getElementById("numero").value.trim(),
            funcao: document.getElementById("funcao").value,
            status: document.getElementById("status").value
        };

        const foto = document.getElementById("foto").files[0];

        function salvarUsuario() {
            usuarios.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Usuário cadastrado com sucesso!");
            window.location.href = "usuarios.html";
        }

        if (foto) {
            const leitor = new FileReader();

            leitor.onload = function () {
                novoUsuario.foto = leitor.result;
                salvarUsuario();
            };

            leitor.readAsDataURL(foto);
        } else {
            salvarUsuario();
        }
    });
});
