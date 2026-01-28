import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../servcies/breadcrumb.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class LayoutComponent {
  #breadcrumb = inject(BreadcrumbService);
  #date = inject(DatePipe);

  breadcrumbs = computed(() => this.#breadcrumb.data());
  time = signal<string>('');
  /**
   *
   */
  constructor() {
    setInterval(() => {
      this.time.set(this.#date.transform(new Date(), 'dd.MM.yyyy HH.mm.ss')!);
    }, 1000);
  }
}
