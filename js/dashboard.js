
document.addEventListener("DOMContentLoaded", function () {

    // Recupera os dados salvos no navegador
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Recupera a quantidade de vagas configurada
    const vagasConfiguradas = Number(localStorage.getItem("vagas")) || 5;

    // Conta os pets ativos
    const totalPets = pets.filter(function (pet) {
        return String(pet.status).toLowerCase() !== "inativo";
    }).length;

    // Conta as reservas ativas
    const reservasAtivas = reservas.filter(function (reserva) {
        return reserva.status !== "cancelada" &&
               reserva.status !== "finalizada";
    }).length;

    // Calcula as vagas disponíveis
    const vagasDisponiveis = Math.max(
        0,
        vagasConfiguradas - reservasAtivas
    );

    // Atualiza os indicadores do Dashboard
    const contadorPets = document.getElementById("total-pets-dashboard");
    const contadorReservas = document.getElementById("total-reservas-dashboard");
    const contadorUsuarios = document.getElementById("total-usuarios-dashboard");
    const contadorVagas = document.getElementById("total-vagas-dashboard");

    if (contadorPets) {
        contadorPets.textContent = totalPets;
    }

    if (contadorReservas) {
        contadorReservas.textContent = reservasAtivas;
    }

    if (contadorUsuarios) {
        contadorUsuarios.textContent = usuarios.length;
    }

    if (contadorVagas) {
        contadorVagas.textContent = vagasDisponiveis;
    }

    // Formata as datas
    function formatarData(data) {
        if (!data) return "";
        return data.split("-").reverse().join("/");
    }

    // Identifica o nome do pet
    function nomePet(valor) {
        const encontrado = pets.find(function (pet) {
            return String(pet.nome).toLowerCase() === String(valor).toLowerCase()
                || String(pet.id) === String(valor);
        });

        if (encontrado) {
            return encontrado.nome;
        }

        const nomes = {
            max: "Max",
            belinha: "Belinha",
            nina: "Nina",
            caramelo: "Caramelo",
            floquinho: "Floquinho"
        };

        return nomes[String(valor).toLowerCase()] || valor;
    }

    // Identifica o nome do tutor
    function nomeTutor(valor) {
        const tutores = {
            rafael: "Rafael Costa",
            juliana: "Juliana Mendes",
            pedro: "Pedro Henrique",
            lucas: "Lucas Almeida"
        };

        return tutores[String(valor).toLowerCase()] || valor;
    }

    // Preenche a tabela de próximas reservas
    const tabelaReservas = document.getElementById(
        "lista-proximas-reservas-dashboard"
    );

    if (tabelaReservas) {

        tabelaReservas.innerHTML = "";

        const reservasParaMostrar = reservas
            .filter(function (reserva) {
                return reserva.status !== "cancelada" &&
                       reserva.status !== "finalizada";
            })
            .sort(function (a, b) {
                return new Date(a.entrada) - new Date(b.entrada);
            })
            .slice(0, 5);

        if (reservasParaMostrar.length === 0) {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td colspan="6">
                    Nenhuma próxima reserva encontrada.
                </td>
            `;

            tabelaReservas.appendChild(linha);

        } else {

            reservasParaMostrar.forEach(function (reserva) {

                const linha = document.createElement("tr");

                const statusFormatado = reserva.status
                    ? reserva.status.charAt(0).toUpperCase() +
                      reserva.status.slice(1)
                    : "";

                linha.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${nomePet(reserva.pet)}</td>
                    <td>${nomeTutor(reserva.tutor)}</td>
                    <td>${formatarData(reserva.entrada)}</td>
                    <td>${formatarData(reserva.saida)}</td>
                    <td>${statusFormatado}</td>
                `;

                tabelaReservas.appendChild(linha);
            });
        }
    }

});
