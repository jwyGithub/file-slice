var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var src_exports = {};
__export(src_exports, {
  sliceFile: () => sliceFile
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sliceFile
});
