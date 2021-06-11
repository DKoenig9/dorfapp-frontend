import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userSub: Subscription;
  user: User;
  userRole: string;
  chatForm: FormGroup;
  chat: Chat[] = [];
  chatSub: Subscription;
  categories = ['Feuerwehr', 'Schützenverein', 'Tambourkorps', 'Sport'];
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userRole = user.userRole;
      } else {
      }
    });

    this.chatSub = this.chatService.chat.subscribe((chat) => {
      this.chat = chat;
    });

    this.chatForm = new FormGroup({
      title: new FormControl(null),
      category: new FormControl('Schützenverein'),
      message: new FormControl(null),
      img: new FormControl(null),
      color: new FormControl(null),
    });
  }

  onSubmit() {
    const { title, message, category, img, color } = this.chatForm.value;
    const newMessage: Chat = {
      title,
      username: this.user.username,
      category,
      message,
      createdAt: new Date(Date.now()),
      img,
      color,
    };
    this.chatService.addChat(newMessage);
  }
}
