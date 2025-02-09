import { RugOptions } from 'rug-lang';

interface ModuleOptions {
  /** Rug parser options */
  parserOptions?: RugOptions;
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    rug?: ModuleOptions;
  }
}

declare module 'nuxt-rug' {
  export interface RugComponentProps {
    /** Rug template content */
    content: string;
  }
}

export { ModuleOptions, RugComponentProps }; 