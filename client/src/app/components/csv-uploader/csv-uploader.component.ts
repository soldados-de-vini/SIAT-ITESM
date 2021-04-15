import { Component, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as csv from 'csvtojson';
import { ApiService } from 'src/app/services/api/api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'siat-csv-uploader',
  templateUrl: './csv-uploader.component.html',
  styleUrls: ['./csv-uploader.component.scss'],
})
export class CsvUploaderComponent implements OnInit {
  public isVisible: boolean;
  public objectToUpload: any;
  public loadingUpload: boolean;
  public file: NzUploadFile;

  @Input() endpoint: string;
  @Input() objectPrefix: string;
  @Input() columns: Array<any>;

  constructor(
    private apiService: ApiService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {}

  public beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    this.handleConfirm();
    return false;
  }

  private readFile(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file as any);
      fileReader.onload = () => resolve(fileReader.result as string);
    });
  }

  public async handleConfirm() {
    const csvString = await this.readFile(this.file);
    csv().fromString(csvString).then(object => {
      this.objectToUpload = object;
      console.log(object);
      this.showConfirmationModal();
    });
  }

  public handleUpload() {
    this.loadingUpload = true;
    const object = new Object();
    object[this.objectPrefix] = this.objectToUpload;
    this.apiService.post(this.endpoint, object).subscribe(
      (response) => {
        this.loadingUpload = false;
        if (response.status.statusCode === 200){
          this.messageService.success('Elementos creados con éxito');
        } else {
          this.messageService.error('Ha ocurrido un error intenta más tarde');
        }
      },
      (error) => {
        console.error(error);
        this.messageService.error('Ha ocurrido un error intenta más tarde');
        this.loadingUpload = false;
      }
    );
  }

  private showConfirmationModal() {
    this.isVisible = true;
  }

  public handleCancel(): void {
    this.objectToUpload = null;
    this.isVisible = false;
  }
}
