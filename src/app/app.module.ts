import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { DeclaractivePostComponent } from './pages/declaractive-post/declaractive-post.component';
import { AltPostComponent } from './pages/alt-post/alt-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AddPostComponent } from './components/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    HomeComponent,
    DeclaractivePostComponent,
    AltPostComponent,
    SinglePostComponent,
    LoaderComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,useClass: LoaderInterceptor,multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
