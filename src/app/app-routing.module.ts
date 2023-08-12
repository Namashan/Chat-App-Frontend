import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';

const routes: Routes = [
  // Betöltő oldal
  { path: '', component: LoginComponent }, 
  // Chat oldal hozzáadása
  { path: 'chat', component: ChatComponent },
  // Private Chat oldal hozzáadása
  { path: 'private', component: PrivateChatComponent },
  // További útvonalak...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
