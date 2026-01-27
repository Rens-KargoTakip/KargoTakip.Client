import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLinkWithHref } from "@angular/router";

@Component({
  imports: [RouterLinkWithHref],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {

}
