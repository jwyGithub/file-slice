export interface ISliceFileOptions {
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

export interface IChunk {
    start: number;
    end: number;
    index: number;
    hash: string;
    blob: Blob;
}

export interface IData {
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
export async function sliceFile(options: ISliceFileOptions): Promise<IChunk[]> {
    const { chunkSize = 1024 * 1024, threadCount = navigator.hardwareConcurrency || 4, workerScript, file } = options;

    if (!file) {
        throw new Error('file is required');
    }

    return new Promise<IChunk[]>((resolve, reject) => {
        const chunkCount = Math.ceil(file.size / chunkSize);
        const chunks: IChunk[] = [];

        const threadChunkCount = Math.ceil(chunkCount / threadCount);

        let finishCount = 0;

        for (let i = 0; i < threadCount; i++) {
            const worker = typeof workerScript === 'string' ? new Worker(workerScript, { type: 'module' }) : workerScript();

            const start = i * threadChunkCount;
            const end = Math.min((i + 1) * threadChunkCount, chunkCount);

            worker.postMessage({
                file,
                chunkSize,
                startChunkIndex: start,
                endChunkIndex: end
            });

            worker.onmessage = e => {
                for (let i = start; i < end; i++) {
                    chunks[i] = e.data[i - start];
                }

                worker.terminate();

                finishCount++;

                if (finishCount === threadCount) {
                    resolve(chunks);
                }
            };

            worker.onerror = reject;
        }
    });
}

