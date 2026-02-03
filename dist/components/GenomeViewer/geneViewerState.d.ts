import { Track } from "../../interfaces/Track";
declare const useGeneViewerState: (assembly: any, tracks: Track[], defaultSession: any) => {
    viewState: unknown;
    initializationError: Error | null;
};
export default useGeneViewerState;
