import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {User} from "./user";
import{Pet} from "./pet";
import {UserListJson, UserJson, PetJson, PetListJson} from "./json-structure";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private jsonDataUri = 'http://localhost:8080/api/users';

  private static json2User(userJson: UserJson): User {
    const user = new User();
    user.id = userJson.id;
    user.firstName = userJson.firstName;
    user.lastName = userJson.lastName;
    user.petCount = userJson.petCount;
    return user;
  }

  private static json2Pet(petJson: PetJson): Pet {
    const pet = new Pet();
    pet.id = petJson.id;
    pet.petName = petJson.name;
    pet.petKind = petJson.petKind;
    pet.petAge = petJson.age;
    return pet;
  }

  public getUserList(): Observable<User[]> {
    const users: User[] = [];
    const subject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);
    this.httpClient
      .get(this.jsonDataUri)
      .subscribe(
        (dataJson: any) => {
          const userListJson: UserListJson = dataJson._embedded;
          const items: UserJson[] = userListJson.users;
          console.log(items);
          items.forEach(
            (userJson: UserJson) => users.push(UserDataService.json2User(userJson)));
          subject.next(users);
        })
    return subject;
  }

  public getUser(id: String): Observable<User> {
    let subject: ReplaySubject<User> = new ReplaySubject<User>();
    this.httpClient
      .get(this.jsonDataUri + '/' + id)
      .subscribe(
        (userJson: any) => {
          console.log(userJson);
          subject.next(UserDataService.json2User(userJson));
        })
    return subject;
  }

  public getUserPetsList(id: string): Observable<Pet[]> {
    const pets: Pet[] = [];
    const subject: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>(pets);
    this.httpClient
      .get(this.jsonDataUri + '/' + id + '/pets')
      .subscribe(
        (dataJson: any) => {
          const petListJson: PetListJson = dataJson._embedded;
          const items: PetJson[] = petListJson.pets;
          console.log(items);
          items.forEach(
            (petJson: PetJson) => pets.push(UserDataService.json2Pet(petJson)));
          subject.next(pets);
        })
    return subject;
  }

}
