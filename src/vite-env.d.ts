/// <reference types="vite/client" />

// Extend Vite's built-in `ImportMetaEnv` typings with the env vars this app uses.
// This fixes: "Property 'env' does not exist on type 'ImportMeta'."
interface ImportMetaEnv {
  readonly VITE_RENTCAST_API_KEY?: string;
  readonly GEMINI_API_KEY?: string;
}

