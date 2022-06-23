import * as PDFJS from "pdfjs-dist";
import PDFJSWorker from "pdfjs-dist/build/pdf.worker?url";
import { pdf2Text } from "../lib/pdfutils";

import { writable } from "svelte/store";

PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;

interface State {
  loading?: boolean;
  document?: PDFJS.PDFDocumentProxy;
  text?: string;
}

function createPdfStore() {
  const { subscribe, set, update } = writable<State>({});

  async function loadDocument(url: string) {
    set({ loading: true });

    const document = await PDFJS.getDocument(url).promise;
    const text = await pdf2Text(document);

    update((state) => ({ ...state, document, text }));
  }

  return {
    subscribe,
    loadDocument,
  };
}

const pdfStore = createPdfStore();

export default pdfStore;
