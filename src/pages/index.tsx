import Head from 'next/head'
import { HomeQuery, IHomeQuery } from '@/lib/graphql/queries'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import Image from 'next/image'
import * as process from 'process'
import ReactMarkdown from 'react-markdown'
import { LanguagesQueryEnum } from '@/config'
import Opportunity from '@/components/pages/home/opportunity/Opportunity'
import Direction from '@/components/pages/home/direction/Direction'
import MoreInfo from '@/components/ui/more-info-button/MoreInfo'
import Video from '@/components/pages/home/video/Video'
interface IHome {
  data: IHomeQuery
}
export default function Home({ data }: IHome) {
  const serverLink = process.env.SERVER_URL

  return (
    <>
      <Head>
        <title>KOBSKA</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={''}>
        <div className='absolute -z-10 left-0 top-0'>
          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)'
            }}
            className={
              'w-full h-[800px]  absolute top-0 left-0 z-[4] select-none'
            }
          />
          <Image
            src={`${serverLink}${data.mainInfo.data.attributes.background.data.attributes.url}`}
            alt={'test'}
            className={''}
            style={{ objectFit: 'cover', width: '100vw', height: '800px' }}
            width={
              data.mainInfo.data.attributes.background.data.attributes.width
            }
            height={300}
            priority={true}
          />
        </div>
        <div
          className={
            'min-h-[669px] mb:min-h-[612px] flex flex-col justify-between'
          }
        >
          <div className={'  max-w-[800px] mb-[150px] mb:mb-0'}>
            <ReactMarkdown
              className={'text-white text-[20px] mb:text-[46px] font-medium '}
            >
              {data.mainInfo.data.attributes.title}
            </ReactMarkdown>

            <p
              className={
                ' my-5 text-white border-l-2 border-leftBorder text-[12px]  mb:text-md pl-[10px] text-[#F4F4F4]'
              }
            >
              {data.mainInfo.data.attributes.description}
            </p>
            <MoreInfo url={'/'} />
          </div>
          <Opportunity data={data.opportunity} />
        </div>
        <div className={' mt-5 mb:mt-[54px]'}>
          <Direction data={data.direction} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: HomeQuery(
      LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    )
  })
  return {
    props: {
      data: { ...res.data },
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

// <div className={'h-[669px]'}>
//   <div className={'z-[5]   w-full'}>
//     <div className={'static  max-w-[800px] mb-[72px]'}>
//       <ReactMarkdown
//           className={'text-white text-[20px] mb:text-[46px] font-medium '}
//       >
//         {data.mainInfo.data.attributes.title}
//       </ReactMarkdown>
//
//       <p
//           className={
//             ' my-5 text-white border-l-2 border-leftBorder text-[12px]  mb:text-md pl-[10px] text-[#F4F4F4]'
//           }
//       >
//         {data.mainInfo.data.attributes.description}
//       </p>
//       <MoreInfo url={'/'} />
//     </div>
//     <div>
//       <Opportunity data={data.opportunity} />
//       <Direction data={data.direction} />
//       <Video />
//     </div>
//   </div>
// </div>
