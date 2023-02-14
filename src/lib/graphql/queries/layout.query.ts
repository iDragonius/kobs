import { gql } from '@apollo/client'
import { LanguagesQueryEnum } from '@/config'

export type NavigationElementType = {
  label: string
  path: string
  status: boolean
}
export interface INavigationElement {
  id: number
  label: string
  path: string
  status: boolean
  navigation_elements: {
    data: [
      {
        attributes?: NavigationElementType
      }
    ]
  }
}
export interface ILayoutQuery {
  navigationMenu: {
    data: {
      attributes: {
        navigation: [
          {
            id: number
            label: string
            path: string
            status: boolean
            navigation_elements: {
              data: [
                {
                  attributes?: NavigationElementType
                }
              ]
            }
          }
        ]
      }
    }
  }
  socialNetwork: {
    data: {
      attributes: {
        body: [
          {
            id: number
            name: string
            url: string
            icon: {
              data: {
                attributes: {
                  url: string
                  alternativeText: string
                  width: number
                  height: number
                }
              }
            }
          }
        ]
      }
    }
  }
}
export const LayoutQuery = (locale = 'en') => {
  return gql`
  query {
    navigationMenu(locale: "${locale}") {
      data {
        attributes {
          navigation {
            ... on ComponentMenuDropdown {
              id
              label
              path
              status
              navigation_elements {
                data {
                  attributes {
                    path
                    label
                    status
                  }
                }
              }
            }
          }
        }
      }
    }
    socialNetwork {
      data{
        attributes{
          body{
            ... on ComponentFooterSocialNetwork {
              id
              name
              url
              icon {
                data{
                  attributes{
                    url
                    alternativeText
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    }

  }
`
}
