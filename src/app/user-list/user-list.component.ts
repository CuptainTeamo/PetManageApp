import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import{UserDataService} from "../user-data.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[];
  constructor(private userDataService: UserDataService){
    this.users = [];
  }

  ngOnInit():void {
    this.userDataService.getUserList().subscribe(
      users =>{
        console.log(users);
        this.users = users;
      }
    )
  }
}
