import React from "react";
import "@fontsource/roboto";
import { GenomeMeta } from "./interfaces/Genome";
interface JcvProps {
    genomeMeta: GenomeMeta;
    fileLocations: {
        fasta: string;
        fai: string;
        gzi: string;
    };
}
declare const Jcv: React.FC<JcvProps>;
export default Jcv;
