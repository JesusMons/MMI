import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Aside } from './components/layout/aside/aside';
import { Content } from './components/layout/content/content';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Login } from './components/login/login';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, Aside, Content, Header, Footer, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MMI');
}
