import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { BreadCrumbModel } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../servcies/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';

@Component({
  imports: [BlankComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  #breadcrumb = inject(BreadcrumbService);

  /**
   *
   */
  constructor() {
    this.#breadcrumb.reset();
  }
}
