export interface TreasurySheet {
  _id: string,
  year: number,
  month: number,
  ended: boolean,
  beginCrown: number,
  endCrown: number,
  transactions: [CrownTransaction],
  earnings: Earnings,
  losses: Losses,
  investments: [Investment]
}

export interface Earnings {
  taxes: [CrownTransaction],
  common: [CrownTransaction],
  other: [CrownTransaction]
}

export interface Losses {
  wages: CrownTransaction,
  maintenance: CrownTransaction,
  commercialPurchases: CrownTransaction,
  other: [CrownTransaction]
}

export interface CrownTransaction {
  _id: string,
  name: string,
  value: number,
  details: string
}

export interface Investment {
  _id: string,
  name: string,
  beginMonth: number,
  beginYear: number,
  duration: number,
  cost: number,
  ended: boolean
}
