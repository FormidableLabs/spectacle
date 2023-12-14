type PackageTemplateOptions = {
  name: string;
  spectacleVersion: string;
  port?: number;
};

export const packageTemplate = (options: PackageTemplateOptions) =>
  JSON.stringify(
    {
      name: options.name,
      private: true,
      scripts: {
        start: 'webpack-dev-server --hot --config ./webpack.config.js',
        clean: 'rimraf dist',
        build: 'webpack --config ./webpack.config.js --mode production'
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        spectacle:
          options.spectacleVersion === 'workspace:*'
            ? '*'
            : `^${options.spectacleVersion}`
      },
      devDependencies: {
        '@babel/core': '^7.17.2',
        '@babel/plugin-proposal-class-properties': '^7.12.1',
        '@babel/plugin-proposal-object-rest-spread': '^7.12.1',
        '@babel/preset-env': '^7.12.7',
        '@babel/preset-react': '^7.16.7',
        'babel-loader': '^8.0.6',
        'html-webpack-plugin': '^5.3.1',
        'style-loader': '^3.3.1',
        'css-loader': '^5.1.3',
        'file-loader': '^6.2.0',
        rimraf: '^3.0.0',
        webpack: '^5.68.0',
        'webpack-cli': '^4.5.0',
        'webpack-dev-server': '^4.7.4',
        typescript: '^5.3.3',
        '@babel/preset-typescript': '^7.16.0',
        '@types/react': '^18.0.12',
        '@types/react-dom': '^18.0.5'
      }
    },
    null,
    2
  );

export const vitePackageTemplate = (options: PackageTemplateOptions) =>
  JSON.stringify(
    {
      name: options.name,
      private: true,
      scripts: {
        start: `vite dev --port ${options.port || 3000}`,
        build: 'vite build'
      },
      dependencies: {
        react: '^18.1.0',
        'react-dom': '^18.1.0',
        spectacle:
          options.spectacleVersion === 'workspace:*'
            ? '*'
            : `^${options.spectacleVersion}`
      },
      devDependencies: {
        '@types/react': '^18.0.17',
        '@types/react-dom': '^18.0.6',
        '@vitejs/plugin-react': '^2.0.1',
        typescript: '^5.3.3',
        vite: '^3.0.7'
      }
    },
    null,
    2
  );
