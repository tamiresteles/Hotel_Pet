
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("lista-reservas");
    const contador = document.getElementById("total-reservas");
    const campoPet = document.getElementById("pet");
    const campoTutor = document.getElementById("tutor");
    const campoStatus = document.getElementById("status");

    if (!tabela) {
        return;
    }

    const linhas = Array.from(tabela.querySelectorAll("tr"));

    function normalizar(texto) {
        return texto
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function pesquisarReservas() {
        const pet = normalizar(campoPet.value);
        const tutor = normalizar(campoTutor.value);
        const status = normalizar(campoStatus.value);

        let totalEncontrado = 0;

        linhas.forEach(function (linha) {
            const celulas = linha.querySelectorAll("td");

            const nomePet = normalizar(celulas[1].textContent);
            const nomeTutor = normalizar(celulas[2].textContent);
            const statusReserva = normalizar(celulas[6].textContent);

            const correspondePet = nomePet.includes(pet);
            const correspondeTutor = nomeTutor.includes(tutor);
            const correspondeStatus =
                status === "" || statusReserva === status;

            const mostrar =
                correspondePet &&
                correspondeTutor &&
                correspondeStatus;

            linha.style.display = mostrar ? "" : "none";

            if (mostrar) {
                totalEncontrado++;
            }
        });

        let mensagem = document.getElementById(
            "nenhuma-reserva-encontrada"
        );

        if (totalEncontrado === 0) {
            if (!mensagem) {
                mensagem = document.createElement("p");
                mensagem.id = "nenhuma-reserva-encontrada";
                mensagem.textContent = "Nenhuma reserva encontrada.";
                mensagem.style.textAlign = "center";

                const container = tabela.closest(".tabela-container");

                if (container) {
                    container.appendChild(mensagem);
                }
            }
        } else if (mensagem) {
            mensagem.remove();
        }

        if (contador) {
            contador.textContent =
                totalEncontrado +
                (totalEncontrado === 1
                    ? " reserva encontrada"
                    : " reservas encontradas");
        }
    }

    if (campoPet) {
        campoPet.addEventListener("input", pesquisarReservas);
    }

    if (campoTutor) {
        campoTutor.addEventListener("input", pesquisarReservas);
    }

    if (campoStatus) {
        campoStatus.addEventListener("change", pesquisarReservas);
    }

   const formulario = document.querySelector(".painel-filtros form");

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            pesquisarReservas();
        });
    }

    pesquisarReservas();
});
