class Container extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <!-- <label for="cepInput">CEP</label> -->
        <input
          type="number"
          id="cepInput"
        placeholder="Digite o CEP (ex: 01001000)"
      />
      <!-- <label for="cepInput">CEP</label> -->
      <button id="btnBuscarCep" class="btn-buscar-cep" disabled>
        Buscar CEP
      </button>

      <!-- <div id="resultado-cep"></div> -->
      <div id="resultado-cep">
        <p class="message success">Digite um cep para ser consultado</p>
      </div>
    </div>
    `;
  }
}

customElements.define("container-component", Container);
