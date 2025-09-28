class ComponentLoader {
  constructor() {
    this.components = new Map();
  }

  async loadComponent(componentName, containerId) {
    try {
      const response = await fetch(`components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }

      const html = await response.text();
      const container = document.getElementById(containerId);

      if (container) {
        // Only insert clean HTML (ignore <script> and <style>)
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Remove scripts and styles from the fragment
        temp.querySelectorAll("script, style").forEach(el => el.remove());

        container.innerHTML = temp.innerHTML;
        this.components.set(componentName, temp.innerHTML);
      }
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
    }
  }

  async loadAllComponents() {
    const components = [
      { name: 'navbar', container: 'navbar-container' },
      { name: 'carousel', container: 'carousel-container' },
      { name: 'about', container: 'about-container' },
      { name: 'services', container: 'services-container' },
      { name: 'partners', container: 'partners-container' },
      { name: 'contact', container: 'contact-container' },
      { name: 'footer', container: 'footer-container' }
    ];

    await Promise.all(
      components.map(c => this.loadComponent(c.name, c.container))
    );
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const loader = new ComponentLoader();
  await loader.loadAllComponents();
});
