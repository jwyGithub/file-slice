English | [简体中文](https://github.com/jwyGithub/file-slice/blob/main/README.zh.md)

# file-slice

A file slicing tool

<p align="center">
  <img src="https://img.shields.io/npm/v/@jiangweiye/file-slice" alt='version'>
  <img src="https://img.shields.io/npm/dm/@jiangweiye/file-slice" alt='download'>
  <img src="https://img.shields.io/github/issues/jwyGithub/file-slice" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/file-slice" alt='license'>
</p>
<br />

## Install

#### pnpm

```sh
pnpm add @jiangweiye/file-slice
```

#### yarn

```sh
yarn add @jiangweiye/file-slice
```

#### npm

```sh
npm install @jiangweiye/file-slice
```

## Usage

#### vite

```typescript
import { sliceFile } from '@jiangweiye/file-slice';
// specify the imported file as worker
import WorkerScript from '@jiangweiye/file-slice/worker?worker';

const CHUNK_SIZE = 1024 * 1024 * 5;
const THREAD_COUNT = 4;

const selectFile = document.querySelector<HTMLInputElement>('#select-file');

selectFile?.addEventListener('change', async e => {
    const file = (e.target as HTMLInputElement).files?.[0];

    const chunks = await sliceFile({
        file: file!,
        chunkSize: CHUNK_SIZE,
        threadCount: THREAD_COUNT,
        workerScript: () => new WorkerScript()
    });

    console.log('chunks', chunks);
});
```

