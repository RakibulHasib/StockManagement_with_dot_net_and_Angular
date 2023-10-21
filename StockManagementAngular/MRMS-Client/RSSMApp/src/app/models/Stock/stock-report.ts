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
  public salesQuantity?: number,
  public totalAmount?: number,
  public dumping?: number,
  public receive?: number,
  public remaining?: number
  ) { }
}



export class stockReportDataModel {
  constructor(
    public stockId?: number,
    public creationTime?: Date,
    public companyName?: string,
    public reportDetails?: StockReportModel[]
  ) { }

}
