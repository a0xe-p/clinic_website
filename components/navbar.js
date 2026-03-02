class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        nav {
          background-color: #1e40af;
          color: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-title {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          gap: 10px;
          user-select: none;
          cursor: default;
        }

        .nav-title img {
          height: 40px;
        }
        
        .nav-links {
          display: flex;
          gap: 1rem;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }
        
        .nav-link:hover {
          background-color: #1e3a8a;
        }
      </style>
      
      <nav>
        <div class="nav-container">
          <div class="nav-title">
            <img src="sanfelipe.png" alt="San Felipe Logo" style="height: 50px;">
            SFNCS Clinic
          </div>
          <div class="nav-links">
            <a href="index.html" class="nav-link">
              <i data-feather="home"></i> Home
            </a>
            <a href="register.html" class="nav-link">
              <i data-feather="user-plus"></i> Register
            </a>
            <a href="visit.html" class="nav-link">
              <i data-feather="clipboard"></i> Visit
            </a>
            <a href="directory.html" class="nav-link">
              <i data-feather="users"></i> Directory
            </a>
            <a href="reports.html" class="nav-link">
              <i data-feather="file-text"></i> Reports
            </a>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);