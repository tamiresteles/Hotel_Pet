
document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("form");

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const parametros = new URLSearchParams(window.location.search);
    const idReserva = parametros.get("id");

    const reserva = reservas.find(function (item) {
        return String(item.id) === String(idReserva);
    });

    if (!reserva) {
        alert("Reserva não encontrada.");
        window.location.href = "reservas.html";
        return;
    }

    const entrada = document.getElementById("entrada");
    const saida = document.getElementById("saida");
    const campoDiarias = document.getElementById("diarias");
    const campoValor = document.getElementById("valor");
    const campoTotal = document.getElementById("total");

    function calcularDiarias() {
        if (!entrada.value || !saida.value) {
            return 0;
        }

        const dataEntrada = new Date(entrada.value + "T00:00:00");
        const dataSaida = new Date(saida.value + "T00:00:00");

        const diferenca = dataSaida - dataEntrada;

        return diferenca / (1000 * 60 * 60 * 24);
    }

    function converterValor(texto) {
        return Number(
            String(texto).replace("R$", "").trim()
                .replace(/\./g, "").replace(",", ".")
        );
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function atualizarValores() {
        const diarias = calcularDiarias();

        if (diarias <= 0) {
            campoDiarias.value = 0;
            campoTotal.value = formatarMoeda(0);
            return;
        }

        const valorDiaria = converterValor(campoValor.value);
        const total = diarias * valorDiaria;

        campoDiarias.value = diarias;
        campoTotal.value = formatarMoeda(total);
    }

    // Preencher os dados da reserva
    document.getElementById("id").value = reserva.id;
    document.getElementById("status").value = reserva.status;
    document.getElementById("pet").value = reserva.pet;
    document.getElementById("tutor").value = reserva.tutor;
    entrada.value = reserva.entrada;
    saida.value = reserva.saida;
    document.getElementById("alimentacao").value = reserva.alimentacao;
    document.getElementById("medicacao").value = reserva.medicacao;
    document.getElementById("observacoes").value = reserva.observacoes;
    document.getElementById("forma-pagamento").value = reserva.formaPagamento;
    campoValor.value = reserva.valor || "R$ 95,00";

    // Calcula as diárias também para reservas antigas
    atualizarValores();

    // Atualiza os valores quando as datas forem alteradas
    entrada.addEventListener("change", atualizarValores);
    saida.addEventListener("change", atualizarValores);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const diarias = calcularDiarias();

        if (diarias <= 0) {
            alert("A data de saída deve ser posterior à data de entrada.");
            return;
        }

        const valorDiaria = converterValor(campoValor.value);
        const total = diarias * valorDiaria;

        reserva.status = document.getElementById("status").value;
        reserva.pet = document.getElementById("pet").value;
        reserva.tutor = document.getElementById("tutor").value;
        reserva.entrada = entrada.value;
        reserva.saida = saida.value;
        reserva.alimentacao = document.getElementById("alimentacao").value;
        reserva.medicacao = document.getElementById("medicacao").value;
        reserva.observacoes = document.getElementById("observacoes").value;
        reserva.formaPagamento = document.getElementById("forma-pagamento").value;
        reserva.valor = campoValor.value;
        reserva.diarias = diarias;
        reserva.total = formatarMoeda(total);

        localStorage.setItem("reservas", JSON.stringify(reservas));

        alert("Reserva atualizada com sucesso!");

        window.location.href = "reservas.html";
    });

});
