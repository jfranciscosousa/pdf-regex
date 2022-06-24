import debounce from "lodash/debounce";
import { pdf2Text } from "../lib/pdfutils";
import importPdfjs, { PDFJS } from "../lib/importPdfjs";

import { writable } from "svelte/store";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface State {
  loading?: boolean;
  pdfjs?: PDFJS;
  url?: string;
  document?: PDFDocumentProxy;
  text?: string;
  regexError?: boolean;
  regex?: RegExp;
  highlightedText?: string;
}

function createAppStore() {
  const { subscribe, update } = writable<State>({});

  async function loadDocument(url: string) {
    update((state) => ({ ...state, loading: true }));

    const pdfjs = await importPdfjs();
    const document = await pdfjs.getDocument(url).promise;
    const text = await pdf2Text(document);

    update((state) => ({
      ...state,
      loading: false,
      pdfjs,
      url,
      document,
      text,
      highlightedText: text,
    }));

    window.onbeforeunload = function () {
      return "Are you sure you want to leave the page?";
    };
  }

  const highlightText = debounce(
    () =>
      update((state) => {
        return {
          ...state,
          highlightedText: state.text.replace(state.regex, (string) => `<b>${string}</b>`),
        };
      }),
    500,
  );

  async function handleRegexChange(regexString: string, flagsString: string) {
    if (!regexString)
      update((state) => ({
        ...state,
        regexString,
        regex: null,
        regexError: false,
        highlightedText: state.text,
      }));
    else {
      try {
        update((state) => ({
          ...state,
          regexString,
          regex: new RegExp(regexString, flagsString),
          regexError: false,
        }));

        highlightText();
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
