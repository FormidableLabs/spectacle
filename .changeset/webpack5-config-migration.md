---
"create-spectacle": patch
---

Fix: complete webpack 4-to-5 config migration in the generator. Generated webpack configs now use webpack 5 built-in Asset Modules (`asset/resource` / `asset/source`) instead of the deprecated `file-loader` / `raw-loader`, and generated `package.json` no longer depends on `file-loader` (and now bumps `webpack-cli` to `^5.1.4`).
