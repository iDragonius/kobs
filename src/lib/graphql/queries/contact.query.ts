import { gql } from '@apollo/client'

export interface IContactQuery {
  contactInfo: {
    data: {
      attributes: {
        phone: string
        address: string
        email: string
      }
    }
  }
}
export const ContactQuery = (locale: string) => {
  return gql`
    query{
    contactInfo(locale:"${locale}"){
        data{
            attributes{
                phone
                address
                email
            }
        }
    }
}`
}
