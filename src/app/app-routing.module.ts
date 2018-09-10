import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchWindowComponent } from './search-window/search-window.component';
import { AddNameComponent } from './add-name/add-name.component';

const appRoutes: Routes = [
    { path: 'search', component: SearchWindowComponent },
    { path: '', component: AddNameComponent}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}