document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const pet = document.getElementById("pet");
    const tutor = document.getElementById("tutor");
    const entrada = document.getElementById("entrada");
    const saida = document.getElementById("saida");
    const alimentacao = document.getElementById("alimentacao");
    const medicacao = document.getElementById("medicacao");
    const observacoes = document.getElementById("observacoes");
    const pagamento = document.getElementById("forma-pagamento");
    const status = document.getElementById("status");
    const valor = document.getElementById("valor");
    const total = document.getElementById("valor-total");

    function converterValor(texto) {
        return Number(
            texto.replace("R$", "").trim().replace(/\./g, "").replace(",", ".")
        );
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (new Date(saida.value) <= new Date(entrada.value)) {
            alert("A data de saída deve ser posterior à data de entrada.");
            return;
        }

        const diaria = converterValor(valor.value);
        const dataEntrada = new Date(entrada.value + "T00:00:00");
        const dataSaida = new Date(saida.value + "T00:00:00");

        const diarias = (dataSaida - dataEntrada) / (1000 * 60 * 60 * 24);
        const valorTotal = diaria * diarias;
        const vagasDisponiveis = Number(localStorage.getItem("vagas")) || 5;

        const reservasSobrepostas = reservas.filter(function (reserva) {
            if (reserva.status === "cancelada") {
                return false;
            }

            return reserva.entrada < saida.value &&
                reserva.saida > entrada.value;
        });

        if (reservasSobrepostas.length >= vagasDisponiveis) {
            alert("Não há vagas disponíveis para esse período!");
            return;
        }

        let maiorId = 103;

        reservas.forEach(function (reserva) {
            if (Number(reserva.id) > maiorId) {
                maiorId = Number(reserva.id);
            }
        });

        const novaReserva = {
            id: maiorId + 1,
            pet: pet.value,
            tutor: tutor.value,
            entrada: entrada.value,
            saida: saida.value,
            alimentacao: alimentacao.value,
            medicacao: medicacao.value,
            observacoes: observacoes.value,
            formaPagamento: pagamento.value,
            status: status.value,
            valor: valor.value,
            diarias: diarias,
            total: valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        };

        reservas.push(novaReserva);

        localStorage.setItem("reservas", JSON.stringify(reservas));

        alert("Reserva cadastrada com sucesso!");

        window.location.href = "reservas.html";
    });
});