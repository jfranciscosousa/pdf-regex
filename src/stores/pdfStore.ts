import { pdf2Text } from "../lib/pdfutils";
import importPdfjs, { PDFJS } from "../lib/importPdfjs";

import { writable } from "svelte/store";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface State {
  loading?: boolean;
  pdfjs?: PDFJS;
  document?: PDFDocumentProxy;
  text?: string;
}

function createPdfStore() {
  const { subscribe, set, update } = writable<State>({});

  async function loadDocument(url: string) {
    set({ loading: true });

    const pdfjs = await importPdfjs();
    const document = await pdfjs.getDocument(url).promise;
    const text = await pdf2Text(document);

    update((state) => ({ ...state, pdfjs, document, text }));
  }

  return {
    subscribe,
    loadDocument,
  };
}

const pdfStore = createPdfStore();

export default pdfStore;
