import SparkMD5 from 'spark-md5';
import type { IChunk, IData } from './index.js';

/**
 * @description 创建切片
 * @param file 要切片的文件
 * @param index 切片索引
 * @param chunkSize 切片大小
 * @returns {Promise<IChunk>}
 */
export function createChunk(file: File, index: number, chunkSize: number): Promise<IChunk> {
    return new Promise<IChunk>((resolve, reject) => {
        const start = index * chunkSize;
        const end = start + chunkSize;

        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const blob = file.slice(start, end);

        fileReader.onload = (e: ProgressEvent<FileReader>) => {
            spark.append(e.target?.result as ArrayBuffer);
            resolve({
                start,
                end,
                index,
                hash: spark.end(),
                blob
            });
        };

        fileReader.onerror = reject;

        fileReader.readAsArrayBuffer(blob);
    });
}

/**
 * @description worker 线程
 * @param {MessageEvent<IData>} e
 * @returns {Promise<void>}
 */
async function onMessage(e: MessageEvent<IData>): Promise<void> {
    const { file, chunkSize, startChunkIndex: start, endChunkIndex: end } = e.data;

    const proms: Array<Promise<IChunk>> = [];

    for (let i = start; i < end; i++) {
        proms.push(createChunk(file, i, chunkSize));
    }

    const chunks = await Promise.all(proms);
    postMessage(chunks);
}

onmessage = onMessage;

