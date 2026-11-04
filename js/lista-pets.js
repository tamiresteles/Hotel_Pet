
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
                acoes.appendChild(document.createTextNode(" "));

                const excluir = document.createElement("a");
                excluir.href = "#";
                excluir.textContent = "Excluir";

                excluir.addEventListener("click", function (event) {
                    event.preventDefault();

                    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

                    function normalizar(valor) {
                        return String(valor || "")
                            .trim()
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                    }

                    const nomesOriginais = {
                        "001": "max",
                        "002": "belinha",
                        "003": "nina",
                        "004": "caramelo",
                        "005": "floquinho"
                    };

                    const identificadoresPet = [
                        pet.id,
                        pet.nome,
                        nomesOriginais[String(pet.id)]
                    ].map(normalizar);

                    const possuiReserva = reservas.some(function (reserva) {
                        const petDaReserva = normalizar(reserva.pet);

                        return identificadoresPet.includes(petDaReserva);
                    });

                    if (possuiReserva) {
                        alert("Não é possível excluir este pet, pois ele possui reservas vinculadas.");
                        return;
                    }

                    const confirmar = confirm(
                        "Deseja realmente excluir o pet " + pet.nome + "?"
                    );

                    if (!confirmar) {
                        return;
                    }

                    let petsAtualizados = JSON.parse(localStorage.getItem("pets")) || [];

                    petsAtualizados = petsAtualizados.filter(function (item) {
                        return String(item.id) !== String(pet.id);
                    });

                    localStorage.setItem("pets", JSON.stringify(petsAtualizados));

                    alert("Pet excluído com sucesso!");

                    carregarPets();
                });

                acoes.appendChild(excluir);

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
