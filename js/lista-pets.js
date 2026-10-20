document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-pets");
    const contador = document.getElementById("total-pets");
    const pesquisa = document.getElementById("pesquisa");

    if (!tabela) {
        return;
    }

    // Mantém os quatro pets de exemplo na primeira utilização.
    if (localStorage.getItem("pets") === null) {
        const petsIniciais = [
            {
                id: "001",
                nome: "Max",
                raca: "Labrador",
                idade: "4",
                tutor: "Rafael Costa",
                status: "Ativo"
            },
            {
                id: "002",
                nome: "Belinha",
                raca: "Shih-tzu",
                idade: "3",
                tutor: "Juliana Mendes",
                status: "Ativo"
            },
            {
                id: "003",
                nome: "Nina",
                raca: "Poodle",
                idade: "5",
                tutor: "Pedro Henrique",
                status: "Ativo"
            },
            {
                id: "004",
                nome: "Caramelo",
                raca: "SRD",
                idade: "2",
                tutor: "Lucas Almeida",
                status: "Ativo"
            }
        ];

        localStorage.setItem("pets", JSON.stringify(petsIniciais));
    }

    function carregarPets() {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        const termo = pesquisa ? pesquisa.value.trim().toLowerCase() : "";

        const petsFiltrados = pets.filter(function (pet) {
            return (pet.nome || "").toLowerCase().includes(termo);
        });

        tabela.innerHTML = "";

        petsFiltrados.forEach(function (pet, indice) {
            const linha = document.createElement("tr");

            const dados = [
                String(indice + 1).padStart(3, "0"),
                pet.nome || "",
                pet.raca || "",
                pet.idade ? pet.idade + " anos" : "",
                pet.tutor || "",
                pet.status || "Ativo"
            ];

            dados.forEach(function (dado) {
                const celula = document.createElement("td");
                celula.textContent = dado;
                linha.appendChild(celula);
            });

            const acoes = document.createElement("td");

            const visualizar = document.createElement("a");
visualizar.href = "visualizar-pet.html?id=" + encodeURIComponent(pet.id);
visualizar.textContent = "Visualizar";

            const editar = document.createElement("a");
            editar.href = "editar-pet.html";
            editar.textContent = "Editar";

            acoes.appendChild(visualizar);
            acoes.appendChild(document.createTextNode(" "));
            acoes.appendChild(editar);
            linha.appendChild(acoes);

            tabela.appendChild(linha);
        });

        if (contador) {
            contador.textContent = petsFiltrados.length +
                (petsFiltrados.length === 1
                    ? " pet encontrado"
                    : " pets encontrados");
        }
    }

    if (pesquisa) {
        pesquisa.addEventListener("input", carregarPets);
    }

    carregarPets();
});