"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_app_1 = require("@jbrowse/react-app");
const client_1 = require("react-dom/client");
const useGeneViewerState = (assembly, tracks, defaultSession) => {
    const [viewState, setViewState] = (0, react_1.useState)(null);
    const [initializationError, setInitializationError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        try {
            if (!assembly) {
                throw new Error('Assembly configuration is missing.');
            }
            const config = {
                assemblies: [assembly],
                tracks: tracks.map((track) => ({
                    ...track,
                    visible: true,
                })),
                defaultSession: defaultSession ? { ...defaultSession, name: 'defaultSession' } : undefined,
            };
            const state = (0, react_app_1.createViewState)({
                config,
                createRootFn: client_1.createRoot,
            });
            setViewState(state);
        }
        catch (error) {
            setInitializationError(error instanceof Error ? error : new Error(String(error)));
        }
    }, [assembly, tracks, defaultSession]);
    return { viewState, initializationError };
};
exports.default = useGeneViewerState;
