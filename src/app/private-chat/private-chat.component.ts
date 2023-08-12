import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

    // Kiválasztott címzett
    selectedUser: string = ''; 
    // Privát üzenet
    privateMessage: string = '';
    // Címzett felhasználók listája
    users: any[] = []; 
    // Pontosvessző 
    message: string = '';
    
    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
      if (!this.dataService.getLoggedIn()) {
        this.router.navigate(["/"]);
        return;
      }

      this.dataService.socketClient.on('get all private message client' + localStorage.getItem("uuid"), (response) => {
        console.log(response);
      })

      this.dataService.socketClient.on('active users client', (response) => {
        this.users.push(...response);
      });

      this.dataService.socketClient.emit("active users");

      this.dataService.socketClient.emit("get all active users");
    }

    sendPrivateMessage() {
      if (this.privateMessage.trim() !== '' && this.selectedUser) {
        // Privát üzenet összeállitása (template literal)
        const message = `${this.dataService.getUsername()} (privát): ${this.privateMessage}`; 
        // Üzenet hozzáadása egy adott felhasználóhoz
        this.dataService.addPrivateMessage(this.selectedUser, message); 
        // Mező ürítése
        this.privateMessage = ''; 
      }
    }

    changeRecipient(e : Event) {
      console.log("changed" + e)
    }

    // Fő oldalra navigál
    messagesButton() {
      this.router.navigate(['/chat']);
    }
}
