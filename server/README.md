# server

# Setup

On every cold start node must be installed via fnm. Run the start script or this.

```sh
# see https://nodejs.org/en/download/package-manager

# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression
# download and install Node.js
fnm use --install-if-missing 23

yarn node ./server.js
```

# Config

Anaconda3 must be installed. https://www.anaconda.com/

Note that the server/config/server_config.js` must be configured to contain the paths of your local conda env.

```js
conda_exe_path = "C:/Users/<windows_user>/anaconda3/Scripts/conda.exe";
conda_env_path = "C:/src/ai-investment-manager/.conda_invst_mgr";
```
