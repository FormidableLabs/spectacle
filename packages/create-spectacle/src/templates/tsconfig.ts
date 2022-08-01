export const tsconfigTemplate = () =>
  `{
  "compilerOptions": {
    "target": "ES6",
    "lib": [
      "DOM",
      "ES2019"
    ],
    "jsx": "react-jsx",
    "module": "commonjs",
    "moduleResolution": "node",
    "allowUmdGlobalAccess": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
`;
