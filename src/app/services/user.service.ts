import { Injectable } from '@angular/core';
import { User } from '../config/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  authorization(login: string, password: string): boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem('usersTodoIst') ?? '[]'
    );

    const userauth = users.find((item) => item.login === login);
    if (!userauth) {
      alert('Пользователь не найден');
      return false;
    } else {
      if (userauth.password === password) {
        return true;
      } else {
        alert('Неверный пароль');
        return false;
      }
    }
  }

  registration(user: User): boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem('usersTodoIst') ?? '[]'
    );
    const user1 = users.find((item) => item.login === user.login);
    if (user1) {
      alert('такой пользователь уже зарегистрирован');
      return false;
    } else {
      if (users.length === 0) {
        user.id = 1;
      } else {
        let max = 0;
        users.forEach((item) => {
          if (item.id && max < item.id) {
            max = item.id;
          }
        });
        user.id = max + 1;
      }
      users.push(user);
      localStorage.setItem('usersTodoIst', JSON.stringify(users));
      return true;
    }
  }
}
