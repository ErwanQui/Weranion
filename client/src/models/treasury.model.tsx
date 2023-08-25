export interface TreasurySheet {
  _id: string,
  year: number,
  month: number,
  ended: boolean,
  beginCrown: number,
  endCrown: number,
  transactions: [CrownTransaction],
  earnings: {
    taxes: [CrownTransaction],
    common: [CrownTransaction],
    other: [CrownTransaction]
  },
  losses: {
    wages: CrownTransaction,
    maintenance: CrownTransaction,
    commercialPurchases: CrownTransaction,
    other: [CrownTransaction]
  },
  investments: [Investment]
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
