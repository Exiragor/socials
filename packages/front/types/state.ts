import {Chat, Person} from "~/types";

export interface RootState {
  people: Person[];
}

export interface ChatsState {
   list: Chat[];
   lastPage: number;
}
