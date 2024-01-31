import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PDFDocumentProxy, PdfViewerModule} from "ng2-pdf-viewer";
import {MaterialModule} from "../../../material.module";
import {ReportService} from "../../../shared/service/report.service";
import printJS from "print-js";
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [PdfViewerModule, MaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit, OnDestroy{
  pdfSrc!: any;
  currentLocation: Link = {
    path: ["admin", "report"],
    title: "Report",
    url: "",
    expanded: false
  }
  currentLink: string= "assets/reports/school_performance.pdf";

  reports: Array<Report> = [];
  private reportSub: Subscription | undefined;
  private reportService: ReportService = inject(ReportService);
  private navigationService: NavigationService = inject(NavigationService);

  ngOnInit(): void {
    this.loadPdf("assets/reports/school_performance.pdf");
    this.navigationService.setCurrentLocation(this.currentLocation);
  }

  loadPdf(pdfFileName: string): void {
    this.reportService.getPdf(pdfFileName).subscribe(
      (pdfContent: ArrayBuffer) => {
        this.pdfSrc = new Uint8Array(pdfContent);
      },
      (error) => {
        console.error('Error loading PDF:', error);
      }
    );
  }

  downloadPdf(): void {
    const pdfFileName = 'downloaded-pdf';
    const pdfBlob = new Blob([this.pdfSrc], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = `${pdfFileName}.pdf`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  printPdf(): void {
    printJS({printable: this.currentLink, type:'pdf', showModal:true})
  }

  ngOnDestroy(): void{
    if(this.reportSub){
      this.reportSub.unsubscribe();
    }
  }
}
