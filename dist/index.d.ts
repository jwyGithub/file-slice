interface ISliceFileOptions {
    /**
     * @description 文件
     */
    file: File;
    /**
     * @description 切片大小
     * @default 1024 * 1024
     */
    chunkSize?: number;
    /**
     * @description 线程数
     * @default navigator.hardwareConcurrency || 4
     */
    threadCount?: number;
    /**
     * @description worker脚本
     */
    workerScript: ((...args: any[]) => Worker) | string;
}
interface IChunk {
    start: number;
    end: number;
    index: number;
    hash: string;
    blob: Blob;
}
interface IData {
    file: File;
    chunkSize: number;
    startChunkIndex: number;
    endChunkIndex: number;
}
/**
 * @description 创建文件切片
 * @param {ISliceFileOptions} options
 * @returns {Promise<IChunk[]>}
 */
declare function sliceFile(options: ISliceFileOptions): Promise<IChunk[]>;

export { type IChunk, type IData, type ISliceFileOptions, sliceFile };
