import { Injectable } from '@angular/core';
import { User } from '../config/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  authorization(login: string, password: string) {
  
    const users: User[] = JSON.parse( localStorage.getItem('usersTodoIst')??'[]')

    const userauth = users.find((item) => item.login === login);
    if (!userauth){
      alert ('Пользователь не найден')
    }
    else{
      if (userauth.password===password){

      }
      else alert ('Неверный пароль')
    }
  }

  registration(user: User):boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem('usersTodoIst') ?? '[]'
    );
    const user1 = users.find((item) => item.login === user.login);
    if (user1) {
      alert('такой пользователь уже зарегистрирован');
      return false;
    } else {
      users.push(user);
      localStorage.setItem('usersTodoIst', JSON.stringify(users));
      return true;
    }
  }
}
