# `create-spectacle`

This package contains `create-spectacle`, the boilerplate-generator for Spectacle. The simplest usage is to run one of the following commands (based on your package manager of choice):

```shell
yarn create spectacle # yarn
npm create spectacle # npm
npx create-spectacle # using npx
pnpm create spectacle # using pnpm
```

Once running the respective command, you will be prompted to provide information about the spectacle project you'd like to create. Once you provide necessary information, a new spectacle project will be created in the directory derived from the project name you provided.

## Flags

`create-spectacle`'s core usage is via the interactive prompts. However, there are a handful of arguments/flags that you can provide to pre-fill prompt options:

- Pass a project name as the main argument to specify a project name, e.g. `yarn create spectacle my-presentation`.
- Pass the `--type` or `-t` flag to specify the type of spectacle project you'd like to create. Options are `jsx`, `tsx`, or `onepage`. Example: `yarn create spectacle -t onepage my-presentation`.
- Pass the `--lang` or `-l` flag to specify the HTML lang attribute for your presentation. Example: `yarn create spectacle -l en my-presentation`.
- Pass the `--port` or `-p` flag to specify the port to run the presentation on. Example: `yarn create spectacle -p 8080 my-presentation`.

### Bypassing Prompts

If you want to bypass the prompts entirely, pass the `-t`, `-l`, and `-p` flags as well as the project name as the main argument. For example:

```shell
yarn create spectacle -t jsx -l en -p 8080 my-presentation
```
