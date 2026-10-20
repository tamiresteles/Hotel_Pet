
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-pet");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const raca = document.getElementById("raca").value.trim();
        const idade = document.getElementById("idade").value;
        const sexo = document.getElementById("sexo").value;
        const porte = document.getElementById("porte").value;
        const tutorSelect = document.getElementById("tutor");
        const tutor = tutorSelect.options[tutorSelect.selectedIndex].text;
        const observacoes = document.getElementById("observacoes").value.trim();

        const pets = JSON.parse(localStorage.getItem("pets")) || [];

        const novoPet = {
            id: Date.now(),
            nome: nome,
            raca: raca,
            idade: idade,
            sexo: sexo,
            porte: porte,
            tutor: tutor,
            observacoes: observacoes,
            status: "Ativo"
        };

        pets.push(novoPet);

        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet cadastrado com sucesso!");

        window.location.href = "pets.html";
    });
});
