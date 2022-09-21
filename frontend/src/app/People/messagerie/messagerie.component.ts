import { Userinfo } from './../../SharedComponents/profile/userinfo';
import { Messages } from './messages';
import { MessagerieService } from './messagerie.service';
import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conversations } from './conversations';
import { NgForm } from '@angular/forms';

import { AuthService } from './../../auth/auth.service';


@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit, AfterContentChecked  {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  searchTerm: string;
  term: string;

  newMessage!: string;
  senderid: number;
  messageList: any[] = [];

  conversations: Conversations[];
  messages: Messages[] = []
  user: any;
  receiverId: any

  idconvert: any = null;
  userinfo: Userinfo


  constructor(private messagerie: MessagerieService, private AuthService: AuthService, private ref: ChangeDetectorRef) {

    this.AuthService.getinfouser().subscribe(data => {
      this.userinfo = data;
      console.log(this.userinfo.id);
      this.senderid = this.userinfo.id
      this.messagerie.adduser(this.senderid);
    });
    
  }

  ngOnInit(): void {
    this.messagerie.getConversations().subscribe(data => {
      this.conversations = data
      this.conversations.sort(function (a, b) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }).reverse()
    });
    this.messagerie.getNewMessage().subscribe((message: string) => {
      this.messageList = this.messagerie.messageList;
    })
    this.scrollToBottom();
  }

  
  ngAfterContentChecked() {
    this.scrollToBottom();
    this.ref.detectChanges();
  }
  opencnv(username: String, idconv: number, iduser: number) {
    this.user = username;
    this.idconvert = idconv;
    this.receiverId = iduser
    this.getmessage(idconv)
    
  }
  getmessage(conv: number) {

    this.messagerie.getMessages(conv).subscribe(data => {
      this.messages = data
      this.messages.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }).reverse();
    })
  }
  onSubmit(f: NgForm) {
    this.messagerie.sendMessage(this.senderid, this.receiverId, f.value["text"], this.idconvert);
    this.newMessage = '';
    const nvmess = {
      "sender": this.senderid,
      "message": f.value["text"],
      "createdAt": new Date(),
    }
    this.messageList.push(nvmess)
    f.reset()
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
