import { pdf2Text } from "../lib/pdfutils";
import importPdfjs, { PDFJS } from "../lib/importPdfjs";

import { writable } from "svelte/store";
import type { PDFDocumentProxy } from "pdfjs-dist";
import stringtoregex from "../lib/stringtoregex";

interface State {
  loading?: boolean;
  pdfjs?: PDFJS;
  url?: string;
  document?: PDFDocumentProxy;
  text?: string;
  regexString?: string;
  regexError?: boolean;
  regex?: RegExp;
}

function createAppStore() {
  const { subscribe, update } = writable<State>({});

  async function loadDocument(url: string) {
    update((state) => ({ ...state, loading: true }));

    const pdfjs = await importPdfjs();
    const document = await pdfjs.getDocument(url).promise;
    const text = await pdf2Text(document);

    update((state) => ({ ...state, loading: false, pdfjs, url, document, text }));
  }

  async function handleRegexChange(regexString: string) {
    console.log(regexString);
    if (!regexString)
      update((state) => ({
        ...state,
        regexString,
        regex: null,
        regexError: false,
      }));
    else {
      try {
        update((state) => ({
          ...state,
          regexString,
          regex: stringtoregex(regexString),
          regexError: false,
        }));
      } catch (error) {
        update((state) => ({
          ...state,
          regexString,
          regex: null,
          regexError: true,
        }));
      }
    }
  }

  return {
    subscribe,
    loadDocument,
    handleRegexChange,
  };
}

const appStore = createAppStore();

export default appStore;
