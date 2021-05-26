import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiService } from 'src/app/services/api/api.service';
import { NzMessageService } from 'ng-zorro-antd';
import { convertCsvToObject } from 'src/app/util/csv.util';

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

  @Input() isGroup: boolean;
  @Input() periodId: boolean;
  @Input() endpoint: string;
  @Input() objectPrefix: string;
  @Input() columns: Array<any>;
  // The fields of the columns that are arrays represented by index for example: columns = [not_an_array,an_array], areArray = [1]
  @Input() areArray: Array<number>;
  @Output() afterSuccess = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {}

  /**
   * We use this method to avoid the default behaviour of the nzuploader which is send a post request directly to a endpoint
   */
  public beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    this.handleConfirm();
    return false;
  }

  /**
   * Method to read csv blob and convert to text
   *
   * @param file blob file
   * @returns promise of the string
   */
  private readFile(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file as any);
      fileReader.onload = () => resolve(fileReader.result as string);
    });
  }

  /**
   * Trigger for modal confirmation of the csv converted to json
   */
  public async handleConfirm() {
    const csvString = await this.readFile(this.file);
    this.objectToUpload = convertCsvToObject(csvString, this.areArray);
    this.showConfirmationModal();
  }

  /**
   * Upload json after confirm in modal
   */
  public handleUpload() {
    this.loadingUpload = true;
    const object = new Object();

    if (this.isGroup){
      object[`periodId`] =  this.periodId;
      object[this.objectPrefix] = this.objectToUpload.map(
        (el) => {
          el.groupsAmount = Number.parseInt(el.groupsAmount, 10);
          return el;
        }
      );
    } else {
      object[this.objectPrefix] = this.objectToUpload;
    }

    console.log(object);

    this.apiService.post(this.endpoint, object).subscribe(
      (response) => {
        this.loadingUpload = false;
        if (response.result){
          this.messageService.success('Elementos creados con éxito');
          this.afterSuccess.emit(response.result);
          this.isVisible = false;
          this.objectToUpload = null;
        } else {
          this.messageService.error('Ha ocurrido un error, favor de revisar los datos que se proporcionaron...');
        }
      },
      (error) => {
        console.error(error);
        this.messageService.error('Ha ocurrido un error, favor de revisar los datos que se proporcionaron...');
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
