const btnBuscarCep = document.getElementById("btnBuscarCep");
const cepInput = document.getElementById("cepInput");
const message = document.querySelector("#resultado-cep .message");

cepInput.focus();

// input cep
const containsCep = cepInput.addEventListener("input", () => {
  const valor = cepInput.value.replace(/\D/g, "");

  if (valor.length === 8) {
    toogleBtn(false);
  } else {
    toogleBtn(true);
  }
});

// buscar cep
async function buscarCep() {
  const cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    abriModal("Digite um CEP válido");
    return;
  }

  message.innerHTML = "Carregando...";

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (response.status !== 200 || data.erro) {
      abriModal("CEP não encontrado");
      message.innerHTML = "Digite um Cep Valido";
      message.classList.add("error");
      return;
    }
    message.classList.remove("error");
    message.innerHTML = `
      <p>CEP: ${data.cep}</p>
      <p>Logradouro: ${data.logradouro}</p>
      <p>Bairro: ${data.bairro}</p>
      <p>Cidade: ${data.localidade}</p>
      <p>Estado: ${data.uf}</p>
      <br />
      <button
      class="btn-nova-consulta"
      onclick="novaConsulta()">Nova Consulta
      </button>
    `;
    toogleBtn(true);
    cepInput.disabled = true;
  } catch (err) {
    console.log("Error ao buscar cep:", err);
  }
}

// nova consulta
function novaConsulta() {
  cepInput.value = "";
  message.innerHTML = "Digite um cep para ser consultado";
  cepInput.disabled = false;
  cepInput.focus();
}

// btn-toogle
function toogleBtn(estado) {
  btnBuscarCep.disabled = estado;
}

// abrir modal
function abriModal(text) {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  modal.innerHTML = `
  <div
  class="modal-content"
    >
      <div>
        <p>${text}</p>
        <button
          onclick="fecharModal()"
          class="btn-fechar-modal"
        >
          Fechar
        </button>
      </div>
    </div>
  `;
}

// fechar modal
function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  cepInput.focus();
}

// btn buscar cep
btnBuscarCep.addEventListener("click", buscarCep);
