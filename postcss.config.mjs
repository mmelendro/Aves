/**
 * CSS build pipeline. PostCSS runs Tailwind to turn the utility class names used
 * in TSX files into the stylesheet sent to visitors. This configuration contains
 * build plugins, not page content or a place to store service credentials.
 */
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
