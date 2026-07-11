/**
 * Centralized Export Utility for CSV and PDF generation
 */

function generateCSV(headers, rows, filename) {
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generatePDF(title, inputs, headers, rows, filename, insights) {
    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF not loaded');
        alert('PDF generator is loading, please try again.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add Logo/Branding Header
    doc.setFontSize(22);
    doc.setTextColor(0, 68, 204); // Wealthory Blue
    doc.text('Wealthory Global', 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(title, 14, 30);
    
    let currentY = 40;
    
    // Summary of Inputs
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Your Inputs:', 14, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    Object.entries(inputs).forEach(([key, val]) => {
        doc.text(`${key}: ${val}`, 14, currentY);
        currentY += 6;
    });
    
    currentY += 4;
    
    // Advanced Insights & Scoring
    if (insights && insights.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(0, 68, 204);
        doc.text('Wealthory Insights & Suggestions:', 14, currentY);
        currentY += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        insights.forEach(insight => {
            const splitText = doc.splitTextToSize(`• ${insight}`, 180);
            doc.text(splitText, 14, currentY);
            currentY += (splitText.length * 5) + 2;
        });
        currentY += 4;
    }
    
    // Year on Year Data Table
    if (headers && rows && rows.length > 0) {
        doc.autoTable({
            startY: currentY,
            head: [headers],
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: [0, 68, 204] },
            margin: { top: 10 }
        });
    }
    
    doc.save(filename);
}
