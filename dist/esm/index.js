var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
function sliceFile(options) {
  return __async(this, null, function* () {
    const { chunkSize = 1024 * 1024, threadCount = navigator.hardwareConcurrency || 4, workerScript, file } = options;
    if (!file) {
      throw new Error("file is required");
    }
    return new Promise((resolve, reject) => {
      const chunkCount = Math.ceil(file.size / chunkSize);
      const chunks = [];
      const threadChunkCount = Math.ceil(chunkCount / threadCount);
      let finishCount = 0;
      for (let i = 0; i < threadCount; i++) {
        const worker = typeof workerScript === "string" ? new Worker(workerScript, {
          type: "module"
        }) : workerScript();
        const start = i * threadChunkCount;
        const end = Math.min((i + 1) * threadChunkCount, chunkCount);
        worker.postMessage({
          file,
          chunkSize,
          startChunkIndex: start,
          endChunkIndex: end
        });
        worker.onmessage = (e) => {
          for (let i2 = start; i2 < end; i2++) {
            chunks[i2] = e.data[i2 - start];
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
  });
}
__name(sliceFile, "sliceFile");
export {
  sliceFile
};
