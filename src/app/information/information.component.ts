import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  loading = true;
  loaded = false;
  imgSrc = "https://www.zembula.com/wp-content/uploads/2019/10/header-background-01.png"

  constructor(private _route: ActivatedRoute, private apiServe: ApiServiceService) { }
  data: any

  ngOnInit() {
    const id = this._route.snapshot.params['id'] - 1
    this.apiServe.getData().subscribe(data => {
      console.log(data[id]);
      this.data = data[id]
    })
  }
}
