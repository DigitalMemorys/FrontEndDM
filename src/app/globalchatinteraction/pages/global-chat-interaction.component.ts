import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Product} from '../../productmanage/model/product.entity';
import {ProductApiService} from '../../productmanage/services/product-api.service';
import {Publishing} from '../model/publishing.entity';
import {CommentE} from '../model/comment.entity';
import {User} from '../../IAM/model/user.entity';
import {CommentApiService} from '../services/comment-api.service';
import {UserApiService} from '../../IAM/services/user-api.service';
import {PublishingApiService} from '../services/publishing-api.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-global-chat-interaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './global-chat-interaction.component.html',
  styleUrls: ['./global-chat-interaction.component.css']
})
export class GlobalChatInteractionComponent implements OnInit {
  name = "GlobalChatInteractionComponent";

  protected user !: User;
  protected publishing !: Publishing;
  protected comment !: CommentE;

  protected userSource : User[] = [];
  protected commentSource : CommentE[] = [];
  protected publishingSource : Publishing[] = [];

  private commentService = inject(CommentApiService)
  private userService = inject(UserApiService)
  private publishingService = inject(PublishingApiService)

  constructor() {
    this.user = new User({});
    this.comment = new CommentE({});
    this.publishing = new Publishing({});
  }

  ngOnInit() {

    this.userService.user$.subscribe(user => {
      this.userSource = user;
    })

    this.commentService.comment$.subscribe(comment => {
      this.commentSource = comment;
    })

    this.publishingService.publishing$.subscribe(publishing => {
      this.publishingSource = publishing;
    })

  }

}
