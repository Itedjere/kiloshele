import path from "node:path";
import { fileURLToPath } from "node:url";

// Simulate __dirname in ESM
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
