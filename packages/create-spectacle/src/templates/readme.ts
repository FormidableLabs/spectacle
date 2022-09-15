type ReadmeTemplateOptions = {
  name: string;
  enableTypeScriptSupport: boolean;
  isVite?: boolean;
};

export const readmeTemplate = ({
  name,
  enableTypeScriptSupport,
  isVite
}: ReadmeTemplateOptions) =>
  `
# ${name}

Made with ❤️ and [Spectacle](https://github.com/FormidableLabs/spectacle/).

## Running your presentation

- Run \`yarn install\` (or \`npm install\` or \`pnpm install\`) to install dependencies.
- Run \`yarn start\` (or \`npm start\` or \`pnpm start\`) to start the presentation.
- Edit \`index.${
    enableTypeScriptSupport ? 'tsx' : 'jsx'
  }\` to add your presentation content.
  
## Building you presentation

To build your presentation for a production deploy, run \`yarn build\` (or \`npm build\` or \`pnpm build\`).

The build artifacts will be placed in the \`dist\` directory. If you'd like to change this location, edit ${
    isVite
      ? `\`build.outDir\` in \`vite.config.${
          enableTypeScriptSupport ? 'ts' : 'js'
        }\``
      : `\`output.path\` in \`webpack.config.js\``
  }.
`.trim();
