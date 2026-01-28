import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../servcies/breadcrumb.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class LayoutComponent {
  #breadcrumb = inject(BreadcrumbService);

  breadcrumbs = computed(() => this.#breadcrumb.data());
}
