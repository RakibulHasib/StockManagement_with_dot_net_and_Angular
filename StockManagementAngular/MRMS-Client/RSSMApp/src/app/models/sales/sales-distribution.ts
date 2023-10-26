export class SalesDistribution {
  constructor(
    public sl?: number,
    public concernPerson?: string,
    public productId?: number,
    public price?: number,
    public receiveQuantity?: number,
    public returnQuantity?: number,
    public salesQuantity?: number,
    public totalSalesPrice?: number
  ) { }
}
