import { Component, OnInit } from '@angular/core';
import { Details } from '../details';
import { NotyfService } from 'ng-notyf';
import { ApiServiceService } from '../services/api-service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  genders: any[] = [
    { value: 'Male' },
    { value: 'Female' }
  ];

  specializations: any[] = [
    { value: 'Front End Development' },
    { value: 'Back End Development' },
    { value: 'Cloud Computing' }
  ];

  datas: Array<Details> = [];
  info: any
  editted = false
  status = "Submit"
  formReset: any

  id: any
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

  constructor(private notyfService: NotyfService, private apiService: ApiServiceService) {
    this.notyfService.toastStyle = { 'background-color': '#0058d0', 'color': 'white' };
  }

  ngOnInit() {
    this.apiService.getData().subscribe(
      data => {
        this.datas = data
        console.log(this.datas)
      }
    )
  }

  onSubmit(f) {
    this.formReset = f
    if (!this.editted) {
      this.info = new Details;
      this.info.name = this.name;
      this.info.username = this.username;
      this.info.email = this.email;
      this.info.phone = this.phone;
      this.info.website = this.website;
      this.apiService.createData(this.info).subscribe(
        data=>{
          console.log(data)
          data.id = this.info.id;
          this.datas.push(data);
        }
      )
      
      this.status = "Submit"
      this.notyfService.success("👍 Student saved successfully!");
    } else {
      this.apiService.updateData(this.info,this.id).subscribe(
        data=>{
          console.log(data.id)
        }
      )
      this.datas.forEach(element => {
        if (element.id == this.id) {
          element.name = this.name;
          element.username = this.username;
          element.email = this.email;
          element.phone = this.phone;
          element.website = this.website
        }
      });
      this.notyfService.error("👍 Student updated successfully!");
      this.status = "Submit"
      this.editted = false
    }
    f.form.reset()
  }

  onCancel() {
    this.status = "Submit"
    this.formReset!=null? this.formReset.form.reset(): 
    this.name =''
    this.username = ''
    this.email = ''
    this.phone = ''
    this.website = ''
    this.editted = false
  }

  edit(form) {
    this.editted = true
    this.name = form.name
    this.username = form.username
    this.email = form.email
    this.phone = form.phone
    this.website = form.website
    this.id = form.id;
    this.status = "Update"
    
  }

  delete(form) {
    this.apiService.deleteData(form.id).subscribe(
      data=>{
        console.log(data)
      }
    )
    this.datas.splice(this.datas.indexOf(form), 1)
  }
}
