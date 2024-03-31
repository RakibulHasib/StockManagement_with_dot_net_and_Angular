export class Stock {
    constructor(
        public sl?: number,
        public stockId?: number,
        public stockDetailsId?: number,
        public productId?: number,
        public productName?: string,
        public price?:number,
        public companyId?: number,
        public companyName?: string,
        public eja?: number,
        public newProduct?: number,
        public total?: number,
        public salesQuantity?: number,
        public totalAmount?: number,
        public damageQuantity?: number,
        public createdDate?: Date,
    ){}
}
