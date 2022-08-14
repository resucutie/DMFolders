# DMFolders
Organize your DMs with folders

## Installing
1. Install a mod. I recommend to download [BetterDiscord](https://betterdiscord.app/), but you can compile for [Powercord](http://powercord.dev/) and [GooseMod](https://goosemod.com/)
    - Currently, DMFolders and any Ittai plugin breaks when you have multiple mods installed
2. Download it
    - For BetterDiscord: [go to here](https://raw.githubusercontent.com/abUwUser/DMFolders/release/index.js), hit CTRL+S, and then rename it to `DMFolders.plugin.js`
    - For Powercord: run the following command inside your plugins folder
        ```sh
        git clone --branch release https://github.com/abUwUser/DMFolders.git
        ```
    - For GooseMod: no idea lol
    

## Building
1. Install [node.js](https://nodejs.org/) (for compiling) and [git](https://git-scm.com/) (for downloading this repo, not required but strongly recommended)
2. Clone this repository (`git clone https://github.com/abUwUser/DMFolders.git`)
    - Choose a folder in where you want to clone everything. If you don't know where to put all of it, just clone on Documents and make a folder in there (`cd Documents` on Windows and then `mkdir CompilingDMFolders`)
3. Since this plugin uses the latest pushes to [AA's fork of Ittai](https://git.catvibers.me/Ittai/ittai), you will need to install it
    1. Clone it (`git clone https://git.catvibers.me/Ittai/ittai`) and go to the cloned directory (`cd ittai`)
    2. Link the builder by going to the builder directory (`cd builder`) and installing its dependencies (`npm i`) (maybe consider doing a link (`npm link`))
    3. Go back one folder (`cd ..`) and then go to the core `cd core`
    4. Install the core dependencies (`npm i`) and then link it (`npm link`)
    5. Go back two directories (run `cd ..` twice)
4. Go to the DMFolders folder (`cd DMFolders`)
5. Link Ittai with DMFolders (`npm link ittai`)
    - This is a crucial part because due to DMFolders using the latest pushes to Ittai and not Ittai's npm repository, the Ittai from `npm` wont be able to build some of the code in there
6. Install the rest of the dependecies (`npm i`)
7. Build it (`ittai --betterdiscord="path/to/betterdiscord/plugins"`)
    - If you're Powercord, run `ittai --powercordv2` for Powercord and then copy the `.compiled` folder (not its contents, just the entire folder) to Powercord's plugin folder, and then rename with what name you prefer
    - Currently, there isn't any good way to install for GooseMod due to its weird installing process, but we will push to the official GooseMod plugin repo in the future (as soon as Ittai fixes a bug with GooseMod plugins)