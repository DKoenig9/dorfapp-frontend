import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat: BehaviorSubject<Array<Chat>> = new BehaviorSubject([
    {
      title: 'Test',
      username: 'Daniel Baumhoff',
      category: 'Feuerwehr',
      message: 'lorem ipsum liuesfhgoiuzsfeghopiuzzghsefpoiuzghesfopiuzgesf',
      createdAt: new Date(Date.now()),
      img: 'https://images.unsplash.com/photo-1575507371089-cd0a12c5aae9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      color: 'red',
    },
    {
      title: 'Test2',
      username: 'Denis Heimes',
      category: 'Sport',
      message:
        'Heute um 13:00 Uhr findet das Fußballturnier am Kleinspielfeld statt',
      createdAt: new Date(Date.now()),
      img: 'https://images.unsplash.com/photo-1473976345543-9ffc928e648d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb3RiYWxsfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      color: 'red',
    },
    {
      title: 'Test3',
      username: 'Denis Heimes',
      category: 'Sport',
      message:
        'Heute um 13:00 Uhr findet das Fußballturnier am Kleinspielfeld statt',
      createdAt: new Date(Date.now()),
      img: null,
      color: 'blue',
    },
  ]);

  updateChat(data) {
    this.chat.next(data);
  }

  addChat(dataObj: Chat) {
    const currentValue = this.chat.value;
    const updatedValue = [dataObj ,...currentValue];

    this.chat.next(updatedValue);
  }
}
