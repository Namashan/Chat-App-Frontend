import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Pontosvessző 
  message: string = '';
  isNameTaken : boolean = false;

  constructor(private dataService: DataService, private router: Router) {}
  
  ngOnInit(): void {
    this.dataService.socketClient.on("connect", () => {
      this.dataService.socketClient.on("logged in" + this.dataService.socketClient.id, (response : string) => {
        const responseParts = response.split(";");
        localStorage.setItem("uuid", responseParts[1]);
        this.dataService.setUserData(responseParts[0]);
        this.dataService.setLoggedIn(true);
        this.router.navigate(['/chat']); 
      });

      this.dataService.socketClient.on("existing user", (response) => {
        this.isNameTaken = true;
      });

      this.loginUser("");
    });

  }



  loginUser(username: string) {
    this.isNameTaken = false; 
    const uuid : string | null = localStorage.getItem("uuid");

    if (!!username && !!uuid) {
      this.dataService.socketClient.emit("login", `${username};${uuid}`);
    } else if (!!username && !uuid) {
      this.dataService.socketClient.emit("login", `${username};`);
    } else if (!username && !!uuid) {
      this.dataService.socketClient.emit("login", `;${uuid}`);
    }
    
  }
}
