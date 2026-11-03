
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");

    if (!formulario) return;

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(function (item) {
        return item.id === id;
    });

    if (!usuario) {
        alert("Usuário não encontrado!");
        window.location.href = "usuarios.html";
        return;
    }

    // Preencher os campos
    document.getElementById("id").value = usuario.id;
    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("sobrenome").value = usuario.sobrenome || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("telefone").value = usuario.telefone || "";
    document.getElementById("cep").value = usuario.cep || "";
    document.getElementById("cidade").value = usuario.cidade || "";
    document.getElementById("endereco").value = usuario.endereco || "";
    document.getElementById("numero").value = usuario.numero || "";
    document.getElementById("funcao").value = usuario.funcao || "cliente";
    document.getElementById("status").value = usuario.status || "ativo";

    // Guardar os dados originais para o botão Limpar
    Array.from(formulario.elements).forEach(function (campo) {
        if (campo.tagName === "SELECT") {
            Array.from(campo.options).forEach(function (opcao) {
                opcao.defaultSelected = opcao.selected;
            });
        } else if (campo.type !== "file") {
            campo.defaultValue = campo.value;
        }
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha || confirmarSenha) {
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }
        }

        const email = document.getElementById("email").value.trim();

        const emailExiste = usuarios.some(function (item) {
            return item.id !== id &&
                item.email.toLowerCase() === email.toLowerCase();
        });

        if (emailExiste) {
            alert("Este e-mail já está cadastrado para outro usuário!");
            return;
        }

        usuario.nome = document.getElementById("nome").value.trim();
        usuario.sobrenome = document.getElementById("sobrenome").value.trim();
        usuario.email = email;
        usuario.telefone = document.getElementById("telefone").value.trim();
        usuario.cep = document.getElementById("cep").value.trim();
        usuario.cidade = document.getElementById("cidade").value.trim();
        usuario.endereco = document.getElementById("endereco").value.trim();
        usuario.numero = document.getElementById("numero").value.trim();
        usuario.funcao = document.getElementById("funcao").value;
        usuario.status = document.getElementById("status").value;

        const foto = document.getElementById("foto").files[0];

        function salvarAlteracoes() {
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Usuário atualizado com sucesso!");
            window.location.href = "usuarios.html";
        }

        if (foto) {
            const leitor = new FileReader();

            leitor.onload = function () {
                usuario.foto = leitor.result;
                salvarAlteracoes();
            };

            leitor.readAsDataURL(foto);
        } else {
            salvarAlteracoes();
        }
    });
});
