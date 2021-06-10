import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private apollo: Apollo, private router: Router) {}

  //User erstellen
  signupUser(email, password, username, phoneNumber) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createUser(
            createUserInput: {
              email: "${email}"
              password: "${password}"
              username: "${username}"
              phoneNumber: "${phoneNumber}"
            }
          ) {
            id
            email
            username
            password
            phoneNumber
            userRole
          }
        }
      `,
    });
  }

  //User einloggen
  loginUser(email, password) {
    return this.apollo
      .query<any>({
        query: gql`
        query {
          login(email: "${email}", password: "${password}") {
            id
            email
            password
            username
            phoneNumber
            userRole
          }
        }
      `,
      })
      .pipe(
        tap((resData) => {
          console.log(resData.data);
          const { id, email, password, username, phoneNumber, userRole } =
            resData.data.login;
          this.handleAuthentication(
            id,
            email,
            password,
            username,
            phoneNumber,
            userRole
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      password: string;
      username: string;
      phoneNumber: string;
      userRole: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.password,
      userData.username,
      userData.phoneNumber,
      userData.userRole
    );
    this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/main']);
    localStorage.removeItem('userData');
  }

  updateUser(
    id: string,
    email: string,
    password: string,
    username: string,
    phoneNumber: string,
    userRole: string
  ) {
    this.apollo
      .mutate({
        mutation: gql`
        mutation {
          editUser(
            id: "${id}"
            email: "${email}"
            password: "${password}"
            username: "${username}"
            phoneNumber: "${phoneNumber}"
            userRole: "${userRole}"
          ) {
            id
            email
            password
            username
            phoneNumber 
            userRole
          }
        }
      `,
      })
      .subscribe(
        ({ data }: any) => {
          console.log(data.editUser);
          const { id, email, password, username, phoneNumber, userRole } =
            data.editUser;
          console.log('Passwort nach update: ', password);
          const user = new User(
            id,
            email,
            password,
            username,
            phoneNumber,
            userRole
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private handleAuthentication(
    id: string,
    email: string,
    password: string,
    username: string,
    phoneNumber: string,
    userRole: string
  ) {
    const user = new User(id, email, password, username, phoneNumber, userRole);
    this.user.next(user);
    this.router.navigate(['/board']);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
