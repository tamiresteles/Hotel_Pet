
const valorDiaria = document.getElementById("valor-diaria");
const vagas = document.getElementById("vagas");
const nomeHotel = document.getElementById("nome-hotel");
const checkIn = document.getElementById("check-in");
const checkOut = document.getElementById("check-out");
const observacoes = document.getElementById("observacoes");

const formulario = document.querySelector("form");

// Carregar as configurações salvas
valorDiaria.value =
    localStorage.getItem("valorDiaria") || "R$ 95,00";

vagas.value =
    localStorage.getItem("vagas") || "5";

nomeHotel.value =
    localStorage.getItem("nomeHotel") || "Hotel Pet";

checkIn.value =
    localStorage.getItem("checkIn") || "08:00";

checkOut.value =
    localStorage.getItem("checkOut") || "18:00";

observacoes.value =
    localStorage.getItem("observacoes") ||
    "O Hotel Pet oferece hospedagem para cães, gatos e outros animais domésticos.";

// Salvar as configurações ao enviar o formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    localStorage.setItem("valorDiaria", valorDiaria.value);
    localStorage.setItem("vagas", vagas.value);
    localStorage.setItem("nomeHotel", nomeHotel.value);
    localStorage.setItem("checkIn", checkIn.value);
    localStorage.setItem("checkOut", checkOut.value);
    localStorage.setItem("observacoes", observacoes.value);

    alert("Configurações salvas com sucesso!");
});

// Restaurar as configurações padrão
formulario.addEventListener("reset", function() {
    localStorage.removeItem("valorDiaria");
    localStorage.removeItem("vagas");
    localStorage.removeItem("nomeHotel");
    localStorage.removeItem("checkIn");
    localStorage.removeItem("checkOut");
    localStorage.removeItem("observacoes");
});
