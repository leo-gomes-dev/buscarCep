class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="modal" class="modal-container"></div>
    `;
  }
}

customElements.define("modal-component", Modal);
