import {Chat, User} from "~/types";

export interface ChatsState {
   list: Chat[];
   lastPage: number;
}

export interface UsersState {
    me: User | null;
}
