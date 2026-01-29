export class KargoModel {
  id: string = '';
  gonderen: KargoKisiModel = new KargoKisiModel();
  gonderenFullName: string = '';
  alici: KargoKisiModel = new KargoKisiModel();
  aliciFullName: string = '';
  address: KargoTeslimAddress = new KargoTeslimAddress();
  kargoInformations: KargoInformations = new KargoInformations();
  kargoDurumValue: number = 0;
}
export class KargoKisiModel {
  firstName: string = '';
  lastName: string = '';
  nationalId: string = '';
  email: string = '';
  phoneNumber: string = '';
}

export class KargoTeslimAddress {
  city: string = '';
  town: string = '';
  mahalle: string = '';
  street: string = '';
  fullAddress: string = '';
}
export class KargoInformations {
  kargoTipiValue: number = 1;
  agirlik: number = 1;
}
