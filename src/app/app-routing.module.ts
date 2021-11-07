import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltPostComponent } from './pages/alt-post/alt-post.component';
import { DeclaractivePostComponent } from './pages/declaractive-post/declaractive-post.component';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'declaractive-post', component: DeclaractivePostComponent },
  { path: 'alt-post', component: AltPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
