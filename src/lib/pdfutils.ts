import * as PDFJS from "pdfjs-dist";
import PDFJSWorker from "pdfjs-dist/build/pdf.worker?url";

PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const getPageText = async (pdf: any, pageNo: number) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map((token) => token.str).join("");
  return pageText;
};

export async function pdf2Text(pdf: PDFJS.PDFDocumentProxy): Promise<string> {
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);

  return pageTexts.join(" ");
}

export function loadPDFJS(pdf: PDFJS.PDFDocumentProxy, container) {
  var currentPage = 1;
  var pages = [];
  var globalPdf = null;

  function renderPage(page) {
    //
    // Prepare canvas using PDF page dimensions
    //
    var canvas = document.createElement("canvas");
    // Link: http://stackoverflow.com/a/13039183/1577396
    // Canvas width should be set to the window's width for appropriate
    // scaling factor of the document with respect to the canvas width
    var viewport = page.getViewport({ scale: 1 });
    // append the created canvas to the container
    container.appendChild(canvas);
    // Get context of the canvas
    var context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    //
    // Render PDF page into canvas context
    //
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    page.render(renderContext).promise.then(function () {
      if (currentPage < globalPdf.numPages) {
        pages[currentPage] = canvas;
        currentPage++;
        globalPdf.getPage(currentPage).then(renderPage);
      } else {
        // Callback function here, which will trigger when all pages are loaded
      }
    });
  }

  if (!globalPdf) {
    globalPdf = pdf;
  }

  pdf.getPage(currentPage).then(renderPage);
}
