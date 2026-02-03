import React, {useEffect, useMemo, useState} from "react";
import {createViewState, JBrowseApp} from "@jbrowse/react-app";
import "@fontsource/roboto";
import {getAssembly2} from "./components/GenomeViewer/assembly";
import getDefaultSessionConfig from "./components/GenomeViewer/defaultSessionConfig";
import getTracks from "./components/GenomeViewer/tracks";
import {GenomeMeta} from "./interfaces/Genome";
import {createRoot} from "react-dom/client";

type ViewModel = ReturnType<typeof createViewState>;

export interface JBrowseContigViewerProps {
    genomeMeta: GenomeMeta;
    fileLocations: {
        fasta: string;
        fai: string;
        gzi: string;
    }
}

const JBrowseContigViewer: React.FC<JBrowseContigViewerProps> = ({
    genomeMeta, fileLocations
}) => {
    const [viewState, setViewState] = useState<ViewModel | null>(null);
    const assembly = useMemo(() => {
        return getAssembly2(
            genomeMeta,
            fileLocations
        );
    }, [genomeMeta, fileLocations]);

    const tracks = useMemo(() => {
        return getTracks(
            genomeMeta,
            ""
        );
    }, [genomeMeta]);

    const sessionConfig = useMemo(() => {
        return getDefaultSessionConfig(genomeMeta, assembly, tracks);
    }, [genomeMeta, assembly, tracks]);

    const config = useMemo(
        () => ({
            assemblies: [assembly],
            tracks: tracks.map((track) => ({
                ...track,
                visible: true,
            })),
            defaultSession: sessionConfig
                ? { ...sessionConfig, name: "defaultSession" }
                : undefined,
        }),
        [assembly, tracks, sessionConfig]
    );

    useEffect(() => {
        console.log("Initializing JBrowse");
        const state = createViewState({
            config,
            createRootFn: createRoot,
        });
        setViewState(state);
    }, [config]);

    if (!viewState) {
        return null;
    }

    return (
        <>
            <h1>JBrowse 2 - Loading Large Metagenomes</h1>
            <div>
                <JBrowseApp viewState={viewState}/>
            </div>
        </>
    );
};

export default JBrowseContigViewer;
