export class DailyDistributionModel {
    constructor(
        public salesDistributeId?:number,
        public concernPerson?:string,
        public companyName?:string,
        public totalReceive?:number,
        public totalReturn?:number,
        public totalSales?:number,
        public totalPrice?:number,
        public grandTotal?:number,
        public creationTime?:Date
      ) { }
}
