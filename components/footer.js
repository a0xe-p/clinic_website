class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        footer {
          background-color: #1e40af;
          color: white;
          padding: 1rem;
          text-align: center;
          margin-top: 2rem;
        }
        
        .footer-text {
          font-size: 0.875rem;
        }
      </style>
      
      <footer>
        <div class="footer-text">
          Clinic QR Logger - Simple Student Health Tracking System
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);