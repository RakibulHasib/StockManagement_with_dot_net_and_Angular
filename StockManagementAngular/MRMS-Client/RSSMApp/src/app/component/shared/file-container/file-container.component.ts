import { Component,Input,Output,OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { NotificationService } from '../../../services/Shared/notification.service';

@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: ['./file-container.component.css']
})
export class FileContainerComponent {

/*  fileTypes: FileTypes[] = [];*/

  constructor(
/*    private fileTypeSvc: FileTypeService,*/
    private notifyService: NotificationService
  ) { }

  @Input() row: any;

  @Output() ItemRemoved : EventEmitter<any> = new EventEmitter<any>();
  @Output() FileChange : EventEmitter<any> = new EventEmitter<any>();

  removeItem(){
    this.ItemRemoved.emit();
  }
  handleFileInputChange($event: any){
    const file:File = $event.target.files[0];
    if(file && file.size > 0){
      this.FileChange.emit(file);
    }
  }

  ngOnInit(): void {


  }


}
