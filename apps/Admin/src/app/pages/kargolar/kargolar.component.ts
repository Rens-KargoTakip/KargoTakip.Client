import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';

@Component({
  imports: [RouterLink, FlexiGridModule],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KargolarComponent {
  result = resource({
    request: () => this.state(),
    loader: async () => {
      let endpoint = 'https://localhost:7236/odata/kargolar?$count=true';
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
  readonly loading = computed(() => this.result.isLoading());
  readonly state = signal<StateModel>(new StateModel());

  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);

  dataStateChange(event: StateModel) {
    this.state.set(event);
  }
}
