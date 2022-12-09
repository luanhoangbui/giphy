import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { GifsComponent } from './components/gifs/gifs.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { ObserveElementDirective } from './directives/observe-element.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GifsComponent,
    GifDetailComponent,
    ObserveElementDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
