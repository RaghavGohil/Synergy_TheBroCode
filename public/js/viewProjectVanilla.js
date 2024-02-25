async function fetchPdf(fileId) {
  try {
    const response = await fetch(`/api/fetch-pdf/${fileId}`);

    if (!response.ok) {
      throw new Error(`Error fetching PDF: ${response.statusText}`);
    }

    const pdfData = await response.blob(); // Get the PDF data as a Blob
    // Handle the PDF data (e.g., create a data URL, display in an object URL, or download)
    // Use libraries