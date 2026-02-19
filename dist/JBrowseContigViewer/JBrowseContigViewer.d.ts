import React from 'react';
import '@fontsource/roboto';
import type { GenomeMeta } from './types';
export interface JBrowseContigViewerProps {
    genomeMeta: GenomeMeta;
    fileLocations: {
        fasta: string;
        fai: string;
        gzi: string;
    };
}
declare const JBrowseContigViewer: React.FC<JBrowseContigViewerProps>;
export default JBrowseContigViewer;
