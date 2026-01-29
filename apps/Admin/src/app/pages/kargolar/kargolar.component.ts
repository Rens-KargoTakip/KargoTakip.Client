import { HttpClient } from '@angular/common/http';
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
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import {
  FlexiGridFilterDataModel,
  FlexiGridModule,
  FlexiGridService,
  StateModel,
} from 'flexi-grid';
import { BreadcrumbService } from '../../servcies/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';
import { RouterLink } from '@angular/router';
import { API } from '../../constants';
import { FlexiToastService } from 'flexi-toast';
import { KargoModel } from '../../models/kargo.model';
import { ResultModel } from '../../models/result.model';
import { CommonModule } from '@angular/common';
import { FlexiPopupModule } from 'flexi-popup';
import { FlexiButtonComponent } from 'flexi-button';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    FormsModule,
    RouterLink,
    FlexiGridModule,
    BlankComponent,
    FlexiButtonComponent,
    FlexiPopupModule,
    CommonModule,
    FlexiPopupModule,
  ],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KargolarComponent {
  result = resource({
    request: () => this.state(),
    loader: async () => {
      let endpoint = `${API}/odata/kargolar?$count=true`;
      const odataEndpoint = this.#grid.getODataEndpoint(this.state());
      endpoint += '&' + odataEndpoint;
      var res = await lastValueFrom(
        this.#http.get<ODataModel<any[]>>(endpoint)
      );

      return res;
    },
  });
  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = linkedSignal(() => this.result.isLoading());
  readonly state = signal<StateModel>(new StateModel());
  isPopupVisible = false;
  readonly popupLoading = signal<boolean>(false);

  readonly durumFilterData = signal<FlexiGridFilterDataModel[]>([
    {
      name: 'Hazırlanıyor',
      value: 0,
    },
    {
      name: 'Araca teslim edildi',
      value: 1,
    },
  ]);

  readonly durumUpdateRequest = signal<{ id: string; durumValue: number }>({
    id: '',
    durumValue: 0,
  });

  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);
  #breadcrumb = inject(BreadcrumbService);
  #toast = inject(FlexiToastService);

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
  }

  dataStateChange(event: StateModel) {
    this.state.set(event);
  }
  async exportExcel() {
    let endpoint = `${API}/odata/kargolar?$count=true`;
    var res = await lastValueFrom(this.#http.get<ODataModel<any[]>>(endpoint));
    this.#grid.exportDataToExcel(res.value, 'Kargo Listesi');
  }

  delete(item: KargoModel) {
    const endpoint = `${API}/kargolar/${item.id}`;
    this.#toast.showSwal(
      'Kargoyu Sil ?',
      `Aşağıdaki bilgileri içeren kargoyu silmek istediğinize emin misiniz ?<br/>
      <span>Gönderen</span> <b>${item.gonderenFullName}</b> <br/> <span>Alıcı</span> <b>${item.aliciFullName}</b>`,
      () => {
        this.loading.set(true);
        this.#http.delete<ResultModel<string>>(endpoint).subscribe((res) => {
          this.#toast.showToast('Bilgi', res.data!, 'info');
          this.result.reload();
        });
      }
    );
  }

  getDurumClass(durum: string) {
    if (durum === 'Hazırlanıyor') return 'alert-warning';

    return '';
  }

  getAgirlikTotal() {
    const agirliklar = this.data().map((p) => p.agirlik);
    let total = 0;
    agirliklar.forEach((e) => (total += e));
    return total;
  }

  openUpdateDurumPopup(item: KargoModel) {
    this.durumUpdateRequest().id = item.id;
    this.durumUpdateRequest().durumValue = item.kargoDurumValue;
    this.isPopupVisible = true;
  }

  updateDurum() {
    this.popupLoading.set(true);
    this.#http
      .put<ResultModel<string>>(
        `${API}/kargolar/update-status`,
        this.durumUpdateRequest()
      )
      .subscribe((res) => {
        this.popupLoading.set(false);
        this.isPopupVisible = false;
        this.result.reload();
        this.#toast.showToast('Başarılı', res.data!, 'info');
      });
  }
}
