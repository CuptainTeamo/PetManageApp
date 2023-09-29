export interface UserJson{
  id: string;
  firstName: string;
  lastName: string;
  petCount: number;
}

export interface UserListJson{
  users: UserJson[];
}

export interface PetJson{
  id: string;
  name: string;
  petKind: string;
  age: number;
}

export interface PetListJson{
  pets: PetJson[];
}
