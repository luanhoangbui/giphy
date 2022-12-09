import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { GifsComponent } from './components/gifs/gifs.component';

/**  Routing */
const routes: Routes = [
  {path: '', redirectTo: 'gifs', pathMatch: 'full'},
  {path: 'gifs', component: GifsComponent},
  {path: 'gifs/:id', component: GifDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
