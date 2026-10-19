
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    const entrada = document.getElementById("entrada");
    const saida = document.getElementById("saida");
    const valorDiaria = document.getElementById("valor");
    const valorTotal = document.getElementById("valor-total");

    // Busca o valor da diária salvo nas configurações
    const diariaSalva = localStorage.getItem("valorDiaria");

    function converterValor(valor) {
        return Number(
            valor.replace("R$", "").trim().replace(/\./g, "").replace(",", ".")
        );
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    const diaria = diariaSalva
        ? converterValor(diariaSalva)
        : 95;

    valorDiaria.value = formatarMoeda(diaria);

    function calcularTotal() {
        if (!entrada.value || !saida.value) {
            valorTotal.value = formatarMoeda(0);
            return;
        }

        const dataEntrada = new Date(entrada.value + "T00:00:00");
        const dataSaida = new Date(saida.value + "T00:00:00");

        const diferenca = dataSaida - dataEntrada;
        const noites = diferenca / (1000 * 60 * 60 * 24);

        if (noites <= 0) {
            valorTotal.value = formatarMoeda(0);
            saida.setCustomValidity(
                "A data de saída deve ser posterior à data de entrada."
            );
            return;
        }

        saida.setCustomValidity("");
        valorTotal.value = formatarMoeda(noites * diaria);
    }

    entrada.addEventListener("change", calcularTotal);
    saida.addEventListener("change", calcularTotal);

    formulario.addEventListener("submit", function (event) {
        calcularTotal();

        if (saida.value && entrada.value >= saida.value) {
            event.preventDefault();
            saida.reportValidity();
        }
    });

    calcularTotal();
});
