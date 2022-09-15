export const gitignoreTemplate = () =>
  `
# Deps
node_modules

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor/FS configs
.vscode
.idea
.DS_Store

# Build artifacts
dist
`.trim();
