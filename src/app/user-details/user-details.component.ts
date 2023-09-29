import { Component, OnInit } from '@angular/core';
import{User} from "../user";
import{Pet} from "../pet";
import{ActivatedRoute} from "@angular/router";
import{UserDataService} from "../user-data.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  user?: User;
  public pets: Pet[];

  constructor(
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute) {
    this.pets = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id != null) {
        this.userDataService.getUser(id).subscribe(user => {
          this.user = user;
        });
      }
    });

    this.activatedRoute.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id != null){
        this.userDataService.getUserPetsList(id).subscribe(pets => {
          this.pets = pets;
        });
      }
    });
  }
}
