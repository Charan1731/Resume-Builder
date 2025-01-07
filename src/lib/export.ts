import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Resume } from '@/types/resume';

export async function exportToPDF(resume: Resume, previewElement: HTMLElement) {
  try {
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}