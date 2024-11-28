# see https://nodejs.org/en/download/package-manager

# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression
# download and install Node.js
fnm use --install-if-missing 23

#Start by enabling Corepack, if it isn't already; this will add the yarn binary to your PATH:
corepack enable
#Then initialize a new project:
yarn init -2