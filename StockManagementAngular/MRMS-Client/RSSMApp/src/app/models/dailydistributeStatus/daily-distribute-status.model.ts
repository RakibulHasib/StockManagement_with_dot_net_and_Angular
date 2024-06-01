export interface StatusDetail{
    companyName?: string,
    status?: number
}

export interface DailyDistributeStatus{
    concernPersonId: number,
    concernPersonName: string,
    statusDetail?: StatusDetail[]
}

export interface SalesDistributeAvailabityDto {
    today: string,
    lastDistribute?: LastSalesDistributeInfoDto
}

export interface LastSalesDistributeInfoDto {
    lastDistributeStatus: number;
    lastDistributeDay: string
}