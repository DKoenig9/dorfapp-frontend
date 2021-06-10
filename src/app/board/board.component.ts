import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { BoardContent } from './board-content.model';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  private userSub: Subscription;
  boardContent: BoardContent[] = [];
  userRole: string;
  closeResult = '';
  submitForm: FormGroup;

  constructor(
    private boardService: BoardService,
    private modalService: NgbModal,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    //Userdaten laden
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.userRole = user.userRole;
      } else {
      }
    });

    // this.boardContent = this.boardService.boardContent;
    this.dataStorageService
      .fetchBoardItems()
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.boardContent = result.data.boardItems;
      });

    this.submitForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      teaser: new FormControl(null, Validators.required),
      link: new FormControl(null, Validators.required),
      imgUrl: new FormControl(null, Validators.required),
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    const { teaser, imgUrl, title, link } = this.submitForm.value;

    this.dataStorageService.storeBoardItem(title, teaser, link, imgUrl);

    const boardItem: BoardContent = {
      title,
      teaser,
      link,
      imgUrl,
    };

    this.boardContent = this.boardContent.concat(boardItem);
  }
}
