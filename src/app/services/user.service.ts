import { Injectable } from '@angular/core';
import { User, UserCreate } from '../config/types';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userId$: Subject<number> = new Subject();

  constructor() {}

  authorization(login: string, password: string): boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem('usersTodoIst') ?? '[]'
    );

    const userAuth = users.find((item) => item.login === login);
    if (!userAuth) {
      alert('Пользователь не найден');
      return false;
    } else {
      if (userAuth.password === password) {
        localStorage.setItem('userId', `${userAuth.id}`);
        this.userId$.next(userAuth.id);
        return true;
      } else {
        alert('Неверный пароль');
        return false;
      }
    }
  }

  registration(user: UserCreate): boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem('usersTodoIst') ?? '[]'
    );
    const user1 = users.find((item) => item.login === user.login);
    if (user1) {
      alert('такой пользователь уже зарегистрирован');
      return false;
    } else {
      const newUser: User = { ...user, id: 0 };
      if (users.length === 0) {
        newUser.id = 1;
      } else {
        let max = 0;
        users.forEach((item) => {
          if (max < item.id) {
            max = item.id;
          }
        });
        newUser.id = max + 1;
        localStorage.setItem('userId', String(newUser.id));
        this.userId$.next(newUser.id);
      }
      users.push(newUser);
      localStorage.setItem('usersTodoIst', JSON.stringify(users));
      return true;
    }
  }

  getUserId(): number | null {
    const userId = Number(localStorage.getItem('userId')) ?? 0;
    this.userId$.next(userId);

    return Number(userId);
  }

  unlog() {
    this.userId$.next(0);
    localStorage.removeItem('userId');
  }
}
