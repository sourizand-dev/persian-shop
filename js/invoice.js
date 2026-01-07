
document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("download-invoice");
    const targetArea = document.getElementById("invoice-area");

    if (!downloadBtn || !targetArea) return;

    downloadBtn.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;

        html2canvas(targetArea, {
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pageWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            let position = 10;

            if (imgHeight > pageHeight) {
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, pageHeight - 20);
            } else {
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            }

            pdf.save("invoice.pdf");
        });
    });
});

document.getElementById("print-invoice").addEventListener("click", function () {
    window.print();
});
