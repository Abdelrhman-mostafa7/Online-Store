import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getTheme(): string {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.themeKey) || 'light';
    }
    return 'light';
  }

  setTheme(theme: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.themeKey, theme);
    }
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  applyTheme(theme: string): void {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  initializeTheme(): void {
    const savedTheme = this.getTheme();
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }
}