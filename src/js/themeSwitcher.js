export class ThemeSwitcher {
    constructor(deskSwitchEl, mobSwitchEl) {
      this.themeSwitcherEl = deskSwitchEl;
      this.mobileSwitcherEl = mobSwitchEl;
      this.dataSelected = document.querySelector(".data_selected");
      this.THEME_STORAGE_KEY = 'theme';
      this.Theme = {
        LIGHT: 'light',
        DARK: 'dark',
      };
    }
  
    onThemeToggle = () => {
      const isLightTheme = this.getBoolean();
  
      if (isLightTheme) {
        localStorage.setItem(this.THEME_STORAGE_KEY, this.Theme.DARK);
      }
  
      if (!isLightTheme) {
        localStorage.setItem(this.THEME_STORAGE_KEY, this.Theme.LIGHT);
      }
  
      this.renderTheme();
      return;
    };
  
    renderTheme() {
      const isLightTheme = this.getBoolean();
  
      if (!isLightTheme) {
        this.themeSwitcherEl.setAttribute('checked', true);
        this.mobileSwitcherEl.setAttribute('checked', true);
        this.changeBodyClass(this.Theme.DARK, this.Theme.LIGHT);
        this.dataSelected.style.color = "#F4F4F4";
      }
  
      if (isLightTheme) {
        this.changeBodyClass(this.Theme.LIGHT, this.Theme.DARK);
        this.dataSelected.style.color = "#111321";
      }
    }
  
    changeBodyClass(add, remove) {
      document.body.classList.add(add);
      document.body.classList.remove(remove);
    }
  
    getBoolean() {
      const storageTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
      return storageTheme === this.Theme.LIGHT || !storageTheme;
    }
  }
  