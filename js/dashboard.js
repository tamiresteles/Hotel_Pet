
document.addEventListener("DOMContentLoaded", function () {

    // Recupera os dados salvos no navegador
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const vagasConfiguradas = Number(localStorage.getItem("vagas") ?? 4);

    // Obtém a data atual no formato AAAA-MM-DD
    const hoje = new Date();

    const dataHoje =
        hoje.getFullYear() + "-" +
        String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoje.getDate()).padStart(2, "0");

    function normalizar(texto) {
        return String(texto || "").trim().toLowerCase();
    }

    // Identifica os pets hospedados atualmente
    const reservasHospedadas = reservas.filter(function (reserva) {
        const status = normalizar(reserva.status);

        return status !== "cancelada" &&
            status !== "finalizada" &&
            reserva.entrada <= dataHoje &&
            reserva.saida > dataHoje;
    });

    const petsHospedados = new Set(
        reservasHospedadas.map(function (reserva) {
            return normalizar(reserva.pet);
        })
    );

    // Conta as reservas agendadas e confirmadas
    const reservasAtivas = reservas.filter(function (reserva) {
        const status = normalizar(reserva.status);

        return (
            (status === "agendada" || status === "confirmada") &&
            reserva.saida > dataHoje
        );
    });

    // Atualiza os indicadores do Dashboard
    const contadorPets = document.getElementById("total-pets-dashboard");
    const contadorReservas = document.getElementById("total-reservas-dashboard");
    const contadorUsuarios = document.getElementById("total-usuarios-dashboard");
    const contadorVagas = document.getElementById("total-vagas-dashboard");

    if (contadorPets) {
        contadorPets.textContent = petsHospedados.size;
    }

    if (contadorReservas) {
        contadorReservas.textContent = reservasAtivas.length;
    }

    if (contadorUsuarios) {
        contadorUsuarios.textContent = usuarios.length;
    }

    if (contadorVagas) {
        contadorVagas.textContent = Math.max(
            0,
            vagasConfiguradas - reservasHospedadas.length
        );
    }

    // Converte os nomes dos pets para exibição
    function nomePet(valor) {
        const pet = pets.find(function (item) {
            return normalizar(item.nome) === normalizar(valor) ||
                String(item.id) === String(valor);
        });

        if (pet) return pet.nome;

        const nomes = {
            max: "Max",
            belinha: "Belinha",
            nina: "Nina",
            caramelo: "Caramelo",
            floquinho: "Floquinho"
        };

        return nomes[normalizar(valor)] || valor;
    }

    // Converte os nomes dos tutores para exibição
    function nomeTutor(valor) {
        const usuario = usuarios.find(function (item) {
            const nomeCompleto =
                item.nome + " " + (item.sobrenome || "");

            return normalizar(item.nome) === normalizar(valor) ||
                normalizar(nomeCompleto) === normalizar(valor) ||
                String(item.id) === String(valor);
        });

        if (usuario) {
            return usuario.nome + " " + (usuario.sobrenome || "");
        }

        const tutores = {
            rafael: "Rafael Costa",
            juliana: "Juliana Mendes",
            pedro: "Pedro Henrique",
            lucas: "Lucas Almeida"
        };

        return tutores[normalizar(valor)] || valor;
    }

    // Formata as datas
    function formatarData(data) {
        if (!data) return "";

        const partes = data.split("-");

        if (partes.length !== 3) return data;

        return partes[2] + "/" + partes[1] + "/" + partes[0];
    }

    // Atualiza a tabela de próximas reservas
    const tabela = document.getElementById(
        "lista-proximas-reservas-dashboard"
    );

    if (tabela) {

        tabela.innerHTML = "";

        const proximasReservas = reservas
            .filter(function (reserva) {
                const status = normalizar(reserva.status);

                return status !== "cancelada" &&
                    status !== "finalizada" &&
                    reserva.saida > dataHoje;
            })
            .sort(function (a, b) {
                return a.entrada.localeCompare(b.entrada);
            })
            .slice(0, 5);

        if (proximasReservas.length === 0) {

            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 6;
            celula.textContent = "Nenhuma próxima reserva encontrada.";

            linha.appendChild(celula);
            tabela.appendChild(linha);

        } else {

            proximasReservas.forEach(function (reserva) {

                const linha = document.createElement("tr");

                const dados = [
                    reserva.id,
                    nomePet(reserva.pet),
                    nomeTutor(reserva.tutor),
                    formatarData(reserva.entrada),
                    formatarData(reserva.saida),
                    reserva.status.charAt(0).toUpperCase() +
                        reserva.status.slice(1)
                ];

                dados.forEach(function (dado) {
                    const celula = document.createElement("td");
                    celula.textContent = dado;
                    linha.appendChild(celula);
                });

                tabela.appendChild(linha);
            });
        }
    }

});
