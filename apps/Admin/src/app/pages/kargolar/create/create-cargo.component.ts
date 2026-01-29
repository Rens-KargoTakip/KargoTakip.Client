import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { KargoModel } from '../../../models/kargo.model';
import { FormsModule, NgForm } from '@angular/forms';
import BlankComponent from '../../../components/blank/blank.component';
import { BreadcrumbService } from '../../../servcies/breadcrumb.service';
import { FlexiStepperModule } from 'flexi-stepper';
import { FormValidateDirective } from 'form-validate-angular';
import { NgxMaskDirective } from 'ngx-mask';
import { API } from '../../../constants';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../../models/result.model';
import { FlexiToastService } from 'flexi-toast';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [
    FormsModule,
    BlankComponent,
    FlexiStepperModule,
    FormValidateDirective,
    NgxMaskDirective,
  ],
  templateUrl: './create-cargo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateCargoComponent {
  readonly id = signal<string>('');

  readonly data = linkedSignal(() => this.result?.value() ?? new KargoModel());

  readonly loading = linkedSignal(() => this.result?.isLoading() ?? false);
  readonly pageTitle = computed(() =>
    this.id() ? 'Kargo Güncelle' : 'Kargo Ekle'
  );

  readonly result = resource({
    request: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<ResultModel<KargoModel>>(`${API}/kargolar/${this.id()}`)
      );
      return res.data!;
    },
  });

  readonly #breadcrumb = inject(BreadcrumbService);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #location = inject(Location);
  readonly #activated = inject(ActivatedRoute);
  /**
   *
   */
  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.addBreadcrumbLink(
      'Kargolar',
      '/kargolar',
      'quick_reorder'
    );
    this.#activated.params.subscribe((res) => {
      {
        if (res['id']) {
          this.id.set(res['id']);
          this.#breadcrumb.addBreadcrumbLink(
            this.id(),
            `/kargolar/edit/${this.id()}`,
            'edit'
          );
        } else {
          this.#breadcrumb.addBreadcrumbLink(
            'Kargolar',
            '/kargolar/add',
            'add'
          );
        }
      }
    });
  }
  save(form: NgForm) {
    if (form.valid) {
      const endpoint = `${API}/kargolar`;
      this.loading.set(true);
      if (this.id()) {
        this.#http
          .put<ResultModel<string>>(endpoint, this.data())
          .subscribe((res) => {
            this.#toast.showToast('Başarılı', res.data!, 'info');
            this.loading.set(false);
            this.#location.back();
          });
      } else {
        this.#http
          .post<ResultModel<string>>(endpoint, this.data())
          .subscribe((res) => {
            this.#toast.showToast('Başarılı', res.data!, 'success');
            this.loading.set(false);
            this.#location.back();
          });
      }
    } else {
      this.#toast.showToast(
        'Uyarı',
        'Lütfen zorunlu alanları tekrardan kontrol ediniz.',
        'error'
      );
    }
  }
}
