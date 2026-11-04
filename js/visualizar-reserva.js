
document.addEventListener("DOMContentLoaded", function () {

    const parametros = new URLSearchParams(window.location.search);
    const idReserva = parametros.get("id");

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const reserva = reservas.find(function (item) {
        return String(item.id) === String(idReserva);
    });

    if (!reserva) {
        alert("Reserva não encontrada.");
        window.location.href = "reservas.html";
        return;
    }

    function preencher(id, valor) {
        const campo = document.getElementById(id);

        if (campo) {
            campo.textContent = valor || "Não informado";
        }
    }

    function formatarData(data) {
        if (!data) return "Não informada";
        return data.split("-").reverse().join("/");
    }

    function formatarNome(valor) {
        if (!valor) return "Não informado";

        return valor.charAt(0).toUpperCase() + valor.slice(1);
    }

    function normalizar(texto) {
        return String(texto || "").trim().toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    const pets = {
        max: "Max",
        belinha: "Belinha",
        nina: "Nina",
        caramelo: "Caramelo",
        floquinho: "Floquinho"
    };

    const tutores = {
        rafael: "Rafael Costa",
        juliana: "Juliana Mendes",
        pedro: "Pedro Henrique",
        lucas: "Lucas Almeida"
    };

    const alimentacoes = {
        hotel: "Alimentação do Hotel",
        propria: "Alimentação própria"
    };

    const pagamentos = {
        pix: "Pix",
        cartao: "Cartão",
        dinheiro: "Dinheiro"
    };

    // Buscar os dados do pet cadastrado
    const listaPets = JSON.parse(localStorage.getItem("pets")) || [];

    const petEncontrado = listaPets.find(function (pet) {
        return normalizar(pet.nome) === normalizar(reserva.pet);
    });

    // Dados da reserva
    preencher("numero-reserva", reserva.id);
    preencher("status-reserva", formatarNome(reserva.status));
    preencher("entrada-reserva", formatarData(reserva.entrada));
    preencher("saida-reserva", formatarData(reserva.saida));

    // Dados do pet
    preencher(
        "pet-reserva",
        petEncontrado ? petEncontrado.nome : pets[reserva.pet] || reserva.pet
    );

    preencher(
        "raca-reserva",
        petEncontrado ? petEncontrado.raca : "Não informado"
    );

    preencher(
        "idade-reserva",
        petEncontrado ? petEncontrado.idade + " anos" : "Não informado"
    );

    // Dados do tutor
    preencher("tutor-reserva", tutores[reserva.tutor] || reserva.tutor);

    // Serviços e cuidados
    preencher(
        "alimentacao-reserva",
        alimentacoes[reserva.alimentacao] || reserva.alimentacao
    );

    preencher(
        "medicacao-reserva",
        reserva.medicacao === "sim" ? "Sim" :
        reserva.medicacao === "nao" ? "Não" : "Não informado"
    );

    preencher("observacoes-reserva", reserva.observacoes);

    // Pagamento
    preencher("valor-diaria-reserva", reserva.valor);

    preencher(
        "diarias-reserva",
        reserva.diarias ? reserva.diarias + " diárias" : "Não informado"
    );

    preencher("total-reserva", reserva.total);

    preencher(
        "pagamento-reserva",
        pagamentos[reserva.formaPagamento] || reserva.formaPagamento
    );

    // Link para editar a reserva
    document.getElementById("link-editar-reserva").href =
        "editar-reserva.html?id=" + reserva.id;

});
