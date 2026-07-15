document.addEventListener('DOMContentLoaded', () => {
    // Form Inputs
    const stateSelect = document.getElementById('state');
    const senderName = document.getElementById('senderName');
    const senderAddress = document.getElementById('senderAddress');
    const recipientName = document.getElementById('recipientName');
    const recipientAddress = document.getElementById('recipientAddress');
    const amount = document.getElementById('amount');
    const deadline = document.getElementById('deadline');
    const description = document.getElementById('description');

    // Preview Outputs
    const outDate = document.getElementById('out-date');
    const outSenderName = document.getElementById('out-senderName');
    const outSenderAddress = document.getElementById('out-senderAddress');
    const outRecipientName = document.getElementById('out-recipientName');
    const outRecipientAddress = document.getElementById('out-recipientAddress');
    const outRecipientNameGreeting = document.getElementById('out-recipientNameGreeting');
    const outAmount = document.getElementById('out-amount');
    const outDescription = document.getElementById('out-description');
    const outDeadline = document.getElementById('out-deadline');
    const outSenderNameFooter = document.getElementById('out-senderNameFooter');
    const outSenderNameSig = document.getElementById('out-senderNameSig');
    const stateClause = document.getElementById('state-clause');

    // Set today's date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    outDate.textContent = today.toLocaleDateString('en-US', options);

    // State-specific clauses database
    const stateClauses = {
        'CA': '<p><em>As per California Civil Code Section 116.320, I am providing you with this formal notice before filing a lawsuit in Small Claims Court.</em></p>',
        'NY': '<p><em>Please be advised that under New York Law, failure to resolve this matter may result in legal action in the appropriate City or Justice Court.</em></p>',
        'TX': '<p><em>This letter constitutes a formal demand under Chapter 38 of the Texas Civil Practice and Remedies Code. If this claim is not paid within 30 days, I reserve the right to seek attorney fees in addition to the claim amount.</em></p>',
        'FL': '<p><em>Notice is hereby given pursuant to Florida Statutes that failure to remit the requested amount will result in further legal proceedings without additional notice.</em></p>'
    };

    // Update function
    function updatePreview() {
        outSenderName.textContent = senderName.value || '[Sender Name]';
        outSenderAddress.textContent = senderAddress.value || '[Sender Address]';
        
        outRecipientName.textContent = recipientName.value || '[Recipient Name]';
        outRecipientAddress.textContent = recipientAddress.value || '[Recipient Address]';
        outRecipientNameGreeting.textContent = recipientName.value || '[Recipient Name]';
        
        // Format amount with commas
        const amt = parseFloat(amount.value) || 0;
        outAmount.textContent = amt.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        
        outDeadline.textContent = deadline.value || '[X]';
        
        // Replace newlines with <br> for HTML rendering
        const descText = description.value || '[Description of Incident]';
        outDescription.innerHTML = descText.replace(/\n/g, '<br>');
        
        outSenderNameFooter.textContent = senderName.value || '[Sender Name]';
        outSenderNameSig.textContent = senderName.value || '[Sender Name]';

        // Update state specific clause
        const selectedState = stateSelect.value;
        stateClause.innerHTML = stateClauses[selectedState] || '';
    }

    // Attach event listeners to all inputs
    const inputs = [stateSelect, senderName, senderAddress, recipientName, recipientAddress, amount, deadline, description];
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Initial update
    updatePreview();

    // PDF Download Logic
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('documentContent');
        
        // Temporarily modify styles for better PDF output if needed
        const originalPadding = element.style.padding;
        
        const opt = {
            margin:       [15, 15, 15, 15],
            filename:     'Demand_Letter.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };

        // Add loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = 'Generating PDF...';
        downloadBtn.disabled = true;

        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Restore button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error("PDF generation failed:", err);
            alert("There was an error generating the PDF. Please try again.");
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        });
    });
});
