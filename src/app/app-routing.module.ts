import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { MainComponent } from './main/main.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { WorkAllComponent } from './work/work-all/work-all.component';
import { WorkComponent } from './work/work.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

//Routing lieber auf deutsch, weils ja sowieso alles deutschsprachig ist?
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'auth', component: AuthComponent },

  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  {
    path: 'work',
    component: WorkComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'all', component: WorkAllComponent, canActivate: [AuthGuard] },
    ],
  },

  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { rule: 'admin' },
  },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
