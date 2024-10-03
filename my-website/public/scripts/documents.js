document.addEventListener("DOMContentLoaded", function() {
    const documentList = document.getElementById('document-list');

    // Fetch documents from the JSON file
    fetch('documents.json')
        .then(response => response.json())
        .then(documents => {
            // Create list items for each document
            documents.forEach(doc => {
                const listItem = document.createElement('a');
                listItem.className = 'list-group-item list-group-item-action';
                listItem.innerHTML = `<h5>${doc.name}</h5><p>${doc.summary}</p>`;
                listItem.href = '#';
                listItem.addEventListener('click', function() {
                    openPdf(doc.file);
                });
                documentList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching documents:', error));

    // Function to open PDF in modal
    function openPdf(file) {
        const pdfViewer = document.getElementById('pdfViewer');
        const downloadLink = document.getElementById('downloadLink');

        pdfViewer.src = file;
        downloadLink.href = file;

        $('#pdfModal').modal('show');
    }
});