export class Dailydatadbmodel {
  constructor(
    public stockId?:number,
    public companyName?: string,
    public creationTime?: Date,
    public totalSalesQuantity?: number,
    public totalAmount?: number
  ) { }
}
