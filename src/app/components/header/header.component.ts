import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**  Services */
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**  Variables */
  searchValue: string = ''; // value of search input

  constructor (
    private commonService: CommonService,
    private readonly router: Router,
    ) {}

  // Emit searchValue to gifs
  onSearch() {
    this.commonService.searchGif$.next(this.searchValue);
    this.router.navigate(['gifs']);
  }

  // Reload to homepage
  navigateToHomePage() {
    this.router.navigate(['gifs']).then(() => window.location.reload());
  }
}
