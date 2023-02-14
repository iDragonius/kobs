import { gql } from '@apollo/client'

export type MainInfoProps = {
  data: {
    attributes: {
      title: string
      description: string
      background: {
        data: {
          attributes: {
            url: string
            alternativeText: string
            width: number
            height: number
          }
        }
      }
      locale: string
    }
  }
}

export type OpportunityProps = {
  data: {
    attributes: {
      body: [
        {
          name: string
          value: string
        }
      ]
    }
  }
}

export type DirectionProps = {
  data: {
    attributes: {
      image: {
        data: [
          {
            attributes: {
              alternativeText: string
              url: string
              width: number
              height: number
            }
          }
        ]
      }
      body: [
        {
          direction_element: {
            data: {
              id: number
              attributes: {
                title: string
                content: string
              }
            }
          }
        }
      ]
    }
  }
}
export type DirectionElementProps = {
  id: number
  attributes: {
    title: string
    content: string
  }
}

export interface IHomeQuery {
  mainInfo: MainInfoProps
  opportunity: OpportunityProps
  direction: DirectionProps
}
export const HomeQuery = (locale = 'en') => {
  return gql`
    query {
      mainInfo(locale: "${locale}") {
        data {
          attributes {
            title
            description
            background {
              data {
                attributes {
                  url
                  alternativeText
                  height
                  width
                }
              }
            }
            locale
          }
        }
      }
      opportunity(locale: "${locale}") {
        data {
          attributes{
            body{
              ... on ComponentHomeOpportunity {
                name
                value
              }
            }
          }
        }
      }
      direction{
        data{
          attributes{
            image{
              data{
                attributes{
                  url
                  alternativeText
                  width
                  height
                }
              }
            }
            body{
              ...on ComponentHomeDirection{
                direction_element{
                  data{
                    id
                    attributes{
                      title
                      content
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
