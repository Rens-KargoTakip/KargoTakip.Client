export class KargoModel {
  gonderen: KargoKisiModel = new KargoKisiModel();
  alici: KargoKisiModel = new KargoKisiModel();
  address: KargoTeslimAddress = new KargoTeslimAddress();
  kargoInformations: KargoInformations = new KargoInformations();
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
  kargoInformations: string = '';
  kargoTipiValue: number = 1;
  agirlik: number = 1;
}
