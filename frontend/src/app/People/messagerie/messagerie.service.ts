import { Messages } from './messages';
import { Conversations } from './conversations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  private socket = io('http://localhost:3000');
  // private socket = io('http://localhost:7777/socket');

  private urlapi = 'http://localhost:8800';
  // private urlapi = 'http://localhost:7777/messagerie';

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  messageList: any[] = [];

  constructor(private http: HttpClient) { }

  public sendMessage(senderId: number, receiverId: number, message: string,conversatioId:string) {
    this.socket.emit("sendMessage", { senderId, receiverId, message });
    const data = {
      "conversationId": conversatioId,
      "text": message
    }
    this.http.post(this.urlapi + '/api/messages', data).subscribe(
      res => console.log(res)
    )
  }

  public getNewMessage = () => {
    this.socket.on("getMessage", (object) => {
      object["createdAt"]= new Date()
      const info={
        "sender":object.senderId,
        "message":object.message,
        "createdAt":object.createdAt,
      }
      this.messageList.push(info)
      return object.message;
    });
    return this.message$.asObservable();
  };

  public adduser(userid: number) {
    this.socket.emit("addUser", userid);
  }

  getMessages(model): Observable<Messages[]> {
    return this.http.get<Messages[]>(this.urlapi + '/api/messages/' + model)
  }

  getConversations(): Observable<Conversations[]> {
    return this.http.get<Conversations[]>(this.urlapi + '/api/conversations')
  }

  addConversation(model){
    this.http.post(this.urlapi+"/api/conversations",model).subscribe(
      res => console.log(res)
    )
  }

}
