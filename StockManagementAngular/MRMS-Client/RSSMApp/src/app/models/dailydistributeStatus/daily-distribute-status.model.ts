export interface StatusDetail{
    companyName?: string,
    status?: number
}

export interface DailyDistributeStatus{
    concernPersonId: number,
    concernPersonName: string,
    statusDetail?: StatusDetail[]
}