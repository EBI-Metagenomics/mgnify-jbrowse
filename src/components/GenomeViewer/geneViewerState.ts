import {useEffect, useState} from 'react';
import {createViewState} from '@jbrowse/react-app';
import {createRoot} from 'react-dom/client';
import {Track} from "../../interfaces/Track";


const useGeneViewerState = (
    assembly: any,
    tracks: Track[],
    defaultSession: any
) => {
    const [viewState, setViewState] = useState<ReturnType<typeof createViewState> | null>(null);
    const [initializationError, setInitializationError] = useState<Error | null>(null);

    useEffect(() => {

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
                defaultSession: defaultSession ? {...defaultSession, name: 'defaultSession'} : undefined,
            };

            const state = createViewState({
                config,
                createRootFn: createRoot,
            });

            setViewState(state);

        } catch (error) {
            setInitializationError(error instanceof Error ? error : new Error(String(error)));
        }

    }, [assembly, tracks, defaultSession]);

    return {viewState, initializationError};
};

export default useGeneViewerState;
