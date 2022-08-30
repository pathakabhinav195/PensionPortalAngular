import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PentiondetailsComponent } from './pentiondetails/pentiondetails.component';

const routes: Routes = [
  {path:'details',component:PentiondetailsComponent},
  {path:'',component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
