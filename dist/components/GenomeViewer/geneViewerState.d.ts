/// <reference types="react" />
import { Track } from "../../interfaces/Track";
declare const useGeneViewerState: (assembly: any, tracks: Track[], defaultSession: any) => {
    viewState: ({
        jbrowse: any;
        session: any;
        sessionPath: string;
        assemblyManager: {
            assemblies: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            readonly assemblyNameMap: Record<string, {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
        } & {
            get(asmName: string): ({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined;
            readonly assemblyNamesList: any[];
            readonly assemblyList: ({
                [x: string]: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                setSubschema(slotName: string, data: Record<string, unknown>): Record<string, unknown> | ({
                    [x: string]: any;
                } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                    setSubschema(slotName: string, data: Record<string, unknown>): any;
                } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>);
            } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>)[];
            readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        } & {
            waitForAssembly(assemblyName: string): Promise<({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined>;
            getRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            getReverseRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            isValidRefName(refName: string, assemblyName: string): boolean;
        } & {
            afterAttach(): void;
            removeAssembly(asm: {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>): void;
            addAssembly(configuration: any): void;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IModelType<{
            assemblies: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
        }, {
            readonly assemblyNameMap: Record<string, {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
        } & {
            get(asmName: string): ({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined;
            readonly assemblyNamesList: any[];
            readonly assemblyList: ({
                [x: string]: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                setSubschema(slotName: string, data: Record<string, unknown>): Record<string, unknown> | ({
                    [x: string]: any;
                } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                    setSubschema(slotName: string, data: Record<string, unknown>): any;
                } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>);
            } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>)[];
            readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        } & {
            waitForAssembly(assemblyName: string): Promise<({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined>;
            getRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            getReverseRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            isValidRefName(refName: string, assemblyName: string): boolean;
        } & {
            afterAttach(): void;
            removeAssembly(asm: {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>): void;
            addAssembly(configuration: any): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>, [undefined]>>;
        internetAccounts: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IAnyType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyType>>;
    } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
        rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        adminMode: boolean;
        error: unknown;
        textSearchManager: import("@jbrowse/core/util").TextSearchManager;
        pluginManager: import("@jbrowse/core/PluginManager").default;
    } & {
        setError(error: unknown): void;
        setSession(sessionSnapshot?: any): void;
        setDefaultSession(): void;
        setSessionPath(path: string): void;
        renameCurrentSession(newName: string): void;
    } & {
        initializeInternetAccount(internetAccountConfig: {
            [x: string]: any;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            setSubschema(slotName: string, data: Record<string, unknown>): Record<string, unknown> | ({
                [x: string]: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                setSubschema(slotName: string, data: Record<string, unknown>): any;
            } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>);
        } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>, initialSnapshot?: {} | undefined): any;
        createEphemeralInternetAccount(internetAccountId: string, initialSnapshot: Record<string, unknown>, url: string): any;
        findAppropriateInternetAccount(location: import("@jbrowse/core/util").UriLocation): any;
    } & {
        afterCreate(): void;
    } & {
        setMenus(newMenus: import("@jbrowse/app-core").Menu[]): void;
        appendMenu(menuName: string): number;
        insertMenu(menuName: string, position: number): number;
        appendToMenu(menuName: string, menuItem: import("@jbrowse/core/ui").MenuItem): number;
        insertInMenu(menuName: string, menuItem: import("@jbrowse/core/ui").MenuItem, position: number): number;
        appendToSubMenu(menuPath: string[], menuItem: import("@jbrowse/core/ui").MenuItem): number;
        insertInSubMenu(menuPath: string[], menuItem: import("@jbrowse/core/ui").MenuItem, position: number): number;
    } & {
        version: string;
        pluginsUpdated: boolean;
        rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        hydrateFn: ((container: Element | Document, initialChildren: import("react").ReactNode) => any) | undefined;
        createRootFn: ((elt: Element | DocumentFragment) => {
            render: (node: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) => unknown;
        }) | undefined;
        textSearchManager: import("@jbrowse/core/util").TextSearchManager;
        error: unknown;
    } & {
        afterCreate(): void;
        setSession(sessionSnapshot?: import("mobx-state-tree").ModelCreationType<import("mobx-state-tree/dist/internal").ExtractCFromProps<{
            id: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
            name: import("mobx-state-tree").ISimpleType<string>;
            margin: import("mobx-state-tree").IType<number | undefined, number, number>;
        }>> | undefined): void;
        setPluginsUpdated(flag: boolean): void;
        setDefaultSession(): void;
        renameCurrentSession(sessionName: string): void;
        setError(error?: unknown): void;
    } & {
        menus: import("@jbrowse/react-app/dist/rootModel").Menu[];
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        jbrowse: import("mobx-state-tree").IAnyType;
        session: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IAnyType>;
        sessionPath: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
        assemblyManager: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IModelType<{
            assemblies: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
        }, {
            readonly assemblyNameMap: Record<string, {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
        } & {
            get(asmName: string): ({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined;
            readonly assemblyNamesList: any[];
            readonly assemblyList: ({
                [x: string]: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                setSubschema(slotName: string, data: Record<string, unknown>): Record<string, unknown> | ({
                    [x: string]: any;
                } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                    setSubschema(slotName: string, data: Record<string, unknown>): any;
                } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>);
            } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>)[];
            readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        } & {
            waitForAssembly(assemblyName: string): Promise<({
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined>;
            getRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            getReverseRefNameMapForAdapter(adapterConf: {
                [x: string]: unknown;
            }, assemblyName: string | undefined, opts: {
                signal?: AbortSignal | undefined;
                sessionId: string;
            }): Promise<{
                [x: string]: string;
            } | undefined>;
            isValidRefName(refName: string, assemblyName: string): boolean;
        } & {
            afterAttach(): void;
            removeAssembly(asm: {
                configuration: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
                configuration: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IAnyType>>;
            }, {
                error: unknown;
                loadingP: Promise<void> | undefined;
                volatileRegions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                refNameAliases: {
                    [x: string]: string;
                } | undefined;
                lowerCaseRefNameAliases: {
                    [x: string]: string;
                } | undefined;
                cytobands: import("@jbrowse/core/util").Feature[] | undefined;
            } & {
                getConf(arg: string): any;
            } & {
                readonly initialized: boolean;
                readonly name: string;
                readonly regions: import("@jbrowse/core/assemblyManager/assembly").BasicRegion[] | undefined;
                readonly aliases: string[];
                readonly displayName: string | undefined;
                hasName(name: string): boolean;
                readonly allAliases: string[];
                readonly allRefNames: string[] | undefined;
                readonly lowerCaseRefNames: string[] | undefined;
                readonly allRefNamesWithLowerCase: string[] | undefined;
                readonly rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
                readonly refNameColors: string[];
            } & {
                readonly refNames: string[] | undefined;
            } & {
                getCanonicalRefName(refName: string): string | undefined;
                getRefNameColor(refName: string): string | undefined;
                isValidRefName(refName: string): boolean;
            } & {
                setLoaded({ regions, refNameAliases, lowerCaseRefNameAliases, cytobands, }: {
                    regions: import("@jbrowse/core/util").Region[];
                    refNameAliases: {
                        [x: string]: string;
                    };
                    lowerCaseRefNameAliases: {
                        [x: string]: string;
                    };
                    cytobands: import("@jbrowse/core/util").Feature[];
                }): void;
                setError(e: unknown): void;
                setRegions(regions: import("@jbrowse/core/util").Region[]): void;
                setRefNameAliases(aliases: {
                    [x: string]: string;
                }, lowerCaseAliases: {
                    [x: string]: string;
                }): void;
                setCytobands(cytobands: import("@jbrowse/core/util").Feature[]): void;
                setLoadingP(p?: Promise<void> | undefined): void;
                load(): Promise<void>;
                loadPre(): Promise<void>;
            } & {
                getAdapterMapEntry(adapterConf: {
                    [x: string]: unknown;
                }, options: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<import("@jbrowse/core/assemblyManager/assembly").RefNameMap>;
                getRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
                getReverseRefNameMapForAdapter(adapterConf: {
                    [x: string]: unknown;
                }, opts: import("@jbrowse/core/data_adapters/BaseAdapter").BaseOptions): Promise<{
                    [x: string]: string;
                }>;
            }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>): void;
            addAssembly(configuration: any): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>, [undefined]>;
    } & {
        internetAccounts: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyType>;
    }, {
        rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        adminMode: boolean;
        error: unknown;
        textSearchManager: import("@jbrowse/core/util").TextSearchManager;
        pluginManager: import("@jbrowse/core/PluginManager").default;
    } & {
        setError(error: unknown): void;
        setSession(sessionSnapshot?: any): void;
        setDefaultSession(): void;
        setSessionPath(path: string): void;
        renameCurrentSession(newName: string): void;
    } & {
        initializeInternetAccount(internetAccountConfig: {
            [x: string]: any;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            setSubschema(slotName: string, data: Record<string, unknown>): Record<string, unknown> | ({
                [x: string]: any;
            } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
                setSubschema(slotName: string, data: Record<string, unknown>): any;
            } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>);
        } & import("mobx-state-tree").IStateTreeNode<import("@jbrowse/core/configuration").AnyConfigurationSchemaType>, initialSnapshot?: {} | undefined): any;
        createEphemeralInternetAccount(internetAccountId: string, initialSnapshot: Record<string, unknown>, url: string): any;
        findAppropriateInternetAccount(location: import("@jbrowse/core/util").UriLocation): any;
    } & {
        afterCreate(): void;
    } & {
        setMenus(newMenus: import("@jbrowse/app-core").Menu[]): void;
        appendMenu(menuName: string): number;
        insertMenu(menuName: string, position: number): number;
        appendToMenu(menuName: string, menuItem: import("@jbrowse/core/ui").MenuItem): number;
        insertInMenu(menuName: string, menuItem: import("@jbrowse/core/ui").MenuItem, position: number): number;
        appendToSubMenu(menuPath: string[], menuItem: import("@jbrowse/core/ui").MenuItem): number;
        insertInSubMenu(menuPath: string[], menuItem: import("@jbrowse/core/ui").MenuItem, position: number): number;
    } & {
        version: string;
        pluginsUpdated: boolean;
        rpcManager: import("@jbrowse/core/rpc/RpcManager").default;
        hydrateFn: ((container: Element | Document, initialChildren: import("react").ReactNode) => any) | undefined;
        createRootFn: ((elt: Element | DocumentFragment) => {
            render: (node: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) => unknown;
        }) | undefined;
        textSearchManager: import("@jbrowse/core/util").TextSearchManager;
        error: unknown;
    } & {
        afterCreate(): void;
        setSession(sessionSnapshot?: import("mobx-state-tree").ModelCreationType<import("mobx-state-tree/dist/internal").ExtractCFromProps<{
            id: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
            name: import("mobx-state-tree").ISimpleType<string>;
            margin: import("mobx-state-tree").IType<number | undefined, number, number>;
        }>> | undefined): void;
        setPluginsUpdated(flag: boolean): void;
        setDefaultSession(): void;
        renameCurrentSession(sessionName: string): void;
        setError(error?: unknown): void;
    } & {
        menus: import("@jbrowse/react-app/dist/rootModel").Menu[];
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | null;
    initializationError: Error | null;
};
export default useGeneViewerState;
