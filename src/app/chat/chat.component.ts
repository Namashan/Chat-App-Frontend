import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // Üzenetek tömbje
  messages: any[] = []; 
  // Új üzenet mező
  newMessage: string = '';
  // Pontosvessző 
  message: string = '';

  constructor(private dataService: DataService, private router: Router) {}
  
  sendMessage() {
    
    // Akkor lesz igaz, ha newMessage változó nem üres és tartalmaz értelmes szöveget.
    if (this.newMessage.trim() !== '') {

      // Üzenet mentése a szolgáltatásban
      this.dataService.socketClient.emit("new public message", { fromId: localStorage.getItem("uuid"), message: this.newMessage });

      // Mező ürítése
      this.newMessage = ''; 
    }

  }
  // A komponens létrejöttekkor inicializálódik és automatikusan meghivódik a "ngOnInit()" függvény.
  ngOnInit(): void { 
    if (!this.dataService.getLoggedIn()) {
      this.router.navigate(["/"]);
      return;
    }

    this.dataService.socketClient.on("all messages client", (results) => {
      this.messages.push(...results);
    })

    this.dataService.socketClient.on("new public message client", (results) => {
      this.messages.push(results[0]);
    })

    // Üzenetek betöltése
    this.getMessages();
  }

  getMessages() {
    this.dataService.socketClient.emit("get all messages");
  }

  // Privát chat oldalra navigál
  privateMessagesButton() {
    this.router.navigate(['/private']);
  }
}
