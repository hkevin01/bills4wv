const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const docsDir = path.join(__dirname, '../public/docs'); // Updated path
const outputFilePath = path.join(__dirname, '../public/documents.json'); // Updated path

fs.readdir(docsDir, (err, files) => {
    if (err) throw err;

    const documents = [];

    files.forEach(file => {
        if (path.extname(file) === '.pdf') {
            const filePath = path.join(docsDir, file);
            const dataBuffer = fs.readFileSync(filePath);

            pdf(dataBuffer).then(data => {
                const firstParagraph = data.text.split('\n')[0]; // Get the first paragraph
                documents.push({
                    name: file.replace('.pdf', ''), // Remove .pdf extension for the name
                    summary: firstParagraph, // Use the first paragraph as the summary
                    file: filePath.replace(/\\/g, '/'), // Ensure proper file path format
                });

                // Write to JSON file after processing all PDFs
                if (documents.length === files.length) {
                    fs.writeFileSync(outputFilePath, JSON.stringify(documents, null, 2));
                    console.log('Documents JSON created:', outputFilePath);
                }
            });
        }
    });
});