import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
  data = signal<KargoModel>(new KargoModel());
  loading = signal<boolean>(false);

  #breadcrumb = inject(BreadcrumbService);
  #http = inject(HttpClient);
  #toast = inject(FlexiToastService);
  #location = inject(Location);
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
    this.#breadcrumb.addBreadcrumbLink('Kargolar', '/kargolar/add', 'add');
  }
  save(form: NgForm) {
    if (form.valid) {
      const endpoint = `${API}/kargolar`;
      this.loading.set(true);
      this.#http
        .post<ResultModel<string>>(endpoint, this.data())
        .subscribe((res) => {
          this.#toast.showToast('Başarılı', res.data!, 'success');
          this.loading.set(false);
          this.#location.back();
        });
    } else {
      this.#toast.showToast(
        'Uyarı',
        'Lütfen zorunlu alanları tekrardan kontrol ediniz.',
        'error'
      );
    }
  }
}
