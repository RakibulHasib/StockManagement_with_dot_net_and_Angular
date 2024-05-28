export class SalesDistribution {
  constructor(
    public sl?: number,
    public productId?: number,
    public price?: number,
    public stock?: number,
    public remaining?: number,
    public receiveQuantity?: number,
    public returnQuantity?: number,
    public totalQuantity?: number,
    public salesQuantity?: number,
    public totalSalesPrice?: number
  ) { }
}
