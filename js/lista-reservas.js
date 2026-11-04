document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-reservas");
    const contador = document.getElementById("total-reservas");
    const campoPet = document.getElementById("pet");
    const campoTutor = document.getElementById("tutor");
    const campoStatus = document.getElementById("status");

    if (!tabela) return;

    let reservas = JSON.parse(localStorage.getItem("reservas"));

    if (!reservas) {
        reservas = [
            {
                id: 101,
                pet: "max",
                tutor: "rafael",
                entrada: "2026-08-22",
                saida: "2026-08-26",
                valor: "R$ 95,00",
                total: "R$ 380,00",
                status: "confirmada"
            },
            {
                id: 102,
                pet: "belinha",
                tutor: "juliana",
                entrada: "2026-08-23",
                saida: "2026-08-25",
                valor: "R$ 95,00",
                total: "R$ 190,00",
                status: "agendada"
            },
            {
                id: 103,
                pet: "nina",
                tutor: "pedro",
                entrada: "2026-08-24",
                saida: "2026-08-29",
                valor: "R$ 95,00",
                total: "R$ 475,00",
                status: "confirmada"
            }
        ];

        localStorage.setItem("reservas", JSON.stringify(reservas));
    }

    function normalizar(texto) {
        return String(texto || "").trim().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function formatarData(data) {
        if (!data) return "";
        return data.split("-").reverse().join("/");
    }

    function nomePet(valor) {
        const pets = {
            max: "Max",
            belinha: "Belinha",
            nina: "Nina",
            caramelo: "Caramelo"
        };
        return pets[valor] || valor;
    }

    function nomeTutor(valor) {
        const tutores = {
            rafael: "Rafael Costa",
            juliana: "Juliana Mendes",
            pedro: "Pedro Henrique",
            lucas: "Lucas Almeida"
        };
        return tutores[valor] || valor;
    }

    function renderizarReservas() {
        const pet = normalizar(campoPet.value);
        const tutor = normalizar(campoTutor.value);
        const status = normalizar(campoStatus.value);

        tabela.innerHTML = "";
        let totalEncontrado = 0;

        reservas.forEach(function (reserva) {
            const correspondePet = normalizar(nomePet(reserva.pet)).includes(pet);
            const correspondeTutor = normalizar(nomeTutor(reserva.tutor)).includes(tutor);
            const correspondeStatus = !status || normalizar(reserva.status) === status;

            if (!correspondePet || !correspondeTutor || !correspondeStatus) {
                return;
            }

            totalEncontrado++;

            const linha = document.createElement("tr");

            linha.innerHTML = `
    <td>${reserva.id}</td>
    <td>${nomePet(reserva.pet)}</td>
    <td>${nomeTutor(reserva.tutor)}</td>
    <td>${formatarData(reserva.entrada)}</td>
    <td>${formatarData(reserva.saida)}</td>
    <td>${reserva.total}</td>
    <td>${reserva.status.charAt(0).toUpperCase() + reserva.status.slice(1)}</td>
    <td>
        <a href="visualizar-reserva.html?id=${reserva.id}">Visualizar</a>
        <a href="editar-reserva.html?id=${reserva.id}">Editar</a>
        <a href="#" class="excluir-reserva" data-id="${reserva.id}">Excluir</a>
    </td>
`;

            tabela.appendChild(linha);
            const botaoExcluir = linha.querySelector(".excluir-reserva");

botaoExcluir.addEventListener("click", function (event) {
    event.preventDefault();

    const confirmar = confirm(
        "Deseja realmente excluir esta reserva?"
    );

    if (!confirmar) {
        return;
    }

    reservas = reservas.filter(function (item) {
        return String(item.id) !== String(reserva.id);
    });

    localStorage.setItem("reservas", JSON.stringify(reservas));

    renderizarReservas();
});
        });

        let mensagem = document.getElementById("nenhuma-reserva-encontrada");

        if (totalEncontrado === 0) {
            if (!mensagem) {
                mensagem = document.createElement("p");
                mensagem.id = "nenhuma-reserva-encontrada";
                mensagem.textContent = "Nenhuma reserva encontrada.";
                mensagem.style.textAlign = "center";
                tabela.closest(".tabela-container")?.appendChild(mensagem);
            }
        } else if (mensagem) {
            mensagem.remove();
        }

        if (contador) {
            contador.textContent = totalEncontrado +
                (totalEncontrado === 1 ? " reserva encontrada" : " reservas encontradas");
        }
    }

    campoPet.addEventListener("input", renderizarReservas);
    campoTutor.addEventListener("input", renderizarReservas);
    campoStatus.addEventListener("change", renderizarReservas);

    renderizarReservas();
});