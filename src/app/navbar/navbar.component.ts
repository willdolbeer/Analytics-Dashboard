import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, MenubarModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  items =[{label: 'Marketing Analytics Dashboard'}];
}
