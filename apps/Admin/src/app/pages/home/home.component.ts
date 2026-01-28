import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLinkWithHref } from "@angular/router";
import { BreadCrumbModel } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../servcies/breadcrumb.service';

@Component({
  imports: [RouterLinkWithHref],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
 #breadcrumb = inject(BreadcrumbService);

  /**
   *
   */
  constructor() {
    const breadcrumbs: BreadCrumbModel[] = [
      {
        name: 'Ana Sayfa',
        routerLink: '/',
        icon: 'home',
      },
    ];
    this.#breadcrumb.data.set(breadcrumbs);
  }
}
