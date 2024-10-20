export class StockReportModel {
  constructor(
  public stockDetailsId?: number,
  public productId?: number,
  public productName?: string,
  public price?: number,
  public companyId?: number,
  public eja?: number,
  public restockQuantity?: number,
  public totalQuantity?: number,
  public totalPrice?: number,
  public salesQuantity?: number,
  public returnQuantity?: number,
  public returnPrice?: number,
  public damageQuantity?: number,
  public totalAmount?: number
  ) { }
}



export class stockReportDataModel {
  constructor(
    public stockId?: number,
    public creationTime?: Date,
    public companyID?: number,
    public companyName?: string,
    public totalPrice?: number,
    public damageAmount?: number,
    public afterDamagePrice?: number,
    public srcommission?: number,
    public afterSrCommission?: number,
    public reportDetails?: StockReportModel[]
  ) { }

}
