type Form = {
  aviaVendorDescription: string
  availableAviaCompanies: Array<{ text: string }>
  vendorKey: string
  companyType: string
  secretKey: string | null
}

export type { Form }
