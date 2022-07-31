import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  progress: number = 0;
  files!: Set<File>;

  constructor(
    private service: UploadFileService,
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.target.files;
    (document.getElementById('customFileLabel') as HTMLElement).innerHTML = selectedFiles[0].name;

    const fileNames = []
    this.files = new Set();
    for(let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }
    (document.getElementById('customFileLabel') as HTMLElement).innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.service.upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress)
            this.progress = progress
          }),
          filterResponse()
        )
        .subscribe(response => console.log('upload concluído'))
        /* .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          // console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('upload concluído');
          } else if(event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100)/ Number(event.total))
            // console.log('Progresso', percentDone)
            this.progress = percentDone
          }
        }); */
    }
  }

  onDownloadPowerPoint() {
    this.service.download(`${environment.BASE_URL}/downloadPowerPoint`)
      .subscribe((res: any) => {
        this.service.handleFile(res, 'delivery.pptx');
      })
  }

  onDownloadPDF() {
    this.service.download(`${environment.BASE_URL}/downloadPowerPoint`)
      .subscribe((res: any) => {
        this.service.handleFile(res, 'curriculum.pdf');
      })
  }

}
