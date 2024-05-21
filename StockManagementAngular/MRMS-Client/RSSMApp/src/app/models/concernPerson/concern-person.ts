export class ConcernPerson {
    constructor(
        public concernPersonId?: number,
        public concernPersonName?: string,
        public isDeleted?: number,
      ) { }
}

export interface ConcernPersonMapping{
  id: number,
  concernPersonId: number,
  companyId: number,
  companyName: string
}
