
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".painel-formulario form");

    if (!formulario) return;

    const parametros = new URLSearchParams(window.location.search);
    const idPet = parametros.get("id");

    const campos = {
        id: document.getElementById("id"),
        nome: document.getElementById("nome"),
        raca: document.getElementById("raca"),
        idade: document.getElementById("idade"),
        sexo: document.getElementById("sexo"),
        porte: document.getElementById("porte"),
        tutor: document.getElementById("tutor"),
        status: document.getElementById("status"),
        observacoes: document.getElementById("observacoes"),
        foto: document.getElementById("foto")
    };

    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    let pet = pets.find(function (animal) {
        return String(animal.id) === String(idPet || campos.id.value);
    });

    if (pet) {
        campos.id.value = pet.id || "";
        campos.nome.value = pet.nome || "";
        campos.raca.value = pet.raca || "";
        campos.idade.value = pet.idade || "";
        campos.sexo.value = (pet.sexo || "").toLowerCase();
        campos.porte.value = (pet.porte || "").toLowerCase();
        campos.tutor.value = obterValorTutor(pet.tutor);
        campos.status.value = (pet.status || "Ativo").toLowerCase();
        campos.observacoes.value = pet.observacoes || "";
    }

    function obterValorTutor(tutor) {
        const tutores = {
            "Rafael Costa": "rafael",
            "Juliana Mendes": "juliana",
            "Pedro Henrique": "pedro",
            "Lucas Almeida": "lucas"
        };

        return tutores[tutor] || tutor || "";
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!pet) {
            alert("Pet não encontrado. Volte à lista e clique em Editar no pet desejado.");
            return;
        }

        function salvarPet(fotoAtualizada) {
            pet.nome = campos.nome.value.trim();
            pet.raca = campos.raca.value.trim();
            pet.idade = campos.idade.value;
            pet.sexo = campos.sexo.value;
            pet.porte = campos.porte.value;
            pet.tutor = campos.tutor.options[campos.tutor.selectedIndex].text;
            pet.status = campos.status.value === "ativo" ? "Ativo" : "Inativo";
            pet.observacoes = campos.observacoes.value.trim();

            if (fotoAtualizada) {
                pet.foto = fotoAtualizada;
            }

            const indice = pets.findIndex(function (animal) {
                return String(animal.id) === String(pet.id);
            });

            if (indice !== -1) {
                pets[indice] = pet;
                localStorage.setItem("pets", JSON.stringify(pets));
                alert("Pet atualizado com sucesso!");
                window.location.href = "visualizar-pet.html?id=" +
                    encodeURIComponent(pet.id);
            }
        }

        if (campos.foto.files && campos.foto.files[0]) {
            const leitor = new FileReader();

            leitor.onload = function () {
                salvarPet(leitor.result);
            };

            leitor.readAsDataURL(campos.foto.files[0]);
        } else {
            salvarPet(null);
        }
    });
});
