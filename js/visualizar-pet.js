
document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search);
    const idPet = parametros.get("id");

    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    const pet = pets.find(function (animal) {
        return String(animal.id) === String(idPet);
    });

    if (!pet) {
        alert("Pet não encontrado.");
        window.location.href = "pets.html";
        return;
    }

    document.getElementById("nome-pet").textContent = pet.nome || "";
    document.getElementById("raca-pet").textContent = pet.raca || "";

    document.getElementById("idade-pet").textContent =
        pet.idade ? pet.idade + " anos" : "";

    document.getElementById("sexo-pet").textContent =
        pet.sexo || "Não informado";

    document.getElementById("porte-pet").textContent =
        pet.porte || "Não informado";

    document.getElementById("tutor-pet").textContent =
        pet.tutor || "Não informado";

    document.getElementById("status-pet").textContent =
        pet.status || "Ativo";

    document.getElementById("observacoes-pet").textContent =
        pet.observacoes || "Nenhuma observação cadastrada.";

    const foto = document.getElementById("foto-pet");

    if (pet.foto && !pet.foto.startsWith("../imagens/")) {
        foto.src = pet.foto;
    } else {
        const fotosPets = {
            "max": "../imagens/max.png",
            "belinha": "../imagens/belinha.jpg",
            "nina": "../imagens/nina.jpg",
            "caramelo": "../imagens/caramelo.jpg",
            "floquinho": "../imagens/floquinho.jpg"
        };

        const nomePet = (pet.nome || "").toLowerCase();
        foto.src = fotosPets[nomePet] || "../imagens/max (1).png";
    }

    foto.alt = "Foto de " + pet.nome;
});
