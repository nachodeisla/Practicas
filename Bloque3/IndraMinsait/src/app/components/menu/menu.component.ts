import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  goToUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  goToPolizas() {
    this.router.navigate(['/polizas']);
  }
}




