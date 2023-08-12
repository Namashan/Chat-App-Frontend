import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { SemicolonRestrictionDirective } from './semicolon-restriction.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    PrivateChatComponent,
    SemicolonRestrictionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
