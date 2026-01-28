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
import { FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';
import { BreadcrumbService } from '../../servcies/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';
import { RouterLink } from '@angular/router';
import { FlexiButtonComponent } from 'flexi-button';
import { API } from '../../constants';
import { FlexiToastService } from 'flexi-toast';
import { KargoModel } from '../../models/kargo.model';
import { ResultModel } from '../../models/result.model';

@Component({
  imports: [RouterLink, FlexiGridModule, BlankComponent, FlexiButtonComponent],
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
}
