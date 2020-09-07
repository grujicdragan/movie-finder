import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  toHome() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }

  toSearch() {
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
  }

  constructor() {}

  ngOnInit(): void {}
}
