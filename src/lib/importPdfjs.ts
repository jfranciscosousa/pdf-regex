export type PDFJS = Awaited<ReturnType<typeof importPdfjs>>;

export default async function importPdfjs() {
  const [PDFJS, worker] = await Promise.all([
    import("pdfjs-dist"),
    import("pdfjs-dist/build/pdf.worker?url"),
  ]);

  PDFJS.GlobalWorkerOptions.workerSrc = worker.default;

  return PDFJS;
}
