import { Injectable, signal } from '@angular/core';
import { BreadCrumbModel } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  data = signal<BreadCrumbModel[]>([]);

}
