
document.addEventListener("DOMContentLoaded", function () {

    // Recupera os dados salvos no navegador
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Recupera a quantidade de vagas configurada
    const vagasConfiguradas = Number(localStorage.getItem("vagas")) || 5;

    // Conta os pets ativos
    const totalPets = pets.filter(function (pet) {
        return pet.status !== "Inativo";
    }).length;

    // Conta as reservas que ainda estão ativas
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

});
