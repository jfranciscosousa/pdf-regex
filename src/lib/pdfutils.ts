import type { PDFDocumentProxy } from "pdfjs-dist";

const getPageText = async (pdf: any, pageNo: number) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map((token) => token.str).join("");
  return pageText;
};

export async function pdf2Text(pdf: PDFDocumentProxy): Promise<string> {
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);

  return pageTexts.join(" ");
}
