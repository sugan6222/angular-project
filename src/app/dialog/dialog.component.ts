import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

   list=["Developer","Analyst","UX Designer","Database Administrator"]
   productFrom !:FormGroup
   actionBtn :string="save"
  constructor(private formBulider : FormBuilder ,
    private api : ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData :any,
     private dialogRef : MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productFrom = this.formBulider.group
    ({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      fruit : ['',Validators.required],
      date : ['',Validators.required]
    });
  if(this.editData){
    this.actionBtn="update";
    this.productFrom.controls['productName'].setValue(this.editData.productName);
    this.productFrom.controls['category'].setValue(this.editData.category);
    this.productFrom.controls['fruit'].setValue(this.editData.fruit);
    this.productFrom.controls['date'].setValue(this.editData.date);
  }

  }
    addproduct(){
      if(!this.editData){
        if(this.productFrom.valid){
          this.api.postproduct(this.productFrom.value)
          .subscribe({
            next:(res)=>{
              alert("Employee added succesfully");
              this.productFrom.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the product ")
            }
          })
        }

  }else{
    this.updateproduct()
  }
}
updateproduct(){
  this.api.putproduct(this.productFrom.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Employee Details updated");
      this.productFrom.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record");
    }
  })
}}
