import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private apollo: Apollo) {}

  fetchUsers() {
    return this.apollo.watchQuery({
      query: gql`
        {
          users {
            id
            email
            password
            phoneNumber
            username
            userRole
          }
        }
      `,
    });
  }

  getUserBySomething(text: string) {
    return this.apollo.watchQuery({
      query: gql`
        {
          usersBySomething(text: "${text}") {
            id
            email
            password
            phoneNumber
            username
            userRole
          }
        }
      `,
    });
  }

  updateUser(
    id: string,
    email: string,
    password: string,
    username: string,
    phoneNumber: string,
    userRole: string
  ) {
    return this.apollo.mutate({
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
    });
  }

  deleteUserById(id: string) {
    return this.apollo.mutate({
      mutation: gql`
          mutation {
            deleteUserById(id: "${id}") {
              id
              password
              email
            }
          }
        `,
    });
  }

  storeBoardItem(title, teaser, link, imgUrl) {
    this.apollo
      .mutate({
        mutation: gql`
      mutation {
        createBoardItem(
          createBoardItemInput: {
            title:"${title}"
            teaser:"${teaser}"
            link:"${link}"
            imgUrl:"${imgUrl}"
          
          }
        ) {
          id
          title
          teaser
          link
          imgUrl
        }
      }
      `,
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchBoardItems() {
    return this.apollo.watchQuery({
      query: gql`
        {
          boardItems {
            id
            title
            teaser
            link
            imgUrl
          }
        }
      `,
    });
  }

  //neues WorkWould speichern
  storeWorkWould(username, job, description, phoneNumber) {
    return this.apollo.mutate({
      mutation: gql`
          mutation {
            createWorkWould(
              createWorkWouldInput: {
                username: "${username}"
                job: "${job}"
                description: "${description}"
                phoneNumber: "${phoneNumber}"
              }
            ) {
              id
            }
          }
        `,
    });
  }

  //alle WorkWoulds laden
  fetchWorkWoulds() {
    return this.apollo.watchQuery({
      query: gql`
        {
          workWoulds {
            id
            username
            job
            description
            phoneNumber
          }
        }
      `,
    });
  }

  deleteWorkWouldById(id: string) {
    this.apollo
      .mutate({
        mutation: gql`
        mutation {
          deleteWorkWouldById(id: "${id}") {
            __typename
            job
            phoneNumber
          }
        }
      `,
      })
      .subscribe(
        (res) => {
          console.log('Erfolgreich gelöscht');

          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //neues WorkNeed speichern
  storeWorkNeed(username, job, description, phoneNumber) {
    return this.apollo.mutate({
      mutation: gql`
          mutation {
            createWorkNeed(
              createWorkNeedInput: {
                username: "${username}"
                job: "${job}"
                description: "${description}"
                phoneNumber: "${phoneNumber}"
              }
            ) {
              id
            }
          }
        `,
    });
  }

  //alle WorkNeeds laden
  fetchWorkNeeds() {
    return this.apollo.watchQuery({
      query: gql`
        {
          workNeeds {
            id
            username
            job
            description
            phoneNumber
          }
        }
      `,
    });
  }

  deleteWorkNeedById(id: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation {
            deleteWorkNeedById(id: "${id}") {
              __typename
              job
              phoneNumber
            }
          }
        `,
      })
      .subscribe(
        (res) => {
          console.log('Erfolgreich gelöscht');

          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
