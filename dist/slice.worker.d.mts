import { IChunk } from './index.mjs';

/**
 * @description 创建切片
 * @param file 要切片的文件
 * @param index 切片索引
 * @param chunkSize 切片大小
 * @returns {Promise<IChunk>}
 */
declare function createChunk(file: File, index: number, chunkSize: number): Promise<IChunk>;

export { createChunk };
