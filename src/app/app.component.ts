import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projecct';
 
  displayedColumns: string[] = ['productName', 'category','fruit','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog , private api :ApiService)
{
}
ngOnInit(): void{
  this.getAllproduct()
}
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllproduct
      }
    })
  }
  getAllproduct(){
    this.api.getproduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        {
          alert("Error While Fetching the record")
        }  
      }
        
    })}
    editproduct(row:any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
    
      }).afterClosed().subscribe(val=>{
        if(val==='update'){
          this.getAllproduct();
        }
      })
    }
    deleteproduct(id:number){
      this.api.deleteproduct(id)
      .subscribe({
        next:(res)=>{
          alert("product Deleted Successfully")
          this.getAllproduct();
        },
        error:()=>{
          alert("error while deleting the product");
        }
      })
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
