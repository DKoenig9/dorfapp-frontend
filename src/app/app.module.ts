import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkComponent } from './work/work.component';
import { WorkAllComponent } from './work/work-all/work-all.component';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './auth/auth.component';
import { GraphQLModule } from './graphql.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ToastsContainer } from './shared/toasts/toasts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    MainComponent,
    WorkComponent,
    WorkAllComponent,
    AuthComponent,
    UserSettingsComponent,
    AdminPanelComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
