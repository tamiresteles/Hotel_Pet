
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-pets");
    const contador = document.getElementById("total-pets");
    const pesquisa = document.getElementById("pesquisa");

    const petsIniciais = [
        {
            id: "001",
            nome: "Max",
            raca: "Labrador",
            idade: "4",
            tutor: "Rafael Costa",
            status: "Ativo",
            observacoes: "Cachorro dócil e brincalhão. Gosta de passear e interagir com pessoas. Alimentação duas vezes ao dia."
        },
        {
            id: "002",
            nome: "Belinha",
            raca: "Shih-tzu",
            idade: "3",
            tutor: "Juliana Mendes",
            status: "Ativo",
            observacoes: "Cachorra tranquila e carinhosa. Gosta de colo e de ambientes confortáveis. Recomenda-se escovar os pelos diariamente."
        },
        {
            id: "003",
            nome: "Nina",
            raca: "Poodle",
            idade: "5",
            tutor: "Pedro Henrique",
            status: "Ativo",
            observacoes: "Cachorra ativa e inteligente. Gosta de brincar e passear. Precisa de atividades e atenção durante a hospedagem."
        },
        {
            id: "004",
            nome: "Caramelo",
            raca: "SRD",
            idade: "2",
            tutor: "Lucas Almeida",
            status: "Ativo",
            observacoes: "Cachorro sociável e curioso. Gosta de explorar o ambiente. Precisa de água fresca, alimentação regular e passeios supervisionados."
        },
        {
            id: "005",
            nome: "Floquinho",
            raca: "Mini Lop",
            idade: "2",
            tutor: "Juliana Mendes",
            status: "Ativo",
            foto: "../imagens/floquinho.jpg",
            observacoes: "Coelho dócil e sensível. Precisa de ambiente tranquilo, alimentação adequada e cuidados com a higiene do espaço."
        }
    ];

    // Cria a lista inicial apenas se ainda não houver pets salvos.
    if (localStorage.getItem("pets") === null) {
        localStorage.setItem("pets", JSON.stringify(petsIniciais));
    }

    // Mantém os pets existentes e acrescenta o Floquinho se estiver faltando.
    let petsSalvos = JSON.parse(localStorage.getItem("pets")) || [];

    const floquinhoExiste = petsSalvos.some(
        pet => String(pet.id) === "005" ||
        (pet.nome || "").toLowerCase() === "floquinho"
    );

    if (!floquinhoExiste) {
        petsSalvos.push(petsIniciais[4]);
    }

    // Adiciona observações aos pets iniciais que ainda não possuem uma.
    petsSalvos = petsSalvos.map(function (pet) {
        const petInicial = petsIniciais.find(
            inicial => String(inicial.id) === String(pet.id)
        );

        if (
            petInicial &&
            (!pet.observacoes || !pet.observacoes.trim())
        ) {
            pet.observacoes = petInicial.observacoes;
        }

        return pet;
    });

    localStorage.setItem("pets", JSON.stringify(petsSalvos));

    function carregarPets() {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        const termo = pesquisa
            ? pesquisa.value.trim().toLowerCase()
            : "";

        const petsFiltrados = pets.filter(pet =>
            (pet.nome || "").toLowerCase().includes(termo)
        );

        if (tabela) {
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
                visualizar.href = "visualizar-pet.html?id=" +
                    encodeURIComponent(pet.id);
                visualizar.textContent = "Visualizar";

                const editar = document.createElement("a");
                editar.href = "editar-pet.html?id=" +
                    encodeURIComponent(pet.id);
                editar.textContent = "Editar";

                acoes.appendChild(visualizar);
                acoes.appendChild(document.createTextNode(" "));
                acoes.appendChild(editar);

                linha.appendChild(acoes);
                tabela.appendChild(linha);
            });
        }

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
