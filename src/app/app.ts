import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatIcon,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Frontend-WebApplication-DigitalMemory';
  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;
  activeOption: string = '';
  isSidenavOpen = true;

  constructor(
    private observer: BreakpointObserver,
    private router: Router
  ) {
  }

  otherOptions = [
    { icon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', path: '/home', title: 'HOME' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/8189/8189068.png', path: '/productManage', title: 'PRODUCTS' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/3514/3514491.png', path: '/shoppingCart', title: 'CART' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/1011/1011322.png', path: '/globalChat', title: 'GLOBAL CHAT' },
  ];

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']).subscribe((response) => {
      if (response.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
  }

  setActiveOption(option: string) {
    this.activeOption = option;
  }

}
