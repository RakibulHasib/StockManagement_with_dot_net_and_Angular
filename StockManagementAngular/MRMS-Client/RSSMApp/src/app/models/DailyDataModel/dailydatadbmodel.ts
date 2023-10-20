export class Dailydatadbmodel {
  constructor(
    public stockId?:number,
    public CreationTime?: Date,
    public TotalSalesQuantity?: number,
    public TotalAmount?: number
  ) { }
}
