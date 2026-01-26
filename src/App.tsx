import React, {useEffect, useMemo, useState} from "react";
import {createViewState, JBrowseApp} from "@jbrowse/react-app";
import "@fontsource/roboto";
import getAssembly from "./components/GenomeViewer/assembly";
import getDefaultSessionConfig from "./components/GenomeViewer/defaultSessionConfig";
import getTracks from "./components/GenomeViewer/tracks";
import {GenomeMeta} from "./interfaces/Genome";
import {createRoot} from "react-dom/client";

type ViewModel = ReturnType<typeof createViewState>;

// dummy object
const genomeMeta: GenomeMeta = {
    id: 1,
    species: "ERZ1049444",
    isolate_name: "ERZ1049444",
    assembly_name: "ERZ1049444",
    assembly_accession: "ERZ1049444.1",
    fasta_file: "ERZ1049444.fasta",
    gff_file: "ERZ1049444.gff3",
    fasta_url: "http://localhost:8080/ERZ1049444/ERZ1049444.fasta",
    gff_url: "http://localhost:8080/ERZ1049444/ERZ1049444.gff3",
    type_strain: true,
};

function View() {
    const [viewState, setViewState] = useState<ViewModel | null>(null);

    const assembly = useMemo(() => {
        return getAssembly(
            genomeMeta,
            process.env.REACT_APP_ASSEMBLY_INDEXES_PATH || ""
        );
    }, []);

    const tracks = useMemo(() => {
        return getTracks(
            genomeMeta,
            process.env.REACT_APP_GFF_INDEXES_PATH || ""
        );
    }, []);


    const sessionConfig = useMemo(() => {
        return getDefaultSessionConfig(genomeMeta, assembly, tracks);
    }, [assembly, tracks]);

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
}

export default View;
