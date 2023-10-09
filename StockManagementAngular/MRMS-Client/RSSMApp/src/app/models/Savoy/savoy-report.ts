export class SavoyReportModel {
  constructor(
    public savoyIceCreamMasterId?: number,
    public savoyIceCreamId?: number,
    public productId?: number,
    public productName?: string,
    public price?: number,
    public companyId?: number,
    public eja?: number,
    public newProduct?: number,
    public total?: number,
    public salesQuantity?: number,
    public totalAmount?: number,
    public dumping?: number,
    public receive?: number,
    public remaining?: number,
    public createdDate?: Date,
  ) { }
}
