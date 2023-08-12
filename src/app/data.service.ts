import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Felhasználó neve
  private userData: string = ''; 

  private loggedIn : boolean = false;
  
  // Üzenetek tárolása
  private message: string[] = []; 

  // Privát üzenetek tárolása
  private privateMessages: { [key: string]: string[] } = {}; 

  // Felhasználónevek tárolása
  private usernames: string[] = []; 

  public socketClient = io("http://localhost:3000");

  constructor(private router: Router) { }

  // Felhasználó adatainak tárolása
  setUserData(username: string) {
    this.userData = username;
    this.usernames.push(username);
  }

  // Felhasználónevet adja vissza
  getUsername(): string {
    return this.userData;
  }

  // Üzenet hozzáadása a tárolt üzenetekhez
  addMessage(message: string) {
    this.message.push(message);
  }

  // Tárolt üzenetek lekérdezése
  getMessages(): string[] {
    return this.message;
  }

  // Privát üzenetek elmentése user-ek szerint
  addPrivateMessage(user: string, message: string) {
    // Ellenörizzük, hogy létezik-e már üzenet az adott user-nél
    if (!this.privateMessages[user]) { 
      // Ha nincs üzenet, akkor hozzáadunk egy üres tömböt az adott felhasználóhoz, igy egy üres üzenetek tömbje lesz a felhasználónak, aki még nem kapott üzenetet
      this.privateMessages[user] = []; 
    }
    // Ha már van üzenete, akkor csak bővitjük, az üzenetek tömbjét
    this.privateMessages[user].push(message); 
  }

  getPrivateMessages(user: string): string[] {
    return this.privateMessages[user] || [];
  }

  // Megszüri a "usernames" tömbből az üres elemeket
  getUsersWithNames(): string[] {
    return this.usernames.filter(username => username.trim() !== '');
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(loggedIn : boolean) {
    this.loggedIn = loggedIn;
  }
}
