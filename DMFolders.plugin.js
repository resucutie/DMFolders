/**
 * @name DMFolders
 * @version 1.0.0
 * @main index.js
 * @description Organize your DMs with folders
 * @license MIT
 * @source https://github.com/abUwUser/DMFolders.git
 * @updateUrl https://raw.githubusercontent.com/abUwUser/DMFolders/release/index.js
 * @author A user
 */
(function () {
    'use strict';

    // Made with Ittai - https://git.catvibers.me/ittai/ittai
    let IttaiInternals = {};
    let ittaiPluginExport=(()=>{

    var manifest$1 = {
    	name: "DMFolders",
    	version: "1.0.0",
    	license: "MIT",
    	source: "https://github.com/abUwUser/DMFolders.git",
    	updateUrl: "https://raw.githubusercontent.com/abUwUser/DMFolders/release/index.js",
    	author: "A user",
    	description: "Organize your DMs with folders"
    };
    var changelog = {
    	date: "22 July 2022",
    	contents: {
    		"OMG 1.0.0": {
    			type: "added",
    			items: [
    				"**Now it is separated by tabs instead of categories.** Somewhat i forgot that tabs are a thing in discord. Found out when they added a \"Server Profiles\" tab.",
    				"Some bug fixes. *psst~ i forgot what fixes i've made*"
    			]
    		},
    		"A message before you go": {
    			type: "improved",
    			items: [
    				"This plugin will go on maintaince mode. I guess everything is done."
    			]
    		}
    	}
    };
    var ittaiconfig = {
    	manifest: manifest$1,
    	changelog: changelog
    };

    var config = /*#__PURE__*/Object.freeze({
        __proto__: null,
        manifest: manifest$1,
        changelog: changelog,
        'default': ittaiconfig
    });

    let clientWebpack = (() => {
        return globalThis.BdApi ?? (() => { try {
                return BdApi;
            }
            catch (e) { } })();
    })();
    function find(filter) {
        return clientWebpack.findModule(filter);
    }
    function findAll(filter) {
        return clientWebpack.findAllModules(filter);
    }
    function findByProps(...props) {
        return find(m => props.every(p => m?.[p] !== undefined));
    }
    function findAllByProps(...props) {
        return findAll(m => props.every(p => m?.[p] !== undefined));
    }
    function findByPrototype(...props) {
        return find(m => props.every(p => m?.prototype?.[p] !== undefined));
    }
    function findAllByPrototype(...props) {
        return findAll(m => props.every(p => m?.prototype?.[p] !== undefined));
    }
    function findByDisplayName(name, returnDefault = true) {
        let ret = find(m => m?.default?.displayName === name);
        if (returnDefault)
            return ret.default;
        return ret;
    }
    function findAllByDisplayName(name) {
        return find(m => m?.displayName === name);
    }

    /**
     * {@link https://discord.com/acknowledgements/|Full list of libraries that Discord uses.}
     * @module webpack/common
     */
    const React$2 = /*#__PURE__*/ findByProps("useState");
    const ReactDOM = /*#__PURE__*/ findByProps("render", "unmountComponentAtNode");
    const ReactSpring = /*#__PURE__*/ findByProps("useSpring", "useTransition");
    const Lodash = globalThis._;
    const _ = globalThis._;
    const AvatarManager = /*#__PURE__*/ findByProps("getUserAvatarURL", "hasAnimatedGuildIcon");
    const ModalActions = /*#__PURE__*/ findByProps("openModal", "updateModal");
    const ModalStack = /*#__PURE__*/ findByProps("push", "update", "pop", "popWithKey");
    const Dispatcher = /*#__PURE__*/ findByProps("dispatch", "subscribe");
    const Flux = /*#__PURE__*/ findByProps("Store", "connectStores");
    const FluxDispatcher$1 = /*#__PURE__*/ findByProps("_currentDispatchActionType", "_processingWaitQueue");
    const ColorUtils = /*#__PURE__*/ findByProps("isValidHex");
    const Constants = /*#__PURE__*/ findByProps("API_HOST");
    const ContextMenuManager = /*#__PURE__*/ findByProps("openContextMenu");
    const Platform = /*#__PURE__*/ find((m) => m.PlatformTypes?.WINDOWS);

    IttaiInternals.React = React$2;
    IttaiInternals.ReactDOM = ReactDOM;
    IttaiInternals.ReactSpring = ReactSpring;
    IttaiInternals.Lodash = Lodash;

    /**
     * @module webpack
     */

    var webpack = /*#__PURE__*/Object.freeze({
        __proto__: null,
        find: find,
        findAll: findAll,
        findByProps: findByProps,
        findAllByProps: findAllByProps,
        findByPrototype: findByPrototype,
        findAllByPrototype: findAllByPrototype,
        findByDisplayName: findByDisplayName,
        findAllByDisplayName: findAllByDisplayName,
        React: React$2,
        ReactDOM: ReactDOM,
        ReactSpring: ReactSpring,
        Lodash: Lodash,
        _: _,
        AvatarManager: AvatarManager,
        ModalActions: ModalActions,
        ModalStack: ModalStack,
        Dispatcher: Dispatcher,
        Flux: Flux,
        FluxDispatcher: FluxDispatcher$1,
        ColorUtils: ColorUtils,
        Constants: Constants,
        ContextMenuManager: ContextMenuManager,
        Platform: Platform
    });

    const BdAPIInstance = globalThis.BdApi ?? /*#__PURE__*/ (() => { try {
        return BdApi;
    }
    catch (e) { } })(); //topaz and other compat mods stuff
    class BDPlugin {
        constructor() {
            this.__ittaiInternals = {
                getAllSettings: () => {
                    return BdAPIInstance.loadData(manifest$1.name, "settings") ?? {};
                },
                getSetting: (key, defaultValue) => {
                    return (BdAPIInstance.loadData(manifest$1.name, "settings") ?? {})[key] ?? defaultValue;
                },
                setSettings: (newSettings) => {
                    if (typeof newSettings !== "object")
                        return;
                    BdAPIInstance.saveData(manifest$1.name, "settings", Object.assign(this.__ittaiInternals.getAllSettings(), newSettings));
                },
                setSetting: (key, value) => {
                    BdAPIInstance.saveData(manifest$1.name, "settings", Object.assign(this.__ittaiInternals.getAllSettings(), { [key]: value }));
                },
                removeSetting: (key) => {
                    let outputSetting = this.__ittaiInternals.getAllSettings();
                    delete outputSetting?.[key];
                    BdAPIInstance.saveData(manifest$1.name, "settings", outputSetting);
                },
                resetSettings: () => {
                    BdAPIInstance.saveData(manifest$1.name, "settings", {});
                },
                setSettingsPanel: (component) => {
                    this.getSettingsPanel = () => {
                        try {
                            if (typeof component === "function")
                                component = React$2.createElement(component);
                            return component;
                        }
                        catch (e) {
                            this.error("Failed to load settings panel.", e);
                        }
                        return null;
                    };
                },
                removeSettingsPanel: () => {
                    delete this.getSettingsPanel;
                }
            };
        }
        // smol test for topaz
        // getSettingsPanel = () => {
        // 	return null;
        // };
        log() {
            logger.log(...arguments);
        }
        debug() {
            logger.debug(...arguments);
        }
        warn() {
            logger.warn(...arguments);
        }
        error() {
            logger.error(...arguments);
        }
    }

    const get = (key, defaultValue) => {
        return settingsInstance.getSetting(key, defaultValue);
    };
    const getAll$1 = () => {
        return settingsInstance.getAllSettings();
    };
    const set = (key, value) => {
        return settingsInstance.setSetting(key, value);
    };
    const setAll = (settings) => {
        return settingsInstance.setSettings(settings);
    };
    const remove = (key) => {
        return settingsInstance.removeSetting(key, undefined);
    };
    const reset = () => {
        return settingsInstance.resetSettings();
    };
    // HACK
    let settingsInstance;
    const setInstance = (i) => {
        settingsInstance = i;
    };
    // export default class SettingsAPI {
    //     constructor(pluginInstance: Plugin) {
    //         this.__pluginInstance = pluginInstance;
    //     }
    //     private __pluginInstance: Plugin
    //     get (key: string, defaultValue: any) : any {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.getSetting(key, defaultValue); // Yes this is excessive. Too bad.
    //     }
    //     getAll () : Object {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.getAllSettings();
    //     }
    //     set (key: string, value: any) : void {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.setSetting(key, value);
    //     }
    //     setAll (settings: Object) : void {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.setSettings(settings);
    //     }
    // }

    var index$a = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get: get,
        getAll: getAll$1,
        set: set,
        setAll: setAll,
        remove: remove,
        reset: reset,
        get settingsInstance () { return settingsInstance; },
        setInstance: setInstance
    });

    function createArguments(...args) {
        return [
            "%cIttai",
            "color: #000; background-color: #42ffa7; font-family: default; padding-left: 3px; padding-right: 3px; border-radius: 2px; font-weight: bold;",
            ...args,
        ];
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function log(...args) {
        consoleCopy.log(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function debug(...args) {
        consoleCopy.debug(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function warn(...args) {
        consoleCopy.warn(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function error(...args) {
        consoleCopy.error(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function group(...args) {
        consoleCopy.group(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function groupEnd(...args) {
        consoleCopy.groupEnd(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function count(...args) {
        consoleCopy.count(...args);
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function countReset(...args) {
        consoleCopy.countReset(...args);
    }

    /**
     * @module logger
     */
    const consoleCopy = { ...console };

    var index$9 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        consoleCopy: consoleCopy,
        createArguments: createArguments,
        log: log,
        debug: debug,
        warn: warn,
        error: error,
        group: group,
        groupEnd: groupEnd,
        count: count,
        countReset: countReset
    });

    /**
     * The plugin class for the running client mod.
     * @name Plugin
     * @memberof module:entities
     */ class Plugin {
        constructor() {
            this.friendlyName = manifest$1.name;
        }
        start() { }
        stop() { }
        setSettingsPanel(component) {
            this.__ittaiInternalPlugin.setSettingsPanel(component);
        }
        removeSettingsPanel() {
            this.__ittaiInternalPlugin.removeSettingsPanel();
        }
        log(...args) {
            log(...args);
        }
        debug(...args) {
            debug(...args);
        }
        warn(...args) {
            warn(...args);
        }
        error(...args) {
            error(...args);
        }
    }

    /**
     * @module entities
     */

    var index$8 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Plugin: Plugin
    });

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {object} {@link module:patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patchingBefore
     */ function before(name, object, functionName, patchFunction) {
        return patch(name, object, functionName, "before", patchFunction);
    }

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {Object} {@link module:patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patchingInstead
     */ function instead(name, object, functionName, patchFunction) {
        return patch(name, object, functionName, "instead", patchFunction);
    }

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {object} {@link module:patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patchingAfter
     */ function after(name, object, functionName, patchFunction) {
        return patch(name, object, functionName, "after", patchFunction);
    }

    /**
     * Unpatches all of the patches specified, or all of them if none are specified.
     * @memberof module:patcher
     * @param {string[]} [unpatches={@link module:patcher.patches}] An array patch names.
     */ function unpatchAll(unpatches) {
        if (!Array.isArray(unpatches))
            unpatches = patches;
        for (const object of Object.values(unpatches)) {
            for (const funct of Object.values(object)) {
                for (const patch of funct.patches) {
                    patch.unpatch();
                }
            }
        }
    }

    // Know it will work on this client mod or it's detecting the wrong one?
    // Set this variable.
    /**
     * @memberof module:utilities
     * @returns {string} The name of the running client mod.
     */ function getClientMod() {
        return "betterdiscord";
    }

    /**
     * @memberof module:utilities
     * @returns {number} The current time in nanoseconds.
     */ function nanoseconds() {
        const hrTime = process.hrtime();
        return hrTime[0] * 1000000000 + hrTime[1];
    }

    /**
     * @param {number} time Time (in milliseconds).
     * @memberof module:utilities
     * @returns {Promise} A string of random characters.
     */ function randomString$1(time) {
        return new Promise(resolve => setTimeout(() => resolve(), time));
    }

    /**
     * Finds an object in a tree.
     * @param {object} tree The tree to search.
     * @param {function} filter A filter function that should return true when it checks what you want to find.
     * @param {object} options
     * @param {string[]} [options.walkable=[]] Which node names are walkable.
     * @param {string[]} [options.exclude=[]] Which node names to not walk.
     * @param {boolean|string} [options.whileLoop=false] Whether or not to use a while loop instead of recursion. This is slower, but not prone to stack overflow.
     * @param {boolean|string} [options.maxDepth=100] The maximum amount of layers deep to search the tree. `options.whileLoop=false` only.
     * @memberof module:utilities
     * @returns {object|null}
     */ function findInTree(tree, filter, { walkable = [], exclude = [], whileLoop = false, maxDepth = 100, depth = 0, } = {}) {
        if (depth === maxDepth)
            return null;
        if (tree === null || tree === undefined)
            return null;
        if (typeof tree !== "object")
            return null;
        if (typeof filter === "string")
            return tree[filter];
        if (whileLoop) {
            const stack = [tree];
            while (stack.length) {
                const node = stack[whileLoop === "reverse" ? "pop" : "shift"]();
                try {
                    if (filter(node))
                        return node;
                }
                catch { }
                if (stack.length >= maxStack)
                    continue;
                if (Array.isArray(node)) {
                    stack.push(...node);
                }
                else if (typeof node === "object" && node !== null) {
                    if (walkable.length > 0) {
                        stack.push(...Object.entries(node)
                            .filter(([key, value]) => walkable.indexOf(key) !== -1 && exclude.indexOf(key) === -1)
                            .map(([key, value]) => value));
                    }
                    else {
                        stack.push(...Object.values(node).filter((key) => exclude.indexOf(key) === -1 && node));
                    }
                }
                depth++;
            }
            return null;
        }
        else {
            let returnValue;
            try {
                if (filter(tree))
                    return tree;
            }
            catch { }
            if (Array.isArray(tree)) {
                for (const value of tree) {
                    returnValue = findInTree(value, filter, {
                        walkable,
                        exclude,
                        whileLoop,
                        maxDepth,
                        depth: depth + 1,
                    });
                    if (returnValue)
                        return returnValue;
                }
            }
            let keys = walkable.length > 0 ? walkable : Object.keys(tree);
            for (const key of keys) {
                if (!tree.hasOwnProperty(key) || exclude.includes(key))
                    continue;
                returnValue = findInTree(tree[key], filter, {
                    walkable,
                    exclude,
                    whileLoop,
                    maxDepth,
                    depth: depth + 1,
                });
                if (returnValue)
                    return returnValue;
            }
            return null;
        }
    }

    /**
     * Finds an object in a React tree.
     * @memberof module:utilities
     * @param {object} tree The tree to search.
     * @param {function} filter A filter function that should return true when it checks what you want to find.
     * @param {object} [whileLoop=false] Whether or not to use a while loop instead of recursion. This is slower, but not prone to stack overflow.
     */ function findInReactTree(tree, filter, { whileLoop = false, maxDepth = 100, depth = 0 } = {}) {
        return findInTree(tree, filter, {
            walkable: ["props", "children", "child", "sibling"],
            exclude: ["__reactFiber$", "__reactFiber", "__reactInternalInstance$", "__reactInternalInstance"],
            whileLoop,
            maxDepth,
            depth,
        });
    }

    /**
     * @param {HTMLElement|string} node The node, node ID, node class name, or partial node class name to get the React instance from.
     * @memberof module:utilities
     * @returns {object}
     */ function getReactInstance(node) {
        if (typeof node === "string")
            node = document.querySelector(`${node}, .${node}, #${node}, [class*="${node}"]`);
        if (!node)
            return null;
        if (node.__reactFiber$)
            return node.__reactFiber$; // new React
        if (node.__reactInternalInstance$)
            return node.__reactInternalInstance$; // old React
        return node[Object.keys(node).find((e) => e.startsWith("__reactFiber$")) // new React
        ] || node[Object.keys(node).find((e) => e.startsWith("__reactInternalInstance")) // old React
        ];
    }

    /**
     * @param {HTMLElement|string} node The node, node ID, node class name, or partial node class name to get the owner instance from.
     * @memberof module:utilities
     * @returns {object}
     */ function getOwnerInstance(node) {
        for (let curr = getReactInstance(node); curr; curr = curr.return) {
            const owner = curr.stateNode;
            if (owner)
                return owner;
        }
        return null;
    }

    function testComponent(Component) {
        ModalStack.openModal(() => Component);
    }

    /**
     * @param {function} codeblock The code to benchmark.
     * @param {number} times The amount of times to run the benchmark.
     * @memberof module:utilities
     * @returns {Promise} A Promise that resolves when the benchmark is completed.
     */ function benchmark(codeblock, times) {
        return new Promise((resolve) => {
            const pre = codeblock.pre ?? (() => { });
            delete codeblock.pre;
            const post = codeblock.post ?? (() => { });
            delete codeblock.post;
            const name = Object.keys(codeblock)[0];
            codeblock = codeblock[Object.keys(codeblock)[0]];
            let promises = [];
            for (let i = 0; i < times; i++) {
                promises.push(new Promise((resolve) => {
                    let returns, start, end;
                    try {
                        pre();
                        start = nanoseconds();
                        returns = codeblock();
                        end = nanoseconds();
                        post();
                    }
                    catch (e) {
                        resolve({ returns, time: 0, error: e });
                    }
                    resolve({ returns, time: end - start, error: false });
                }));
            }
            Promise.all(promises).then((allReturns) => {
                const finalTimes = allReturns.map((r) => r.time);
                resolve({
                    name,
                    average: average(finalTimes),
                    median: median(finalTimes),
                    error: allReturns[0].error,
                    returns: allReturns[0].returns,
                });
            });
        });
    }

    /**
     * Prints out the benchmark results for each code block.
     * @memberof module:utilities
     * @param {function} codeblock The code to benchmark.
     * @param {number} times The amount of times to run the benchmark.
     */ function multiBenchmark(codeblocks, times) {
        return new Promise((resolve) => {
            const start = nanoseconds();
            Promise.all(codeblocks.map((codeblock) => benchmark(codeblock, times))).then((results) => {
                const end = nanoseconds();
                const groupName = `Benchmarked ${codeblocks.length.toLocaleString()} functions ${times.toLocaleString()} times over ${(end - start).toLocaleString()}ns.`;
                group(groupName);
                const mappedResults = Object.values(results).map((result) => {
                    return {
                        Name: result.name,
                        "Median Time": `${result.median.toLocaleString()}ns`,
                        "Average Time": `${result.average.toLocaleString()}ns`,
                        Returns: result.returns,
                        Error: result.error,
                        "(Median Time)": result.median,
                        "(Average Time)": result.average,
                    };
                });
                const successfulResults = mappedResults.filter((result) => result.Error === false);
                const erroredResults = mappedResults.filter((result) => !!result.Error);
                console.table(successfulResults.sort((result1, result2) => {
                    if (result1["(Median Time)"] > result2["(Median Time)"])
                        return 1;
                    if (result1["(Median Time)"] < result2["(Median Time)"])
                        return -1;
                    return 0;
                }), ["Name", "Median Time", "Average Time", "Returns"]);
                if (erroredResults.length > 0) {
                    console.table(erroredResults, ["Name", "Error"]);
                }
                groupEnd(groupName);
                resolve(results);
            });
        });
    }

    /**
     * @param {number[]} array An array of numbers.
     * @memberof module:utilities
     * @returns {number} The average of the numbers in the array.
     */ function average(array) {
        if (array.length === 0)
            return 0;
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total / array.length;
    }

    /**
     * @param {number[]} array An array of numbers.
     * @memberof module:utilities
     * @returns {number} The median of the numbers in the array.
     */ function median(array) {
        if (array.length === 0)
            return 0;
        array.sort(function (a, b) {
            return a - b;
        });
        let half = Math.floor(array.length / 2);
        if (array.length % 2)
            return array[half];
        return (array[half - 1] + array[half]) / 2.0;
    }

    /**
     * @param {number} min The minimum value of the returned number.
     * @param {number} mix The maximum value of the returned number.
     * @memberof module:utilities
     * @returns {number} A random number.
     */ function randomNumber(min, max) {
        return Math.random() * max - min;
    }

    /**
     * @param {number} length The length of the string.
     * @param {string|array} dontMatch A string or an array of strings that will cause a regeneration if any are matched.
     * @param {string|array} charset A list of the characters to use when generating the string.
     * @memberof module:utilities
     * @returns {string} A string of random characters.
     */ function randomString(length, dontMatch = "", charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        if (typeof length !== "number" && length <= 0)
            return;
        if (typeof dontMatch !== "string" && !Array.isArray(dontMatch))
            return;
        if (typeof charset !== "string" && !Array.isArray(charset))
            return;
        let string = "";
        do {
            while (string.length < length) {
                string += charset[Math.round(randomNumber(0, charset.length - 1))];
            }
            string = string.slice(0, length);
        } while (dontMatch &&
            (string === dontMatch || dontMatch.some((m) => m === string)));
        return string;
    }

    var joinClasses$1 = (...classes) => classes.filter(s => typeof s === 'string').join(" ");

    /**
     * @param {string} className The class name to search for
     * @memberof module:utilities
     * @returns {object} The module
     */ function searchClassNameModules (className) {
        return find(m => Object.values(m).some(v => typeof v === "string" &&
            ~v.split(" ").indexOf(className)));
    }

    const classes$1 = {
        default: /*#__PURE__*/ (() => findByProps("icon", "selected").icon)(),
        contextmenu: /*#__PURE__*/ (() => findByProps("icon", "submenu").icon)(),
        minipopover: /*#__PURE__*/ (() => findByProps("icon", "isHeader").icon)(),
    };
    /**
     * Render any Discord icon.
     * @name DiscordIcon
     * @param {object} props React properties. All unlisted properties will be passed down to the component.
     * @param {string} [props.type="default"] The FontAwesome icon type. `default`, `minipopover`, `contextmenu`, `none`.
     * @param {string} [props.name] The `displayName` of the icon component in Discord.
     * @memberof module:components
     * @example
     * return (
     *   <DiscordIcon type="minipopover" />
     * );
     */
    function DiscordIcon(props) {
        const choosenClass = React$2.useMemo(() => {
            switch (props.type) {
                case "minipopover":
                    return classes$1.minipopover;
                case "contextmenu":
                    return classes$1.contextmenu;
                case "none":
                    return "";
                default:
                    return classes$1.default;
            }
        });
        const IconSVG = findByDisplayName(props.name) ??
            (() => {
                return "";
            });
        return (React$2.createElement(IconSVG, { ...props, className: [choosenClass, props.className].filter(c => typeof c === "string").join(" "), style: Object.assign({}, {
                width: "inherit",
                height: "inherit",
            }, props.style) }));
    }

    const LayerProvider = /*#__PURE__*/ (() => findByProps("AppLayerProvider").AppLayerProvider().props.layerContext
        .Provider)();
    const AccessibilityProvider = /*#__PURE__*/ (() => findByProps("AccessibilityPreferencesContext").AccessibilityPreferencesContext.Provider)();
    const layerClass = /*#__PURE__*/ (() => findByProps("LayerClassName").LayerClassName)();
    /**
     * Wrap a component rendered out-of-tree in Discord's providers
     * @name DiscordProviders
     * @memberof module:components
     * @example
     * return (
     *   <DiscordProviders>
     * 		<Whatever/>
     * 	 </DiscordProviders>
     * );
     */
    function DiscordProviders(props) {
        return (React$2.createElement(AccessibilityProvider, { value: { reducedMotion: { enabled: false, rawValue: "no-preference" } } },
            React$2.createElement(LayerProvider, { value: [document.querySelector("#app-mount > ." + layerClass)] }, props.children)));
    }

    function FluxWrapper(props) {
        if (!props.children.displayName)
            props.children.displayName = "FluxProxy";
        const ConnectedComponent = Flux.connectStores(props.stores ? Object.values(props.stores) : [], props.createProps ??
            (() => {
                return { [Math.random()]: Math.random() };
            }))(props.children);
        return React$2.createElement(ConnectedComponent, { ...props.stores });
    }

    const Changelog = /*#__PURE__*/ findByProps("lead", "socialLink");
    const ChangelogModal = /*#__PURE__*/ findByProps("maxModalWidth", "content"); // i assume its related to the changelog modal
    const Margins$1 = /*#__PURE__*/ findByProps("marginLarge", "marginTop20");
    const CardLook = /*#__PURE__*/ findByProps("arrow", "container", "description");
    const TabBar$1 = /*#__PURE__*/ findByProps("newBadge", "tabBar");

    /**
     * A Category component to hide components. Note that this does not use the current category component of the mod.
     * @name DiscordProviders
     * @memberof module:components
     * @param {object} props React properties.
     * @param {string} [props.title] The title of the category.
     * @param {string} [props.description] The description of the category.
     * @param {string} [props.icon] The description of the category.
     * @example
     * return (
     *   <Category title="Name">
     * 		<Whatever/>
     * 	 </Category>
     * );
     */
    function Category$1({ title, description, icon, children, openedByDefault = false }) {
        const [opened, setOpened] = React$2.useState(openedByDefault);
        return React$2.createElement("div", { styles: { marginBottom: "20px" } },
            React$2.createElement("div", { className: CardLook.container, onClick: () => setOpened(!opened) },
                icon && React$2.createElement("div", { className: CardLook.icon },
                    React$2.createElement(DiscordIcon, { name: icon, style: { width: "20px", height: "20px" } })),
                React$2.createElement("div", { className: CardLook.description },
                    React$2.createElement("div", { className: "title-2dsDLn" }, title),
                    description && React$2.createElement(Text, null, description)),
                React$2.createElement("div", { className: CardLook.arrow },
                    React$2.createElement(DiscordIcon, { name: "DropdownArrow", style: { width: "24px", height: "24px", color: "var(--interactive-active)", transform: !opened ? "rotate(-90deg)" : void 0 } }))),
            opened && React$2.createElement("div", { style: { marginTop: "16px", padding: "0 20px" } }, children));
    }

    /**
     * @module components
     */
    // Wrapper for Switch component to fix the switch box not being updatable. Check https://github.com/BetterDiscordBuilder/bdbuilder/blob/master/common/hooks/createUpdateWrapper.js
    const makeUpdateWrapper = (Component, checkPropName = "value", type = "switch") => {
        const typeSwitch = (v) => {
            switch (type) {
                case "switch": {
                    return v;
                }
                case "radio": {
                    return v.value;
                }
                default: {
                    return v;
                }
            }
        };
        return (props) => {
            const [value, setValue] = React$2.useState(props[checkPropName]);
            return React$2.createElement(Component, { ...{
                    ...props,
                    [checkPropName]: value,
                    onChange: (...args) => {
                        const value = args[0];
                        if (typeof props.onChange === "function")
                            props.onChange(value);
                        setValue(typeSwitch(value));
                    }
                } });
        };
    };
    const Button = /*#__PURE__*/ findByProps("Colors", "Looks", "DropdownSizes");
    const Spinner = /*#__PURE__*/ findByDisplayName("Spinner");
    const Text = /*#__PURE__*/ findByDisplayName("LegacyText");
    const TextInput = /*#__PURE__*/ findByDisplayName("TextInput");
    const Tooltip = /*#__PURE__*/ findByDisplayName("Tooltip");
    const TooltipContainer = /*#__PURE__*/ (() => findByProps("TooltipContainer")?.TooltipContainer)();
    const SlideIn = /*#__PURE__*/ findByDisplayName("SlideIn");
    const SettingsNotice = /*#__PURE__*/ findByDisplayName("SettingsNotice");
    const TransitionGroup = /*#__PURE__*/ findByDisplayName("TransitionGroup");
    const Flex = /*#__PURE__*/ findByDisplayName("Flex");
    const Card = /*#__PURE__*/ findByDisplayName("Card");
    const Popout = /*#__PURE__*/ findByDisplayName("Popout");
    const Progress = /*#__PURE__*/ findByDisplayName("Progress");
    const Modal = /*#__PURE__*/ findByProps("ModalRoot");
    const Forms = /*#__PURE__*/ findByProps('FormItem');
    const ColorPicker$1 = /*#__PURE__*/ findByDisplayName("ColorPicker");
    const Anchor = /*#__PURE__*/ findByDisplayName("Anchor");
    const Heading = /*#__PURE__*/ (() => findByProps("Heading").Heading)();
    const KeyboardShortcut = /*#__PURE__*/ (() => findByProps("PRETTY_KEYS").default)();
    const SearchBar = /*#__PURE__*/ (() => findByProps("SearchIcon").default)();
    const OriginalRadioGroup = /*#__PURE__*/ findByDisplayName("RadioGroup");
    const RadioGroup = makeUpdateWrapper(OriginalRadioGroup, "value", "radio");
    const OriginalSwitch = /*#__PURE__*/ findByDisplayName("Switch");
    const Switch = makeUpdateWrapper(OriginalSwitch, "checked");
    const OriginalSwitchItem = /*#__PURE__*/ findByDisplayName("SwitchItem");
    const SwitchItem = makeUpdateWrapper(OriginalSwitchItem, "value");
    const Markdown = /*#__PURE__*/ (() => find(m => m?.default?.displayName == "Markdown" && m?.default?.rules)?.default)();
    const TabBar = /*#__PURE__*/ findByDisplayName("TabBar");
    const ContextMenu =  findByProps("MenuItem").default;
    Object.entries(findByProps("MenuItem")).forEach(([key, contents]) => {
        if (!ContextMenu[key]) {
            ContextMenu[key] = contents;
        }
    });
    const Avatar = /*#__PURE__*/ (() => findByProps("AnimatedAvatar").default)();


    const Slider = /*#__PURE__*/ (() => findByProps("MarkerPositions").default)();

    var index$7 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        makeUpdateWrapper: makeUpdateWrapper,
        Button: Button,
        Spinner: Spinner,
        Text: Text,
        TextInput: TextInput,
        Tooltip: Tooltip,
        TooltipContainer: TooltipContainer,
        SlideIn: SlideIn,
        SettingsNotice: SettingsNotice,
        TransitionGroup: TransitionGroup,
        Flex: Flex,
        Card: Card,
        Popout: Popout,
        Progress: Progress,
        Modal: Modal,
        Forms: Forms,
        ColorPicker: ColorPicker$1,
        Anchor: Anchor,
        Heading: Heading,
        KeyboardShortcut: KeyboardShortcut,
        SearchBar: SearchBar,
        OriginalRadioGroup: OriginalRadioGroup,
        RadioGroup: RadioGroup,
        OriginalSwitch: OriginalSwitch,
        Switch: Switch,
        OriginalSwitchItem: OriginalSwitchItem,
        SwitchItem: SwitchItem,
        Markdown: Markdown,
        TabBar: TabBar,
        ContextMenu: ContextMenu,
        Avatar: Avatar,
        Slider: Slider,
        DiscordIcon: DiscordIcon,
        DiscordProviders: DiscordProviders,
        FluxWrapper: FluxWrapper,
        Category: Category$1
    });

    var messageBox = (title, description, buttons) => {
        return new Promise((resolve) => {
            ModalActions.openModal((props) => React$2.createElement(Modal.ModalRoot, { ...props },
                React$2.createElement(Modal.ModalHeader, { separator: false },
                    React$2.createElement(Heading, { variant: "heading-lg/medium" }, title)),
                React$2.createElement(Modal.ModalContent, null,
                    React$2.createElement(Text, null, description)),
                React$2.createElement(Modal.ModalFooter, null, buttons.map(button => React$2.createElement(Button, { onClick: () => {
                        button.action();
                        props.onClose();
                        resolve(button);
                    }, color: button.color ?? Button.Colors.BRAND, look: button.look ?? Button.Looks.FILLED }, button.text)))));
        });
    };

    const { getMessages: discordGetMessages$1 } = /*#__PURE__*/ findByProps("getMessages", "getMessage");
    function getMessages(channelID) {
        const messages = _.merge(_.keyBy(discordGetMessages$1(channelID)._array, "id"), messageCache[channelID] ?? {});
        return (messageCache[channelID] = messages);
    }

    const { getMessage: discordGetMessage$1 } = /*#__PURE__*/ findByProps("getMessages", "getMessage");
    const { getMessageByReference } = /*#__PURE__*/ findByProps("getMessageByReference");
    function getMessage(channelID, messageID) {
        return _.set(messageCache, [channelID, messageID], discordGetMessage$1(channelID, messageID) ??
            getMessageByReference({
                message_id: messageID,
                channel_id: channelID,
            }).message ??
            messageCache[channelID]?.[messageID])[channelID][messageID];
    }

    const { Endpoints } = /*#__PURE__*/ findByProps("Endpoints");
    const User$2 = /*#__PURE__*/ findByPrototype("tag");
    const Timestamp = /*#__PURE__*/ findByPrototype("toDate", "month");
    const Message = /*#__PURE__*/ findByPrototype("isEdited");
    const DiscordAPI = /*#__PURE__*/ findByProps("getAPIBaseURL");
    function fetchMessage(channelID, messageID) {
        return new Promise((resolve, reject) => {
            const message = getMessage(channelID, messageID);
            if (message)
                return resolve(message);
            DiscordAPI.get({
                url: Endpoints.MESSAGES(channelID),
                query: {
                    limit: 100,
                    around: messageID,
                },
            })
                .then((res) => {
                if (res.status != 200)
                    return reject();
                for (let m of res.body) {
                    m.author = new User$2(m.author);
                    m.timestamp = new Timestamp(m.timestamp);
                    m = new Message(m);
                    _.set(messageCache, [m.channel_id, m.id], m);
                }
                const foundMessage = messageCache[channelID]?.[messageID];
                if (foundMessage)
                    resolve(foundMessage);
                reject();
            })
                .catch((res) => {
                // logger.error(res);
                if (res.status != 403)
                    return reject();
            });
        });
    }

    const { getMessages: discordGetMessages } = /*#__PURE__*/ findByProps("getMessages", "getMessage");
    const { getChannelId } = /*#__PURE__*/ findByProps("getChannelId");
    function rerenderAllMessages(props = {}) {
        const messages = discordGetMessages(getChannelId())._array;
        for (const message of messages) {
            rerenderMessage(message, props);
        }
    }

    const { getMessage: discordGetMessage } = /*#__PURE__*/ findByProps("getMessages", "getMessage");
    function rerenderMessage(idOrMessage, props = {}) {
        let message = typeof idOrMessage === "string"
            ? discordGetMessage(idOrMessage)
            : idOrMessage;
        if (!message)
            return;
        message = {
            id: message.id,
            channel_id: message.channel_id,
            content: message.content,
        };
        updateMessage(message, props);
    }

    const FluxDispatcher = /*#__PURE__*/ findByProps("dispatch", "dirtyDispatch");
    function updateMessage(message, props = {}) {
        FluxDispatcher.dirtyDispatch({
            ...props,
            type: "MESSAGE_UPDATE",
            message,
        });
    }

    let messageCache = {};

    var index$6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        messageCache: messageCache,
        getMessages: getMessages,
        getMessage: getMessage,
        fetchMessage: fetchMessage,
        rerenderAllMessages: rerenderAllMessages,
        rerenderMessage: rerenderMessage,
        updateMessage: updateMessage
    });

    /**
     * @module utilities
     */

    var index$5 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getClientMod: getClientMod,
        nanoseconds: nanoseconds,
        wait: randomString$1,
        findInTree: findInTree,
        findInReactTree: findInReactTree,
        getReactInstance: getReactInstance,
        getOwnerInstance: getOwnerInstance,
        testComponent: testComponent,
        benchmark: benchmark,
        multiBenchmark: multiBenchmark,
        average: average,
        median: median,
        randomNumber: randomNumber,
        randomString: randomString,
        joinClasses: joinClasses$1,
        searchClassNameModules: searchClassNameModules,
        messageBox: messageBox,
        messages: index$6
    });

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {string} type The type of patch to apply. `before`, `instead`, `after`.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {object} {@link module:utils/patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patching
     */ function patch(name, object, functionName, type, patchFunction) {
        const id = object.__ittai__ ?? randomString(25, Object.keys(patches));
        object.__ittai__ = object.__ittai__ ?? id;
        if (!patches[id])
            patches[id] = {};
        /**
         * @memberof module:patcher
         * @prop {string} name The name of the function being patched.
         * @prop {string} type The type of the patch.
         * @prop {function} patchFunction The original function.
         * @prop {function} unpatch The function to call to unpatch.
         */
        const patchData = {
            name,
            type,
            patchFunction,
            unpatch: function () {
                try {
                    const patchIndex = patches[id][functionName].patches.indexOf(this);
                    if (patchIndex === -1)
                        throw "Couldn't find the patch. This probably happened because the object was tampered with. Don't do that.";
                    // Delete patch.
                    patches[id][functionName].patches.splice(patchIndex, 1);
                    // Clean up the object if there are no patches left.
                    if (patches[id][functionName].patches.length === 0) {
                        // Restore original function.
                        object[functionName] = patches[id][functionName].original;
                        delete patches[id][functionName];
                    }
                    if (!Object.keys(patches[id]).length) {
                        delete patches[id];
                    }
                }
                catch (e) {
                    error(`Failed to unpatch ${name}.`, e);
                }
            },
        };
        if (!patches[id][functionName]) {
            patches[id][functionName] = {
                original: object[functionName],
                patches: [],
            };
            const props = { ...object[functionName] };
            object[functionName] = function (...args) {
                const functionData = patches[id][functionName];
                const befores = functionData.patches.filter((p) => p.type === "before");
                const insteads = functionData.patches.filter((p) => p.type === "instead");
                const afters = functionData.patches.filter((p) => p.type === "after");
                // Before patches.
                for (const before of befores) {
                    try {
                        const callback = before.patchFunction(args, this);
                        if (callback)
                            args = callback;
                    }
                    catch (e) {
                        error(`Error running before patch ${name}.`, e);
                    }
                }
                // Instead patches.
                let res = {};
                let ranOnce = false;
                if (insteads.length === 0) {
                    (res = functionData.original.call(this, ...args)), (ranOnce = true);
                }
                else {
                    // Bad, fix later.
                    for (const instead of insteads) {
                        // Do trash merge with Lodash.
                        try {
                            (res = globalThis._.merge(res, instead.patchFunction(args, this, functionData.original) ?? {})),
                                (ranOnce = true);
                        }
                        catch (e) {
                            error(`Error running instead patch ${name}.`, e);
                        }
                    }
                }
                if (!ranOnce) {
                    res = functionData.original.call(this, ...args);
                }
                // After patches.
                for (const after of afters) {
                    try {
                        const callback = after.patchFunction(args, res, this);
                        if (callback)
                            res = callback;
                    }
                    catch (e) {
                        error(`Error running after patch ${name}.`, e);
                    }
                }
                return res;
            };
            Object.assign(object[functionName], props);
            object[functionName].toString = () => patches[id][functionName].original.toString();
        }
        patches[id][functionName].patches.push(patchData);
        return patchData;
    }

    /**
     * @module patcher
     */
    /**
     * A list of the currently patched components.
     */
    let patches = [];

    var index$4 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        patches: patches,
        before: before,
        instead: instead,
        after: after,
        unpatchAll: unpatchAll,
        patch: patch
    });

    const renderChangelogContent = (content) => {
        return React$2.createElement(React$2.Fragment, null, Object.entries(content).map(([title, { type, items }]) => React$2.createElement("div", { className: ChangelogModal.content },
            React$2.createElement("h1", { className: joinClasses$1(Changelog[type], Changelog.marginTop) }, title),
            React$2.createElement("ul", null, items.map(item => React$2.createElement("li", null,
                React$2.createElement(Markdown, null, item)))))));
    };
    const openChangelogModal = (changelog = settingsChangelog) => {
        const { changelog: settingsChangelog, manifest } = config;
        ModalActions.openModal((props) => React$2.createElement(Modal.ModalRoot, { ...props, size: Modal.ModalSize.SMALL, className: ChangelogModal.modal },
            React$2.createElement(Modal.ModalHeader, { separator: false },
                React$2.createElement(Flex, null,
                    React$2.createElement(Flex.Child, { grow: 1, shrink: 1 },
                        React$2.createElement(Heading, { variant: "heading-lg/medium" },
                            manifest.name,
                            " - ",
                            manifest.version),
                        changelog.date && React$2.createElement(Text, { className: Changelog.date, size: Text.Sizes.SIZE_12 }, changelog.date)),
                    React$2.createElement(Modal.ModalCloseButton, { onClick: props.onClose }))),
            React$2.createElement(Modal.ModalContent, null,
                changelog.image && React$2.createElement("img", { className: Changelog.video, src: changelog.image, width: "451" }),
                renderChangelogContent(changelog.contents))));
    };
    const hasSeenChangelog = () => get(`__ittai_changelog_${manifest.version}`);
    const setSeenChangelog = (set$1) => set(`__ittai_changelog_${manifest.version}`, set$1);

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        renderChangelogContent: renderChangelogContent,
        openChangelogModal: openChangelogModal,
        hasSeenChangelog: hasSeenChangelog,
        setSeenChangelog: setSeenChangelog
    });

    const MessageCreators = findByProps("createBotMessage");
    const MessageActions = findByProps("receiveMessage");
    const AvatarDefaults = findByProps("BOT_AVATARS");
    const DefaultMessage = {
        state: "SENT",
        author: addBotAuthor({
            avatar: { avatarId: "ittai", imageUrl: "https://cdn.discordapp.com/avatars/264062457448759296/1f9b1743cf625ca2d51ee517b5efd8a7.webp" },
            author: { username: "Ittai" }
        }),
        content: "Hello! By the way, you forgot to add a `\"content\"` attribute to the message!"
    };
    function addBotAuthor({ avatar, author }) {
        const avatarId = avatar?.avatarId ?? randomString(10);
        if (AvatarDefaults?.BOT_AVATARS && !AvatarDefaults.BOT_AVATARS[avatarId]) {
            AvatarDefaults.BOT_AVATARS[avatarId] = avatar.imageUrl;
        }
        return {
            avatar: avatarId,
            id: author?.authorId ?? randomString(10),
            bot: true,
            discriminator: author?.discriminator ?? "0000",
            username: author?.username ?? "BotUser"
        };
    }
    function sendMessage(channelId, message) {
        MessageActions.receiveMessage(channelId, Object.assign({}, MessageCreators.createBotMessage(channelId, message?.content), DefaultMessage, message));
    }
    const BotMessage = { sendMessage, addBotAuthor };

    const CommandTypes = /*#__PURE__*/ Object.assign({}, findByProps("ApplicationCommandType"), findByProps("ApplicationCommandPermissionType"));
    const CommandsModule = /*#__PURE__*/ findByProps("BUILT_IN_COMMANDS");
    const ApplicationCommandDiscoveryApplicationIcon = /*#__PURE__*/ findByDisplayName("ApplicationCommandDiscoveryApplicationIcon");
    let iconPatch;
    function patchIcons() {
        if (!iconPatch) {
            iconPatch = after("IttaiIconCommandPatch", ApplicationCommandDiscoveryApplicationIcon, "default", (args, res, _this) => {
                const props = findInReactTree(res, (n) => n.src);
                const section = findInTree(args, (n) => n.icon);
                if (!props || !section || props.src.indexOf(section.icon) > 0)
                    return res;
                res.props.onClick = () => { };
                props.src = section.icon;
                return res;
            });
        }
    }
    function unpatchIcons() {
        iconPatch.unpatch();
        iconPatch = null;
    }
    const COMMAND_ARGUMENT_TYPES = {
        SUB_COMMAND: 1,
        SUB_COMMAND_GROUP: 2,
        STRING: 3,
        INTEGER: 4,
        BOOLEAN: 5,
        USER: 6,
        CHANNEL: 7,
        ROLE: 8,
    };
    let registeredCommands = [];
    let registeredSections = [];
    /**
     *
     * @param {object} id
     */
    function registerCommand(command) {
        patchIcons();
        const currentIDs = CommandsModule.BUILT_IN_COMMANDS.map(({ id }) => id);
        if (!command.id ?? false)
            command.id = randomString(10, currentIDs);
        if (currentIDs.indexOf(command.id) > -1)
            command.id += randomString(10, currentIDs);
        command.applicationId ??= "-1";
        command.execute ??= (() => { });
        command.displayName ??= command.name;
        command.displayDescription ??= command.description;
        command.options.map((opts) => {
            opts.displayName ??= opts.name;
            opts.displayDescription ??= opts.description;
            return opts;
        });
        CommandsModule.BUILT_IN_COMMANDS.push(command);
        registeredCommands.push(command.id);
        return command.id;
    }
    function unregisterCommand(id) {
        CommandsModule.BUILT_IN_COMMANDS.splice(CommandsModule.BUILT_IN_COMMANDS.findIndex((command) => command.id === id), 1);
    }
    function unregisterAllCommands() {
        for (const command of registeredCommands) {
            unregisterCommand(command);
        }
    }
    /**
     *
     * @param {object} id
     */
    function registerSection(section) {
        patchIcons();
        const currentIDs = CommandsModule.BUILT_IN_SECTIONS.map(({ id }) => id);
        if (!section.id ?? false)
            section.id = randomString(10, currentIDs);
        if (currentIDs.indexOf(section.id) > -1)
            section.id += randomString(10, currentIDs);
        section.isBuiltIn = false;
        CommandsModule.BUILT_IN_SECTIONS.push(section);
        registeredSections.push(section.id);
        return section.id;
    }
    function unregisterSection(id) {
        CommandsModule.BUILT_IN_COMMANDS.splice(CommandsModule.BUILT_IN_COMMANDS.findIndex((command) => command.id === id), 1);
    }
    function unregisterAllSections() {
        for (const command of registeredSections) {
            unregisterCommand(command);
        }
    }

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CommandTypes: CommandTypes,
        patchIcons: patchIcons,
        unpatchIcons: unpatchIcons,
        COMMAND_ARGUMENT_TYPES: COMMAND_ARGUMENT_TYPES,
        registeredCommands: registeredCommands,
        registeredSections: registeredSections,
        registerCommand: registerCommand,
        unregisterCommand: unregisterCommand,
        unregisterAllCommands: unregisterAllCommands,
        registerSection: registerSection,
        unregisterSection: unregisterSection,
        unregisterAllSections: unregisterAllSections,
        botMessage: BotMessage
    });

    const Messages = /*#__PURE__*/ findByProps('getMessage', 'getMessages');
    const Channels = /*#__PURE__*/ findByProps('getChannel', 'getDMFromUserId');
    const CurrentChannels = /*#__PURE__*/ findByProps('getChannelId', 'getLastSelectedChannelId');
    const Guilds = /*#__PURE__*/ findByProps('getGuild');
    const CurrentGuilds = /*#__PURE__*/ findByProps('getGuildId', 'getLastSelectedGuildId');
    const Info = /*#__PURE__*/ findByProps('getSessionId');
    const Status = /*#__PURE__*/ findByProps('getStatus', 'getActivities', 'getState');
    const Users = /*#__PURE__*/ findByProps('getUser', 'getCurrentUser');
    const UserSettings = /*#__PURE__*/ findByProps('guildFolders', 'theme');
    const UserProfile = /*#__PURE__*/ findByProps('getUserProfile');
    const Members = /*#__PURE__*/ findByProps('getMember');
    const Activities = /*#__PURE__*/ findByProps('getStatus', 'getActivities', 'getState');
    const Games = /*#__PURE__*/ findByProps('getGame', 'games');
    const Auth = /*#__PURE__*/ findByProps('getId', 'isGuest');
    const TypingUsers = /*#__PURE__*/ findByProps('isTyping');

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Messages: Messages,
        Channels: Channels,
        CurrentChannels: CurrentChannels,
        Guilds: Guilds,
        CurrentGuilds: CurrentGuilds,
        Info: Info,
        Status: Status,
        Users: Users,
        UserSettings: UserSettings,
        UserProfile: UserProfile,
        Members: Members,
        Activities: Activities,
        Games: Games,
        Auth: Auth,
        TypingUsers: TypingUsers
    });

    //@ts-ignore
    // import styles from "./ToastWrapper.css"
    function GenericToast({ children, }) {
        return React$2.createElement("div", { style: {
                background: "var(--background-secondary-alt)",
                borderRadius: "8px",
                padding: "12px",
                color: "var(--header-primary)",
                fontWeight: "600"
            } }, children);
    }

    /**
     * @module components
     */
    const { showToast, popToast } = findByProps("showToast");
    /**
     * Shows a toast using discord's own toast handler that was added on its 7th birthday for... achivements?
     * @param {Function<import('react').ReactElement<any>> | string} text Component to render
     * @param {object} options Options for the toast
     * @param {object} [options.id] The ID of the toast. If not given, it will be generated one randomly
     * @param {number} [options.duration] How long the toast should stay on screen
     * @param {number} [options.position = 1] Position of the toast. 0 is top, 1 is bottom
     * @returns {string} The ID of the toast
     */
    const show = (text, options) => {
        const toastID = options?.id ?? randomString(10);
        showToast({
            id: toastID,
            options: Object.assign({}, options, {
                position: POSITIONS.BOTTOM,
                component: typeof text !== "function" ? React$2.createElement(GenericToast, null, text) : text(),
            }),
        });
        return toastID;
    };
    /**
     * Removes a toast
     * @param {string} id The ID of the toast
     */
    const pop = (id) => popToast(id);
    const ToastWrapper = GenericToast;
    const POSITIONS = {
        TOP: 0,
        BOTTOM: 1
    };

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        show: show,
        pop: pop,
        ToastWrapper: ToastWrapper,
        POSITIONS: POSITIONS
    });

    var Ittai = /*#__PURE__*/Object.freeze({
        __proto__: null,
        changelog: index$3,
        components: index$7,
        commands: index$2,
        entities: index$8,
        logger: index$9,
        patcher: index$4,
        settings: index$a,
        stores: index$1,
        toast: index,
        utilities: index$5,
        webpack: webpack
    });

    const getAll = () => {
      return get("pinnedCategories", {});
    };
    const getCategories = () => {
      const pinnedCategories = Object.keys(getAll());
      return pinnedCategories;
    };
    const getCategory = (category) => {
      return getAll()[category];
    };
    const setRaw = (setting) => {
      set("pinnedCategories", setting);
      Dispatcher.dirtyDispatch({ type: "PINDMS_CHANGE_LIST" });
    };
    const addCategory = (category, settings2 = {
      color: ColorUtils.int2hex(Constants.DEFAULT_ROLE_COLOR),
      users: [],
      show: true
    }) => {
      let pinnedCategories = getAll();
      pinnedCategories[category] = settings2;
      setRaw(pinnedCategories);
    };
    const setColor = (category, color) => {
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      pinnedCategories[category].color = color;
      setRaw(pinnedCategories);
    };
    const getColor = (category) => {
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      return pinnedCategories[category].color;
    };
    const setVisibility = (category, visibility) => {
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      pinnedCategories[category].show = visibility;
      setRaw(pinnedCategories);
    };
    const getVisibility = (category) => {
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      return pinnedCategories[category].show ?? true;
    };
    const renameCategory = (oldCategoryName, newCategoryName) => {
      let pinnedCategories = getAll();
      Object.defineProperty(pinnedCategories, newCategoryName, Object.getOwnPropertyDescriptor(pinnedCategories, oldCategoryName));
      delete pinnedCategories[oldCategoryName];
      setRaw(pinnedCategories);
    };
    const removeCategory = (category) => {
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      delete pinnedCategories[category];
      setRaw(pinnedCategories);
    };
    const getUsers = (category) => {
      const pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      return pinnedCategories[category].users;
    };
    const setUserList = (category, userList) => {
      let pinnedCategories = getAll();
      pinnedCategories[category].users = userList;
      setRaw(pinnedCategories);
    };
    const addUser = (category, userID) => {
      if (typeof userID !== "string")
        throw new Error(`Invalid User ID`);
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      let userList = pinnedCategories[category].users;
      userList.push(userID);
      setUserList(category, userList);
    };
    const removeUser = (category, userID) => {
      if (typeof userID !== "string")
        throw new Error(`Invalid User ID`);
      let pinnedCategories = getAll();
      if (pinnedCategories[category] == null)
        throw new Error(`Category ${category} does not exist`);
      let userList = pinnedCategories[category].users;
      userList = userList.filter((user) => user !== userID);
      setUserList(category, userList);
    };
    const isUserAdded = (userID) => {
      return Object.values(getAll()).some(({ users }) => users.includes(userID));
    };
    const getUserCategory = (userID) => {
      const pinnedCategories = getAll();
      for (const categoryName in pinnedCategories) {
        const category = pinnedCategories[categoryName];
        if (category.users.some((user) => user === userID))
          return categoryName;
      }
    };
    const useListUpdate = () => {
      const [, forceUpdate] = React$2.useReducer((n) => !n, true);
      React$2.useEffect(() => {
        const listener = () => void forceUpdate();
        Dispatcher.subscribe("PINDMS_CHANGE_LIST", listener);
        return () => Dispatcher.unsubscribe("PINDMS_CHANGE_LIST", listener);
      }, []);
    };
    var pinnedDMS = {
      getAll,
      getCategories,
      getCategory,
      setRaw,
      addCategory,
      renameCategory,
      removeCategory,
      getColor,
      setColor,
      getVisibility,
      setVisibility,
      setUserList,
      addUser,
      getUsers,
      removeUser,
      isUserAdded,
      getUserCategory,
      useListUpdate
    };

    function moveObjectKey(object, from, to) {
      if (typeof from === "string") {
        from = Object.keys(object).findIndex((key) => key === from);
      }
      const changedOrder = moveArray(Object.entries(object), from, to);
      const newObj = changedOrder.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      return newObj;
    }
    function moveArray(arr, from, to) {
      let safeArr = arr;
      safeArr.splice(to, 0, safeArr.splice(from, 1)[0]);
      return safeArr;
    }

    const PrivateChannelsHeaderContainer = findByProps("privateChannelRecipientsInviteButtonIcon");
    const DMButtons = findByProps("channel", "linkButtonIcon");
    const Category = findByProps("addButtonIcon", "containerDragAfter");
    const Interactives = findByProps("interactive", "muted");
    const DeleteAccountButtonRow = findByProps("buttonContainer", "description", "disableButton");
    const Names = findByProps("nameAndDecorators");
    const Scrolling = findByProps("scrolling", "scrollerBase");
    const ServerMembers = findByProps("ui-scroller-wrap");
    const AccountControlButtons = findByProps("button", "disabled", "enabled");
    const ColorPicker = findByProps("custom", "customColorPickerInput", "colorPickerRow");
    const Margins = findByProps("marginLarge", "marginTop20");
    var classes = {
      PrivateChannelsHeaderContainer,
      DMButtons,
      ServerMembers,
      AccountControlButtons,
      ColorPicker,
      Margins,
      Scrolling,
      DeleteAccountButtonRow,
      Names,
      Interactives,
      Category
    };

    // @ts-ignore
    const { name } = manifest$1;
    let css = {};
    let elements = {};
    function addCSS(code, id) {
        css[id] = code;
    }
    function getAllCSSes() {
        return css;
    }
    function loadCSS(id) {
        elements[id] = Object.assign(document.createElement("style"), {
            textContent: css[id],
            id: `ittai-${name}-${id}`
        });
        document.head.appendChild(elements[id]);
    }
    function unloadCSS(id) {
        console.log(id, elements);
        elements[id]?.remove();
        delete elements[id];
    }

    addCSS(`
._wrapper_1k5se_1 {
    padding: 16px 10px;
    margin: 0 12px;
}
`, 5);
    var styles$6 = {"wrapper":"_wrapper_1k5se_1"};

    var joinClasses = (...classes) => classes.filter((s) => typeof s === "string").join(" ");

    const { React: React$1, React: {
      useState,
      useEffect
    } } = webpack;
    function User$1({ id, onMove, onRemove, disableUp = false, disableDown = false }) {
      const [user, setUser] = useState();
      useEffect(() => {
        const user2 = Users.getUser(id);
        if (!user2)
          throw new Error("User not found");
        setUser(Users.getUser(id));
      });
      return /* @__PURE__ */ React$1.createElement(Flex, {
        align: Flex.Align.CENTER,
        className: joinClasses(classes.ServerMembers.member, styles$6.wrapper)
      }, /* @__PURE__ */ React$1.createElement("div", {
        className: classes.ServerMembers.avatar
      }, /* @__PURE__ */ React$1.createElement(Avatar, {
        src: user?.getAvatarURL(false, true)?.replace("?size=16", ""),
        size: Avatar.Sizes.SIZE_40
      })), /* @__PURE__ */ React$1.createElement("div", {
        className: classes.ServerMembers.nameTag,
        style: { marginRight: "auto" }
      }, /* @__PURE__ */ React$1.createElement("div", {
        className: classes.ServerMembers.name
      }, user?.username), /* @__PURE__ */ React$1.createElement(Text, {
        color: Text.Colors.MUTED,
        size: Text.Sizes.SIZE_14
      }, "@", user?.username, "#", user?.discriminator)), /* @__PURE__ */ React$1.createElement(Flex, {
        direction: Flex.Direction.VERTICAL,
        grow: 0,
        shrink: 0
      }, /* @__PURE__ */ React$1.createElement(Button, {
        size: Button.Sizes.ICON,
        onClick: () => onMove("up"),
        disabled: disableUp,
        look: Button.Looks.BLANK,
        className: [
          classes.AccountControlButtons.button,
          disableUp ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled
        ].join(" ")
      }, /* @__PURE__ */ React$1.createElement(DiscordIcon, {
        name: "ArrowDropUp"
      })), /* @__PURE__ */ React$1.createElement(Button, {
        size: Button.Sizes.ICON,
        onClick: () => onMove("down"),
        disabled: disableDown,
        look: Button.Looks.BLANK,
        className: [
          classes.AccountControlButtons.button,
          disableDown ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled
        ].join(" ")
      }, /* @__PURE__ */ React$1.createElement(DiscordIcon, {
        name: "ArrowDropDown"
      }))), /* @__PURE__ */ React$1.createElement(TooltipContainer, {
        text: "Delete"
      }, /* @__PURE__ */ React$1.createElement(Button, {
        size: Button.Sizes.ICON,
        color: Button.Colors.RED,
        onClick: onRemove,
        look: Button.Looks.LINK
      }, /* @__PURE__ */ React$1.createElement(DiscordIcon, {
        name: "Trash"
      }))));
    }

    const CategoryView = {
      settingsValue: "category"
    };
    const MinimalistView = {
      settingsValue: "minimalist",
      userIcons: true
    };
    var settings = {
      DefaultSettings: {
        DISPLAY_MODE: CategoryView.settingsValue,
        MinimalistView,
        CategoryView,
        FRIENDS_PAGE: true,
        PIN_ICON: true,
        STREAMER_MODE: true
      }
    };

    const DISPATCHER_PINDMS_CHANGE_LIST = "PINDMS_CHANGE_LIST";

    addCSS(`
._namingColorWrapper_cekjd_1 {
    margin-bottom: 8px;
}

._textbox_cekjd_5 {
    width: 100%;
}

._properSpacing_cekjd_9 li {
    margin-left: 16px;
}
`, 6);
    var categoryStyles = {"namingColorWrapper":"_namingColorWrapper_cekjd_1","textbox":"_textbox_cekjd_5","properSpacing":"_properSpacing_cekjd_9"};

    class ErrorBoundary extends React$2.Component {
      constructor() {
        super(...arguments);
        this.state = { hasError: false };
      }
      componentDidCatch() {
      }
      static getDerivedStateFromError() {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError)
          return Boolean(this.props.renderError) ? this.props.renderError : null;
        return this.props.children;
      }
    }

    const { RoleCircle } = findByProps("RoleCircle");
    findByProps("roleDotLeft");
    function ChangeCategoryNameModal(modalProps) {
      const [newName, setNewName] = React$2.useState(modalProps.category);
      const [newColor, setNewColor] = React$2.useState(pinnedDMS.getColor(modalProps.category));
      return /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
        size: Modal.ModalSize.DYNAMIC,
        ...modalProps
      }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
        separator: false
      }, /* @__PURE__ */ React$2.createElement(TextInput, {
        value: newName,
        onChange: setNewName,
        placeholder: "Rename",
        className: categoryStyles.textbox
      })), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement(Forms.FormItem, null, /* @__PURE__ */ React$2.createElement(Forms.FormTitle, null, /* @__PURE__ */ React$2.createElement(Flex, {
        align: Flex.Align.CENTER
      }, /* @__PURE__ */ React$2.createElement(RoleCircle, {
        color: newColor,
        className: classes.Margins.marginLeft8
      }), " Color")), /* @__PURE__ */ React$2.createElement("div", {
        className: classes.Margins.marginBottom20
      }, /* @__PURE__ */ React$2.createElement(ErrorBoundary, {
        renderError: /* @__PURE__ */ React$2.createElement(Text, {
          color: Text.Colors.ERROR
        }, "An error happened while trying to load the ColorPicker. Check ", /* @__PURE__ */ React$2.createElement(Anchor, {
          href: "https://git.catvibers.me/Ittai/ittai/issues/9"
        }, "https://git.catvibers.me/Ittai/ittai/issues/9"), " for more information about.", /* @__PURE__ */ React$2.createElement("br", null), /* @__PURE__ */ React$2.createElement("br", null), "As of now, you can do these steps:", /* @__PURE__ */ React$2.createElement("ul", {
          className: categoryStyles.properSpacing
        }, /* @__PURE__ */ React$2.createElement("li", null, "- Remove the plugin from the plugins folder"), /* @__PURE__ */ React$2.createElement("li", null, "- Go to any server's settings"), /* @__PURE__ */ React$2.createElement("li", null, '- Go to "Roles"'), /* @__PURE__ */ React$2.createElement("li", null, "- Click on any role"), /* @__PURE__ */ React$2.createElement("li", null, "- Put the plugin back")), "This will load the ColorPicker component and then fix this error")
      }, /* @__PURE__ */ React$2.createElement(ColorPicker$1, {
        colors: Constants.ROLE_COLORS,
        defaultColor: Constants.DEFAULT_ROLE_COLOR,
        value: ColorUtils.hex2int(newColor),
        onChange: (c) => setNewColor(ColorUtils.int2hex(c))
      }))), /* @__PURE__ */ React$2.createElement(SwitchItem, {
        value: !pinnedDMS.getVisibility(modalProps.category),
        onChange: (e) => pinnedDMS.setVisibility(modalProps.category, !e)
      }, get("display", settings.DefaultSettings.DISPLAY_MODE) === settings.DefaultSettings.MinimalistView.settingsValue ? "Hide user preview" : "Hide user list"))), /* @__PURE__ */ React$2.createElement(Modal.ModalFooter, null, /* @__PURE__ */ React$2.createElement(Button, {
        onClick: () => {
          if (modalProps.category !== newName)
            pinnedDMS.renameCategory(modalProps.category, newName);
          pinnedDMS.setColor(modalProps.category, newColor);
          modalProps.onClose();
        }
      }, "Save"), /* @__PURE__ */ React$2.createElement(Button, {
        look: Button.Looks.LINK,
        color: Button.Colors.WHITE,
        onClick: modalProps.onClose
      }, "Cancel")));
    }

    addCSS(`
._createCategory_1o11w_1 {
    gap: 10px;

    ._textbox_1o11w_4 {
        flex-grow: 2;
    }
}

._dropdownArrow_1o11w_9 {
    width: 16px !important;
    height: 16px !important;
    margin-right: 4px;

    &._hidden_1o11w_14 {
        transform: rotate(-90deg);
    }
}

._exampleListSectionItem_1o11w_19 {
    padding: 0;
    width: auto;
    flex: unset;
    margin-right: 10px;
    cursor: pointer;
}

._userList_1o11w_27 {
    background: var(--background-secondary-alt);
    margin-top: 10px;
    padding-bottom: 20px;
    border-radius: 8px;
    overflow: hidden auto;
    max-height: 40vh;
    position: relative;

    ._empty_1o11w_36 {
        margin-top: 20px;
    }
}
`, 3);
    var styles$5 = {"createCategory":"_createCategory_1o11w_1","textbox":"_textbox_1o11w_4","dropdownArrow":"_dropdownArrow_1o11w_9","hidden":"_hidden_1o11w_14","exampleListSectionItem":"_exampleListSectionItem_1o11w_19","userList":"_userList_1o11w_27","empty":"_empty_1o11w_36"};

    addCSS(`
._userGrid_847wi_1 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 16px;

    ._user_847wi_1 {
        gap: 4px;
        border-radius: 4px;
        padding: 4px;
        cursor: pointer;

        &:hover {
            background: var(--background-modifier-hover);
        }

        &._disabled_847wi_17 {
            opacity: 0.4;

            cursor: not-allowed;
        }

        ._name_847wi_23 {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
`, 7);
    var styles$4 = {"userGrid":"_userGrid_847wi_1","user":"_user_847wi_1","disabled":"_disabled_847wi_17","name":"_name_847wi_23"};

    var limit = (array, limit = 50, from = 0) => array.slice(from, from + limit);

    const dmUsers = Channels.getSortedPrivateChannels().filter((channel) => channel.recipients.length === 1 && channel.recipients[0] != null).map((channel) => Users.getUser(channel.recipients[0]));
    const MAX_USER_DISPLAY = 60;
    function AddUserModal(props) {
      const [users, setUsers] = React$2.useState([]);
      const [search, setSearch] = React$2.useState("");
      React$2.useEffect(() => {
        const searchResult = dmUsers.filter((user) => !user.bot && ~user.username.toLowerCase().indexOf(search.toLowerCase()));
        const limitedResult = limit(searchResult, MAX_USER_DISPLAY);
        setUsers(limitedResult);
      }, [search]);
      return /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
        size: Modal.ModalSize.DYNAMIC,
        ...props
      }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
        separator: false
      }, /* @__PURE__ */ React$2.createElement(TextInput, {
        value: search,
        onChange: setSearch,
        placeholder: "Search for user",
        className: categoryStyles.textbox
      })), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement("div", {
        className: styles$4.userGrid
      }, users.map((user) => /* @__PURE__ */ React$2.createElement(User, {
        user,
        onClick: () => {
          props.onSelect(user);
          props.onClose();
        }
      })))));
    }
    const User = ({ user, onClick }) => {
      const isAdded = pinnedDMS.isUserAdded(user.id);
      return /* @__PURE__ */ React$2.createElement(Flex, {
        align: Flex.Align.CENTER,
        className: joinClasses(styles$4.user, isAdded ? styles$4.disabled : ""),
        onClick: () => {
          if (!isAdded)
            onClick?.();
        }
      }, /* @__PURE__ */ React$2.createElement(Avatar, {
        src: user.getAvatarURL(false, false),
        size: Avatar.Sizes.SIZE_16
      }), /* @__PURE__ */ React$2.createElement(Text, {
        color: Text.Colors.STANDARD,
        className: styles$4.name
      }, user.username));
    };

    const ListSectionItem$1 = findByDisplayName("ListSectionItem");
    const { EmptyStateImage: EmptyStateImage$1, default: EmptyState$1, EmptyStateText: EmptyStateText$1 } = findByProps("EmptyStateImage");
    const noCategoriesAddedClasses = findByProps("emptyCard", "itemCard");
    function UserListSettings({ openedCategory }) {
      useListUpdate();
      return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, Object.keys(pinnedDMS.getAll()).length !== 0 ? Object.entries(pinnedDMS.getAll()).map(([category, { users }], index) => /* @__PURE__ */ React$2.createElement(UserCategory, {
        name: category,
        users,
        index,
        hidden: category !== openedCategory
      })) : /* @__PURE__ */ React$2.createElement("div", {
        className: noCategoriesAddedClasses.emptyCard
      }, /* @__PURE__ */ React$2.createElement(Heading, {
        variant: "heading-md/medium",
        className: noCategoriesAddedClasses.emptyHeader
      }, "Hello? Anybody here?"), /* @__PURE__ */ React$2.createElement(Text, {
        className: noCategoriesAddedClasses.emptyText
      }, 'You can add categories by typing in the textbox above and hitting "Add"')));
    }
    const CreateCategory = () => {
      const [newCategory, setNewCategory] = React$2.useState("");
      const [error, setError] = React$2.useState("");
      return /* @__PURE__ */ React$2.createElement(Flex, {
        className: styles$5.createCategory,
        align: Flex.Align.CENTER
      }, /* @__PURE__ */ React$2.createElement(TextInput, {
        className: styles$5.textbox,
        value: newCategory,
        placeholder: "Name a new category",
        onChange: (e) => setNewCategory(e),
        error
      }), /* @__PURE__ */ React$2.createElement(Button, {
        onClick: () => {
          if (newCategory == "")
            setError("Please give a name");
          else {
            setError("");
            pinnedDMS.addCategory(newCategory);
          }
        }
      }, "Add"));
    };
    const UserCategory = ({ name, users, index, hidden = true }) => {
      const [hide, setHide] = React$2.useState(hidden);
      return /* @__PURE__ */ React$2.createElement("div", {
        key: name,
        className: styles$5.category
      }, /* @__PURE__ */ React$2.createElement(CategoryHeader, {
        ...{ name, index },
        onHide: () => setHide(!hide),
        hidden: hide
      }), !hide && /* @__PURE__ */ React$2.createElement("div", {
        className: joinClasses(styles$5.userList, classes.Scrolling.scrollerBase, classes.Scrolling.thin, classes.Scrolling.fade)
      }, users.length !== 0 ? users.map((id, index2) => /* @__PURE__ */ React$2.createElement(User$1, {
        id,
        onMove: (updn) => pinnedDMS.setUserList(name, moveArray(users, index2, index2 - (updn === "up" ? 1 : -1))),
        onRemove: () => pinnedDMS.removeUser(name, id),
        disableUp: index2 === 0,
        disableDown: index2 === users.length - 1
      })) : /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, Math.floor(Math.random() * 20) === 3 ? /* @__PURE__ */ React$2.createElement("iframe", {
        width: "560",
        height: "315",
        src: "https://www.youtube-nocookie.com/embed/tjs2xR2RZp0?controls=0",
        allow: "clipboard-write; encrypted-media"
      }) : /* @__PURE__ */ React$2.createElement("div", {
        className: styles$5.empty
      }, /* @__PURE__ */ React$2.createElement(EmptyState$1, {
        theme: UserSettings.theme
      }, /* @__PURE__ */ React$2.createElement(EmptyStateImage$1, {
        ...{
          "width": 376,
          "height": 162,
          "lightSrc": "/assets/02625ee29f851ec588c2020a88d82665.svg",
          "darkSrc": "/assets/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg"
        }
      }), /* @__PURE__ */ React$2.createElement(EmptyStateText$1, {
        note: /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, "This category is empty. Oh nevermind, there is Wumpus, but he is alone.")
      }))))));
    };
    const CategoryHeader = ({ name, index, hidden = false, onHide }) => {
      const handleCategoryPos = (updn) => {
        const index2 = Object.keys(pinnedDMS.getAll()).findIndex((k) => k === name);
        pinnedDMS.setRaw(moveObjectKey(pinnedDMS.getAll(), index2, index2 - updn));
      };
      return /* @__PURE__ */ React$2.createElement(Flex, {
        align: Flex.Align.CENTER
      }, /* @__PURE__ */ React$2.createElement(ListSectionItem$1, {
        className: joinClasses(classes.PrivateChannelsHeaderContainer.privateChannelsHeaderContainer, styles$5.exampleListSectionItem)
      }, /* @__PURE__ */ React$2.createElement(Flex, {
        style: { color: pinnedDMS.getColor(name), fontWeight: "bold" },
        align: Flex.Align.CENTER,
        onClick: onHide
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "DropdownArrow",
        className: joinClasses(styles$5.dropdownArrow, hidden ? styles$5.hidden : void 0)
      }), name)), /* @__PURE__ */ React$2.createElement(Popout, {
        position: Popout.Positions.BOTTOM,
        renderPopout: (props) => /* @__PURE__ */ React$2.createElement("div", {
          ...props
        }, /* @__PURE__ */ React$2.createElement(ChangeCategoryNameModal, {
          transitionState: 1,
          onClose: props.closePopout,
          category: name
        }))
      }, (popout) => /* @__PURE__ */ React$2.createElement(TooltipContainer, {
        text: "Edit category"
      }, /* @__PURE__ */ React$2.createElement(Button, {
        ...popout,
        size: Button.Sizes.ICON,
        look: Button.Looks.BLANK,
        className: joinClasses(classes.AccountControlButtons.button, classes.AccountControlButtons.enabled)
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "Pencil",
        style: { width: "20px", height: "20px" }
      })))), /* @__PURE__ */ React$2.createElement("div", {
        style: { marginRight: "auto" }
      }), /* @__PURE__ */ React$2.createElement(Popout, {
        position: Popout.Positions.LEFT,
        renderPopout: (props) => /* @__PURE__ */ React$2.createElement("div", {
          ...props
        }, /* @__PURE__ */ React$2.createElement(AddUserModal, {
          transitionState: 1,
          onClose: props.closePopout,
          onSelect: (user) => {
            if (user.id != null)
              pinnedDMS.addUser(name, user.id);
          }
        }))
      }, (popout) => /* @__PURE__ */ React$2.createElement(TooltipContainer, {
        text: "Add a new person"
      }, /* @__PURE__ */ React$2.createElement(Button, {
        ...popout,
        size: Button.Sizes.ICON,
        look: Button.Looks.BLANK,
        className: joinClasses(classes.AccountControlButtons.button, classes.AccountControlButtons.enabled)
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "PersonAdd",
        style: { width: "20px", height: "20px" }
      })))), /* @__PURE__ */ React$2.createElement(Flex, {
        direction: Flex.Direction.VERTICAL,
        grow: 0,
        shrink: 0
      }, /* @__PURE__ */ React$2.createElement(Button, {
        size: Button.Sizes.ICON,
        onClick: () => handleCategoryPos(1),
        disabled: index === 0,
        look: Button.Looks.BLANK,
        className: joinClasses(classes.AccountControlButtons.button, index === 0 ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled)
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "ArrowDropUp"
      })), /* @__PURE__ */ React$2.createElement(Button, {
        size: Button.Sizes.ICON,
        onClick: () => handleCategoryPos(-1),
        disabled: index === pinnedDMS.getCategories().length - 1,
        look: Button.Looks.BLANK,
        className: joinClasses(classes.AccountControlButtons.button, index === pinnedDMS.getCategories().length - 1 ? classes.AccountControlButtons.disabled : classes.AccountControlButtons.enabled)
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "ArrowDropDown"
      }))), /* @__PURE__ */ React$2.createElement(TooltipContainer, {
        text: "Delete"
      }, /* @__PURE__ */ React$2.createElement(Button, {
        size: Button.Sizes.ICON,
        color: Button.Colors.RED,
        onClick: () => pinnedDMS.removeCategory(name),
        look: Button.Looks.LINK
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "Trash"
      }))));
    };

    addCSS(`
._buttonFlex_qbavy_1 {
    gap: 16px;
}

._noTopMargin_qbavy_5 {
    margin-top: 0;
}

._tooltip_qbavy_9 {
    min-width: 524px;

    img {
        width: 500px
    }
}

._tooltipWrapper_qbavy_17 {
    margin-left: 4px;
}
`, 0);
    var styles$3 = {"buttonFlex":"_buttonFlex_qbavy_1","noTopMargin":"_noTopMargin_qbavy_5","tooltip":"_tooltip_qbavy_9","tooltipWrapper":"_tooltipWrapper_qbavy_17"};

    var isValidJSON = (json) => {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
      }
      return false;
    };

    const Tabs = {
      CATEGORIES: "CATEGORIES",
      SETTINGS: "SETTINGS"
    };
    function Settings() {
      const [tab, setTab] = React$2.useState(Tabs.CATEGORIES);
      return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(TabBar, {
        onItemSelect: setTab,
        className: joinClasses$1(TabBar$1.tabBar, styles$3.noTopMargin),
        look: TabBar.Looks.BRAND,
        type: TabBar.Types.TOP,
        selectedItem: tab
      }, /* @__PURE__ */ React$2.createElement(TabBar.Item, {
        id: Tabs.CATEGORIES,
        className: TabBar$1.tabBarItem
      }, "Categories"), /* @__PURE__ */ React$2.createElement(TabBar.Item, {
        id: Tabs.SETTINGS,
        className: TabBar$1.tabBarItem
      }, "Settings")), tab === Tabs.CATEGORIES && /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(CreateCategory, null), /* @__PURE__ */ React$2.createElement(UserListSettings, null)), tab === Tabs.SETTINGS && /* @__PURE__ */ React$2.createElement(OtherView, null));
    }
    const OtherView = () => {
      const [, forceUpdate] = React$2.useReducer((v) => !v, false);
      return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(Forms.FormSection, null, /* @__PURE__ */ React$2.createElement(Forms.FormItem, null, /* @__PURE__ */ React$2.createElement(Forms.FormTitle, null, "Display mode"), /* @__PURE__ */ React$2.createElement(RadioGroup, {
        options: [
          { name: "Category", value: settings.DefaultSettings.CategoryView.settingsValue },
          { name: "Minimalist", value: settings.DefaultSettings.MinimalistView.settingsValue }
        ],
        value: get("display", settings.DefaultSettings.DISPLAY_MODE),
        onChange: (v) => {
          set("display", v.value);
          pinnedDMS.getCategories().forEach((category) => pinnedDMS.setVisibility(category, true));
          Dispatcher.dirtyDispatch({ type: DISPATCHER_PINDMS_CHANGE_LIST });
          forceUpdate();
        }
      }), /* @__PURE__ */ React$2.createElement(Forms.FormDivider, {
        className: joinClasses$1(classes.Margins.marginBottom20, classes.Margins.marginTop20)
      })), get("display", settings.DefaultSettings.DISPLAY_MODE) === settings.DefaultSettings.MinimalistView.settingsValue && /* @__PURE__ */ React$2.createElement(Category$1, {
        title: "Minimalist view settings",
        description: "Additional configuration for the Minimalist View"
      }, /* @__PURE__ */ React$2.createElement(SwitchItem, {
        value: get("minimal_userIcons", settings.DefaultSettings.MinimalistView.userIcons),
        onChange: (e) => {
          set("minimal_userIcons", e);
          Dispatcher.dirtyDispatch({ type: DISPATCHER_PINDMS_CHANGE_LIST });
        }
      }, "Show user icons")), /* @__PURE__ */ React$2.createElement(SwitchItem, {
        value: get("pinIcon", settings.DefaultSettings.PIN_ICON),
        onChange: (e) => set("pinIcon", e),
        note: "Adds an pin icon to the user so you can add it quickly to a category"
      }, "Add a quick shortcut to add people on categories"), /* @__PURE__ */ React$2.createElement(SwitchItem, {
        value: get("friendsPage", settings.DefaultSettings.PIN_ICON),
        onChange: (e) => set("friendsPage", e),
        note: "Add custom tabs to the friends page"
      }, /* @__PURE__ */ React$2.createElement(Flex, {
        align: Flex.Align.CENTER
      }, "Tabs to the friends page", /* @__PURE__ */ React$2.createElement(TooltipContainer, {
        tooltipClassName: styles$3.tooltip,
        className: styles$3.tooltipWrapper,
        text: /* @__PURE__ */ React$2.createElement("img", {
          src: "https://cdn.discordapp.com/attachments/539180316447997974/1001574025010626580/unknown.png"
        })
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "Info"
      })))), /* @__PURE__ */ React$2.createElement(SwitchItem, {
        value: get("streamerMode", settings.DefaultSettings.STREAMER_MODE),
        onChange: (e) => set("streamerMode", e),
        note: "When Streamer mode is enabled, it will automatically hide the categories"
      }, "Hide users when Streamer mode is enabled"), /* @__PURE__ */ React$2.createElement(Forms.FormItem, null, /* @__PURE__ */ React$2.createElement(Forms.FormTitle, null, "Export and import settings"), /* @__PURE__ */ React$2.createElement(Flex, {
        className: styles$3.buttonFlex
      }, /* @__PURE__ */ React$2.createElement(Button, {
        onClick: handleExport
      }, "Export"), /* @__PURE__ */ React$2.createElement(Button, {
        color: Button.Colors.RED,
        onClick: handleImport
      }, "Import")))));
    };
    const handleExport = async () => {
      return DiscordNative.fileManager.saveWithDialog(JSON.stringify(getAll$1()), "settings.json");
    };
    const handleImport = async () => {
      const [selectedFile] = await DiscordNative.fileManager.openFiles("*.json");
      const newSettingsText = new TextDecoder().decode(new Uint8Array(selectedFile.data));
      if (!isValidJSON(newSettingsText))
        return void show('Invalid settings file. It should end with ".json".', {
          duration: 5e3
        });
      const newSettings = JSON.parse(newSettingsText);
      const overrideSettings = () => {
        reset();
        setAll(newSettings);
      };
      ModalActions.openModal((props) => /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
        ...props,
        size: Modal.ModalSize.SMALL
      }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
        separator: false
      }, /* @__PURE__ */ React$2.createElement(Heading, {
        variant: "heading-lg/medium"
      }, "Save a backup")), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement(Text, null, "Do you want to save a backup?")), /* @__PURE__ */ React$2.createElement(Modal.ModalFooter, null, /* @__PURE__ */ React$2.createElement(Flex, {
        style: { gap: "8px" },
        justify: Flex.Justify.END
      }, /* @__PURE__ */ React$2.createElement(Button, {
        look: Button.Looks.LINK,
        color: Button.Colors.WHITE,
        onClick: props.onClose
      }, "Cancel"), /* @__PURE__ */ React$2.createElement(Button, {
        look: Button.Looks.LINK,
        color: Button.Colors.RED,
        onClick: () => {
          overrideSettings();
          props.onClose();
        }
      }, "Override without saving"), /* @__PURE__ */ React$2.createElement(Button, {
        onClick: async () => {
          await handleExport();
          overrideSettings();
          props.onClose();
        }
      }, "Save")))));
    };

    const fromDevilbroPinDMs = () => {
      const DevilbroPinDMsData = globalThis.BdApi.getData("PinDMs", "all");
      const channelList = DevilbroPinDMsData.pinned[Users.getCurrentUser().id].channelList;
      let category = {};
      for (const dbCategory of Object.values(channelList)) {
        const userIDs = dbCategory.dms.filter((cId) => Channels.getChannel(cId)?.type === 1).map((cId) => Channels.getChannel(cId).recipients[0]);
        if (userIDs.length !== 0) {
          category[dbCategory.name] = {
            color: ColorUtils.int2hex(ColorUtils.rgb2int(`rgba(${dbCategory.color[0]}, ${dbCategory.color[1]}, ${dbCategory.color[2]}, 1)`)),
            users: userIDs,
            show: !dbCategory.collapsed
          };
        }
      }
      return category;
    };
    const hasThemEnabled = () => {
      return {
        pinDMs: Boolean(globalThis.BdApi) && Boolean(globalThis.BdApi.Plugins.isEnabled("PinDMs"))
      };
    };
    const hasAnyOfThePlugins = () => {
      const results = hasThemEnabled();
      return results.pinDMs;
    };

    const { Slides, springConfig } = findByProps("Slide");
    const Pages = {
      SWITCH: "switch",
      SWITCH_DONE: "switchDone"
    };
    const WIDTH = 400;
    class MenuModal extends React$2.Component {
      constructor(props) {
        super(props);
        this.state = {
          page: Pages.SWITCH
        };
      }
      setPage(page) {
        this.setState({ page });
      }
      render() {
        return /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
          size: Modal.ModalSize.DYNAMIC,
          ...this.props
        }, /* @__PURE__ */ React$2.createElement(Slides, {
          activeSlide: this.state.page,
          springConfig,
          width: WIDTH,
          children: [
            /* @__PURE__ */ React$2.createElement("div", {
              id: Pages.SWITCH
            }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
              separator: false
            }, /* @__PURE__ */ React$2.createElement(Heading, {
              variant: "heading-md/normal"
            }, "Switch?")), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement(Text, {
              className: Margins$1.marginBottom20
            }, "It seems that you have used PinDMs before. Do you want to switch the user list to this plugin?")), /* @__PURE__ */ React$2.createElement(Modal.ModalFooter, null, /* @__PURE__ */ React$2.createElement(Button, {
              onClick: async () => {
                await this.switch();
                this.setPage(Pages.SWITCH_DONE);
              }
            }, "Switch"), /* @__PURE__ */ React$2.createElement(Button, {
              color: Button.Colors.WHITE,
              look: Button.Looks.LINK,
              onClick: this.props.onClose
            }, "No"))),
            /* @__PURE__ */ React$2.createElement("div", {
              id: Pages.SWITCH_DONE
            }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
              separator: false
            }, /* @__PURE__ */ React$2.createElement(Heading, {
              variant: "heading-md/normal"
            }, "Done")), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement(Text, {
              className: Margins$1.marginBottom20
            }, "The switching was done sucessfully. We can disable them if you want")), /* @__PURE__ */ React$2.createElement(Modal.ModalFooter, null, /* @__PURE__ */ React$2.createElement(Button, {
              onClick: async () => {
                await this.disableAll();
                this.props.onClose();
              }
            }, "Disable"), /* @__PURE__ */ React$2.createElement(Button, {
              color: Button.Colors.WHITE,
              look: Button.Looks.LINK,
              onClick: this.props.onClose
            }, "I am fine")))
          ]
        }));
      }
      async switch() {
        if (hasThemEnabled().pinDMs) {
          const newSettings = fromDevilbroPinDMs();
          pinnedDMS.setRaw(newSettings);
        }
      }
      async disableAll() {
        if (hasThemEnabled().pinDMs)
          BdApi?.Plugins?.disable?.("PinDMs");
      }
    }

    addCSS(`
._categoryViewWrapper_1ldts_1 {
    opacity: .7;
    
    &:hover {
        opacity: 1;

        ._icon_1ldts_7, ._name_1ldts_7 {
            color: unset
        }
    }

    &:not(._open_1ldts_12) ._icon_1ldts_7 {
        transform: rotate(-90deg);
    }
}

._wrapper_1ldts_17 {
    margin: 4px 0;
    margin-left: 8px;
    padding: 4px 0;
    border-top: 1px solid var(--background-modifier-accent);
    border-bottom: 1px solid var(--background-modifier-accent);

    & > * {
        margin-left: 0;
    }
}

._minimalisticPopout_1ldts_29 {
    padding: 16px;
    padding-left: 8px;
    background: var(--background-tertiary);
    min-width: 224px
}

._minimalisticView_1ldts_36 {
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    width: 100%;

    ._nameAndUsers_1ldts_42 {
        gap: 4px;
        flex-grow: 2 !important;

        span {
            opacity: .7;
        }
    }
}
`, 2);
    var styles$2 = {"categoryViewWrapper":"_categoryViewWrapper_1ldts_1","icon":"_icon_1ldts_7","name":"_name_1ldts_7","open":"_open_1ldts_12","wrapper":"_wrapper_1ldts_17","minimalisticPopout":"_minimalisticPopout_1ldts_29","minimalisticView":"_minimalisticView_1ldts_36","nameAndUsers":"_nameAndUsers_1ldts_42"};

    var openCategorySettings = (openedCategory) => {
      ModalActions.openModal((props) => /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
        ...props,
        size: Modal.ModalSize.MEDIUM
      }, /* @__PURE__ */ React$2.createElement(Modal.ModalHeader, {
        separator: false
      }, /* @__PURE__ */ React$2.createElement(CreateCategory, null)), /* @__PURE__ */ React$2.createElement(Modal.ModalContent, null, /* @__PURE__ */ React$2.createElement(UserListSettings, {
        ...{ openedCategory }
      }), /* @__PURE__ */ React$2.createElement("div", {
        style: { paddingBottom: "16px" }
      }))));
    };

    function CategoryContextMenu(props) {
      return /* @__PURE__ */ React$2.createElement(ContextMenu, {
        navId: "pin-user",
        onClose: ContextMenuManager.closeContextMenu
      }, /* @__PURE__ */ React$2.createElement(ContextMenu.MenuItem, {
        id: "edit",
        label: "Edit category",
        action: () => openCategorySettings(props.category)
      }), /* @__PURE__ */ React$2.createElement(ContextMenu.MenuItem, {
        id: "delete",
        label: "Delete category",
        color: "colorDanger",
        action: () => {
          messageBox("Delete", `Are you sure that you want to delete "${props.category}"?`, [
            {
              text: "Delete",
              action: () => {
                pinnedDMS.removeCategory(props.category);
              },
              color: Button.Colors.RED
            },
            {
              text: "Cancel",
              action: () => {
              },
              color: Button.Colors.WHITE,
              look: Button.Looks.LINK
            }
          ]);
        }
      }));
    }

    const ListSectionItem = findByDisplayName("ListSectionItem");
    const { DirectMessage } = findByProps("DirectMessage");
    const { NumberBadge } = findByProps("NumberBadge");
    const { getMentionCount } = findByProps("getMentionCount");
    const UserSummaryItem$1 = findByDisplayName("UserSummaryItem");
    const VoiceUserCount = findByDisplayName("VoiceUserCount");
    const USER_ICON_SIZE$1 = 16;
    function patchDmList() {
      let PinDMSRender = () => /* @__PURE__ */ React$2.createElement(CurrentLists, null);
      PinDMSRender.displayName = "PinnedDMS";
      after("DMListPatch", find((m) => m?.default?.displayName === "ConnectedPrivateChannelsList"), "default", ([props], res, _this) => {
        useListUpdate();
        if (Object.keys(pinnedDMS.getAll()).length === 0)
          return;
        let PrivateChannelsList = findInReactTree(res, (m) => m?.type?.displayName === "PrivateChannelsList");
        if (PrivateChannelsList == null)
          return;
        Object.values(pinnedDMS.getAll()).filter((category) => category.users.length !== 0).forEach(({ users }) => {
          const dmChannels = users.map((id) => Channels.getDMFromUserId(id));
          PrivateChannelsList.props.privateChannelIds = PrivateChannelsList.props.privateChannelIds.filter((id) => {
            return !dmChannels.includes(id);
          });
        });
        const ogFunc = PrivateChannelsList.type.prototype.render;
        if (ogFunc == null)
          return;
        Object.assign(PrivateChannelsList.props, {
          original: ogFunc
        });
        if (PrivateChannelsList.props.children.find((m) => m?.type?.displayName === "PinnedDMS"))
          return;
        PrivateChannelsList.props.children.push(/* @__PURE__ */ React$2.createElement(PinDMSRender, null));
      });
    }
    const CurrentLists = () => {
      useListUpdate();
      switch (get("display", settings.DefaultSettings.DISPLAY_MODE)) {
        case settings.DefaultSettings.MinimalistView.settingsValue: {
          return /* @__PURE__ */ React$2.createElement("div", {
            className: styles$2.wrapper
          }, pinnedDMS.getCategories().map((category) => {
            return /* @__PURE__ */ React$2.createElement(MinimalistList, {
              ...{ category }
            });
          }));
        }
        default: {
          return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, pinnedDMS.getCategories().map((category) => {
            return /* @__PURE__ */ React$2.createElement(CategoryList, {
              ...{ category }
            });
          }));
        }
      }
    };
    const CategoryList = ({ category }) => {
      const [show, setShow] = React$2.useState(pinnedDMS.getVisibility(category));
      return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement("div", {
        onClick: () => {
          pinnedDMS.setVisibility(category, !show);
          setShow(!show);
        }
      }, /* @__PURE__ */ React$2.createElement(ListSectionItem, {
        className: joinClasses(classes.Category.wrapper, styles$2.categoryViewWrapper, show ? styles$2.open : null)
      }, /* @__PURE__ */ React$2.createElement("span", {
        style: { color: pinnedDMS.getColor(category) }
      }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
        name: "DropdownArrow",
        type: "none",
        className: joinClasses(classes.Category.icon, styles$2.icon)
      }), /* @__PURE__ */ React$2.createElement("h2", {
        className: joinClasses(searchClassNameModules("container-32HW5s").container, classes.Category.name, styles$2.name)
      }, category)))), show && pinnedDMS.getUsers(category).map((userId) => {
        const dmId = Channels.getDMFromUserId(userId);
        if (dmId == null)
          return null;
        return /* @__PURE__ */ React$2.createElement(DirectMessage, {
          key: dmId,
          channel: Channels.getChannel(dmId),
          selected: CurrentChannels.getChannelId() === dmId
        });
      }));
    };
    const getPingCount = (currentUsers) => currentUsers.map((userId) => Channels.getDMFromUserId(userId)).reduce((acc, channelId) => acc + getMentionCount(channelId), 0);
    const MinimalistList = ({ category }) => {
      const [, forceUpdate] = React$2.useReducer((a) => !a, true);
      const currentUsers = React$2.useMemo(() => pinnedDMS.getUsers(category), []);
      const isCurrentChannel = React$2.useMemo(() => {
        return currentUsers.some((userId) => CurrentChannels.getChannelId() === Channels.getDMFromUserId(userId));
      }, []);
      const [pingCount, setPingCount] = React$2.useState(getPingCount(currentUsers));
      const shouldShowUsers = pinnedDMS.getVisibility(category) && get("minimal_userIcons", settings.DefaultSettings.MinimalistView.userIcons);
      React$2.useEffect(() => {
        const messageCreateListener = ({ channelId }) => {
          if (currentUsers.some((userId) => channelId === Channels.getDMFromUserId(userId)))
            setPingCount(getPingCount(currentUsers));
        };
        Dispatcher.subscribe("CHANNEL_UNREAD_UPDATE", messageCreateListener);
        Dispatcher.subscribe("STREAMER_MODE_UPDATE", forceUpdate);
        return () => {
          Dispatcher.unsubscribe("CHANNEL_UNREAD_UPDATE", messageCreateListener);
          Dispatcher.unsubscribe("STREAMER_MODE_UPDATE", forceUpdate);
        };
      }, []);
      return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(Popout, {
        position: Popout.Positions.RIGHT,
        animation: Popout.Animation.NONE,
        renderPopout: (props) => /* @__PURE__ */ React$2.createElement("div", {
          ...props
        }, /* @__PURE__ */ React$2.createElement(Modal.ModalRoot, {
          transitionState: 1,
          size: Modal.ModalSize.DYNAMIC
        }, /* @__PURE__ */ React$2.createElement("div", {
          className: styles$2.minimalisticPopout
        }, currentUsers.length !== 0 ? currentUsers.map((userId) => {
          const dmId = Channels.getDMFromUserId(userId);
          console.log(dmId);
          if (dmId == null)
            return null;
          return /* @__PURE__ */ React$2.createElement(DirectMessage, {
            key: dmId,
            channel: Channels.getChannel(dmId),
            selected: CurrentChannels.getChannelId() === dmId
          });
        }) : /* @__PURE__ */ React$2.createElement(Text, {
          style: { marginLeft: "8px" }
        }, "There is nobody here currently. ", /* @__PURE__ */ React$2.createElement("a", {
          onClick: () => openCategorySettings(category)
        }, "Add a new person"), "."))))
      }, (props) => /* @__PURE__ */ React$2.createElement("div", {
        ...props,
        className: joinClasses(classes.DMButtons.channel, searchClassNameModules("container-32HW5s").container),
        onContextMenu: (e) => undefined(e, () => /* @__PURE__ */ React$2.createElement(CategoryContextMenu, {
          category
        }))
      }, /* @__PURE__ */ React$2.createElement("div", {
        className: joinClasses(classes.DMButtons.interactive, classes.Interactives.interactive, isCurrentChannel ? joinClasses(classes.DMButtons.interactiveSelected, classes.Interactives.selected) : void 0, classes.DMButtons.linkButton)
      }, /* @__PURE__ */ React$2.createElement("div", {
        className: joinClasses(classes.Names.layout, styles$2.minimalisticView)
      }, /* @__PURE__ */ React$2.createElement(Flex, {
        direction: Flex.Direction.VERTICAL,
        className: styles$2.nameAndUsers
      }, /* @__PURE__ */ React$2.createElement(Flex, null, /* @__PURE__ */ React$2.createElement("span", {
        style: { color: pinnedDMS.getColor(category), fontWeight: "bold", flexGrow: 1 }
      }, category), !shouldShowUsers && /* @__PURE__ */ React$2.createElement(VoiceUserCount, {
        userCount: pinnedDMS.getUsers(category).length
      })), shouldShowUsers && /* @__PURE__ */ React$2.createElement(UserSummaryItem$1, {
        size: USER_ICON_SIZE$1,
        users: pinnedDMS.getUsers(category).map((userId) => Users.getUser(userId))
      })), Boolean(pingCount) && /* @__PURE__ */ React$2.createElement(NumberBadge, {
        count: pingCount
      }))))));
    };

    addCSS(`
._pinButton_1etf1_1 {
    margin: 2px;
    display: none;
    opacity: .6;

    &:hover {
        opacity: 1;
    }

    &._lonely_1etf1_10 {
        padding-right: 8px;
    }

    svg {
        min-width: 16px;
        width: 16px !important;
        min-height: 16px;
        height: 16px !important;
    }
}

._pinHoverHandler_1etf1_22:hover{
    ._pinButton_1etf1_1 {
        display: block;
    }
}
`, 1);
    var styles$1 = {"pinButton":"_pinButton_1etf1_1","lonely":"_lonely_1etf1_10","pinHoverHandler":"_pinHoverHandler_1etf1_22"};

    addCSS(`
._text_1omes_1 {
    font-weight: bold;
    margin-right: auto;
}

[id^="pin-user-"]:hover ._text_1omes_1 {
    color: #fff !important;
    font-weight: 600
}
`, 4);
    var styles = {"text":"_text_1omes_1"};

    const UserSummaryItem = findByDisplayName("UserSummaryItem");
    const USER_ICON_SIZE = 16;
    const MAX_USERS_DISPLAY = 4;
    function AddUser(props) {
      return /* @__PURE__ */ React$2.createElement(ContextMenu, {
        navId: "pin-user",
        onClose: ContextMenuManager.closeContextMenu
      }, /* @__PURE__ */ React$2.createElement(ContextMenu.MenuGroup, {
        label: "Add to category"
      }, pinnedDMS.getCategories().map((category) => /* @__PURE__ */ React$2.createElement(ContextMenu.MenuItem, {
        id: `category-${category}`,
        label: /* @__PURE__ */ React$2.createElement(Flex, null, /* @__PURE__ */ React$2.createElement("span", {
          className: styles.text,
          style: { color: pinnedDMS.getColor(category) }
        }, category), /* @__PURE__ */ React$2.createElement(UserSummaryItem, {
          size: USER_ICON_SIZE,
          max: MAX_USERS_DISPLAY,
          users: pinnedDMS.getUsers(category).sort(() => Math.random() - 0.5).map((userId) => Users.getUser(userId))
        })),
        action: () => pinnedDMS.addUser(category, props.userId)
      }))), /* @__PURE__ */ React$2.createElement(ContextMenu.MenuSeparator, null), /* @__PURE__ */ React$2.createElement(ContextMenu.MenuItem, {
        id: "configure",
        label: "Configure categories",
        icon: () => /* @__PURE__ */ React$2.createElement(DiscordIcon, {
          name: "Gear",
          type: "contextmenu"
        }),
        action: openCategorySettings
      }));
    }

    const { React } = webpack;
    function patchDmButton() {
      after("DMButtonPatch", findByDisplayName("PrivateChannel").prototype, "render", (_, res, _this) => {
        const user = _this.props.user;
        if (user == null)
          return;
        const isAdded = pinnedDMS.isUserAdded(user.id);
        const ogChildren = res.props.children;
        if (ogChildren == null)
          return;
        res.props.children = function(...args) {
          const ret = ogChildren.apply(this, args);
          ret.props.className += ` ${styles$1.pinHoverHandler}`;
          const Interactive = ret.props.children;
          if (user && !user.bot) {
            const closeIndex = Interactive.props.children.findIndex((e) => e.type.displayName === "CloseButton");
            if (isAdded && closeIndex) {
              delete Interactive.props.children[closeIndex];
            }
            if (get("pinIcon", settings.DefaultSettings.PIN_ICON)) {
              Interactive.props.children.splice(1, 0, /* @__PURE__ */ React.createElement("div", {
                className: joinClasses(styles$1.pinButton, isAdded ? styles$1.lonely : ""),
                onClick: (e) => {
                  if (isAdded)
                    pinnedDMS.removeUser(pinnedDMS.getUserCategory(user.id), user.id);
                }
              }, !isAdded ? /* @__PURE__ */ React.createElement(Popout, {
                renderPopout: () => /* @__PURE__ */ React.createElement(AddUser, {
                  userId: user.id
                }),
                position: Popout.Positions.RIGHT
              }, (props) => /* @__PURE__ */ React.createElement("span", {
                ...props
              }, /* @__PURE__ */ React.createElement(DiscordIcon, {
                name: "PinLayer"
              }))) : /* @__PURE__ */ React.createElement(DiscordIcon, {
                name: "UnpinLayer"
              })));
            }
          }
          return ret;
        };
      });
    }

    const { Item } = findByProps("Item");
    const { Divider } = find((m) => m?.default?.displayName === "HeaderBar");
    const PeopleListSectionedNonLazy = findByDisplayName("PeopleListSectionedNonLazy");
    const FriendRow = findByDisplayName("FriendRow");
    const SectionTitle = findByDisplayName("SectionTitle");
    const { EmptyStateImage, default: EmptyState, EmptyStateText } = findByProps("EmptyStateImage");
    const { iconWrapper, clickable, icon } = findByProps("caret", "clickable");
    const { button } = findByProps("friendsEmpty");
    const { searchBar } = findByProps("emptyStateContainer");
    const IDENTIFIER = "DMCATEGORIES";
    function patchFriendsPage() {
      after("FriendsHeaderPatch", find((m) => m?.default?.displayName === "HeaderBarContainer"), "default", ([props], res, _this) => {
        if (Boolean(props.channelId) || !~props.className.indexOf("theme-"))
          return;
        if (Object.keys(pinnedDMS.getAll()).length === 0)
          return;
        const OgTabBarChildrens = props.children[3].props.children;
        const AddFriendButton = OgTabBarChildrens[OgTabBarChildrens.length - 1];
        delete OgTabBarChildrens[OgTabBarChildrens.length - 1];
        const NewTabBarChildrens = [];
        for (const categoryName of pinnedDMS.getCategories()) {
          NewTabBarChildrens.push(/* @__PURE__ */ React$2.createElement(Item, {
            id: `${IDENTIFIER}-${categoryName}`,
            color: pinnedDMS.getColor(categoryName),
            onContextMenu: (e) => undefined(e, () => /* @__PURE__ */ React$2.createElement(CategoryContextMenu, {
              category: categoryName
            }))
          }, categoryName));
        }
        props.children[3].props.children = [...OgTabBarChildrens, /* @__PURE__ */ React$2.createElement(Divider, null), ...NewTabBarChildrens, /* @__PURE__ */ React$2.createElement(Divider, null), AddFriendButton];
      });
      after("FriendsListPatch", find((m) => m?.default?.displayName === "PeopleList"), "default", ([props], res, _this) => {
        if (~props.sectionFilter.indexOf(IDENTIFIER)) {
          const category = props.sectionFilter.substring(IDENTIFIER.length + 1);
          res.props.children = /* @__PURE__ */ React$2.createElement(DMFriendsRender, {
            ...{ category },
            key: category
          });
        }
      });
    }
    const DMFriendsRender = ({ category }) => {
      const [search, setSearch] = React$2.useState("");
      const userIDs = React$2.useMemo(() => pinnedDMS.getUsers(category), [category]);
      const searchedUserIDs = React$2.useMemo(() => userIDs.filter((id) => ~Users.getUser(id).username.toLowerCase().indexOf(search.toLowerCase())), [search]);
      if (userIDs.length !== 0) {
        return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(SearchBar, {
          query: search,
          onChange: setSearch,
          onClear: () => setSearch(""),
          className: searchBar,
          size: SearchBar.Sizes.MEDIUM
        }), /* @__PURE__ */ React$2.createElement("div", null, /* @__PURE__ */ React$2.createElement(SectionTitle, {
          title: /* @__PURE__ */ React$2.createElement(Flex, null, /* @__PURE__ */ React$2.createElement("b", {
            style: { color: pinnedDMS.getColor(category), flexGrow: 1 }
          }, category, " \u2013 ", searchedUserIDs.length), /* @__PURE__ */ React$2.createElement(TooltipContainer, {
            text: "Add a new person",
            position: "bottom"
          }, /* @__PURE__ */ React$2.createElement("div", {
            className: joinClasses(iconWrapper, clickable),
            onClick: () => openCategorySettings(category),
            style: { width: "16px", height: "16px" }
          }, /* @__PURE__ */ React$2.createElement(DiscordIcon, {
            name: "PersonAdd",
            type: "none"
          }))))
        })), searchedUserIDs.length !== 0 ? /* @__PURE__ */ React$2.createElement(PeopleListSectionedNonLazy, {
          renderRow: (mysteriousObject) => /* @__PURE__ */ React$2.createElement(FriendRow, {
            ...Object.assign({}, mysteriousObject, { isFocused: true })
          }),
          statusSections: [
            searchedUserIDs.map((userId) => {
              const user = Users.getUser(userId);
              return {
                activities: Activities.getActivities(user.id),
                isMobile: user.mobile,
                key: user.id,
                nickname: user.username,
                status: Status.getStatus(user.id),
                type: 1,
                user
              };
            })
          ]
        }) : /* @__PURE__ */ React$2.createElement(EmptyState, {
          theme: UserSettings.theme
        }, /* @__PURE__ */ React$2.createElement(EmptyStateImage, {
          ...{
            "width": 415,
            "height": 200,
            "lightSrc": "/assets/36c9a2fb7d0593a581a92373121c2848.svg",
            "darkSrc": "/assets/b36c705f790dad253981f1893085015a.svg"
          }
        }), /* @__PURE__ */ React$2.createElement(EmptyStateText, {
          note: /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, "Wumpus looked but couldn't find anyone with that name in this category.")
        }), /* @__PURE__ */ React$2.createElement(Button, {
          onClick: () => openCategorySettings(category),
          className: button
        }, "Add a person with that name")));
      } else {
        return /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, /* @__PURE__ */ React$2.createElement(EmptyState, {
          theme: UserSettings.theme
        }, /* @__PURE__ */ React$2.createElement(EmptyStateImage, {
          ...{
            "width": 415,
            "height": 200,
            "lightSrc": "/assets/36c9a2fb7d0593a581a92373121c2848.svg",
            "darkSrc": "/assets/b36c705f790dad253981f1893085015a.svg"
          }
        }), /* @__PURE__ */ React$2.createElement(EmptyStateText, {
          note: /* @__PURE__ */ React$2.createElement(React$2.Fragment, null, "Apparently this category does only have Wumpus.")
        }), /* @__PURE__ */ React$2.createElement(Button, {
          onClick: () => openCategorySettings(category),
          className: button
        }, "Add person")));
      }
    };

    let visibilityStorage = {};
    class DMFolders extends Plugin {
      start() {
        this.setSettingsPanel(() => /* @__PURE__ */ React$2.createElement(Settings, null));
        globalThis.Ittai = Ittai;
        patchDmList();
        patchDmButton();
        patchFriendsPage();
        this.openSettingsSwitcher();
        Dispatcher.subscribe("STREAMER_MODE_UPDATE", this.onStreamerModeChange);
      }
      openSettingsSwitcher() {
        if (hasAnyOfThePlugins())
          ModalActions.openModal((props) => /* @__PURE__ */ React$2.createElement(MenuModal, {
            ...props
          }));
      }
      onStreamerModeChange({ value }) {
        if (get("streamerMode", settings.DefaultSettings.STREAMER_MODE))
          pinnedDMS.getCategories().forEach((category) => {
            if (value) {
              visibilityStorage[category] = pinnedDMS.getVisibility(category);
              pinnedDMS.setVisibility(category, false);
            } else {
              pinnedDMS.setVisibility(category, visibilityStorage[category] ?? false);
            }
          });
        Dispatcher.dirtyDispatch({ type: DISPATCHER_PINDMS_CHANGE_LIST });
      }
      stop() {
        unpatchAll();
        Dispatcher.unsubscribe("STREAMER_MODE_UPDATE", this.onStreamerModeChange);
      }
    }

    let IttaiPlugin = class IttaiPlugin extends (() => {
        // switch ("betterdiscord") {
        //     case "powercordv2":
        //         return PCv2Plugin
        //     case "betterdiscord":
        //         return BDPlugin
        //     case "goosemod":
        //         return GMPlugin
        //     default:
        //         return class Plugin {};
        // }
        return BDPlugin;
    })() {
        constructor(...args) {
            super(...args);
            this.hasSettingsPanel = false;
            this.cachedCss = [];
            setInstance(this.__ittaiInternals);
            this.instance = new DMFolders();
            this.friendlyName = this.instance.friendlyName;
            this.instance.__ittaiInternalPlugin = this;
            // globalThis["ittai" + this.friendlyName.toLowerCase().replace(/ /g, "")] = ittai;
            // document.querySelectorAll(`style[ittai][plugin="${manifest.name.replace(/ /g, "")}"]`)?.forEach((e: HTMLStyleElement) => {
            //     this.cachedCss.push(e.innerText);
            //     e.remove();
            // });
        }
        start() {
            try {
                if ("true" == "true" && Boolean(changelog)) {
                    (async () => {
                        const { hasSeenChangelog, setSeenChangelog, openChangelogModal } = await Promise.resolve().then(function () { return index$3; });
                        if (!hasSeenChangelog()) {
                            setSeenChangelog(true);
                            openChangelogModal();
                        }
                    })();
                }
                Object.keys(getAllCSSes()).forEach((id) => {
                    loadCSS(Number(id));
                });
                return this.instance.start();
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        stop() {
            try {
                const res = this.instance.stop();
                unpatchAll();
                if (this.hasSettingsPanel)
                    this.removeSettingsPanel();
                Object.keys(getAllCSSes()).forEach((id) => {
                    unloadCSS(Number(id));
                });
                // document.querySelectorAll(`style[ittai][plugin="${manifest.name.replace(/ /g, "")}"]`)?.forEach(e => {
                //     this.cachedCss.push(e.innerText);
                //     e.remove();
                // });
                return res;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        setSettingsPanel(component) {
            this.hasSettingsPanel = true;
            this.__ittaiInternals.setSettingsPanel(component);
        }
        removeSettingsPanel() {
            if (this.hasSettingsPanel) {
                this.hasSettingsPanel = false;
                this.__ittaiInternals.removeSettingsPanel();
            }
        }
    };

    return IttaiPlugin;

    })();
    if (typeof module !== "undefined") module.exports = ittaiPluginExport;
    return ittaiPluginExport;

})();
