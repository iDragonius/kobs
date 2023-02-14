import styles from './Direction.module.scss'
import { useTranslation } from 'next-i18next'
import InfoTitle from '@/components/ui/info-title/InfoTitle'
import { DirectionProps, IHomeQuery } from '@/lib/graphql/queries'
import DirectionBlock from '@/components/pages/home/direction/DirectionBlock'
import Image from 'next/image'
import cx from 'classnames'
export interface IDirection {
  data: DirectionProps
}

function Direction({ data }: IDirection) {
  const { t } = useTranslation('common')

  return (
    <div className={'mb-[50px]'}>
      <InfoTitle
        label={t('directions')}
        buttonLabel={t('allDirections')}
        url={'/'}
        marginBottom={50}
      />
      <div className={'flex flex-col mb:flex-row justify-between'}>
        <div className={'w-full mb:w-1/2 '}>
          <div
            className={cx('flex flex-col sm:flex-row flex-wrap gap-5 w-full ')}
          >
            {data.data.attributes.body.map(element => (
              <DirectionBlock
                key={element.direction_element.data.id}
                data={element.direction_element.data}
              />
            ))}
          </div>
        </div>
        <div className={'flex relative justify-center mt-5 mb:mt-0 '}>
          {/*{data.data.attributes.image.data.map(img => (*/}
          {/*  <Image*/}
          {/*    key={img.attributes.url}*/}
          {/*    src={process.env.SERVER_URL + img.attributes.url}*/}
          {/*    alt={img.attributes.alternativeText}*/}
          {/*    width={img.attributes.width}*/}
          {/*    height={img.attributes.height}*/}
          {/*  />*/}
          {/*))}*/}
          <Image
            key={data.data.attributes.image.data[0].attributes.url}
            src={
              process.env.SERVER_URL +
              data.data.attributes.image.data[0].attributes.url
            }
            alt={data.data.attributes.image.data[0].attributes.alternativeText}
            width={data.data.attributes.image.data[0].attributes.width}
            height={data.data.attributes.image.data[0].attributes.height}
            className={`w-full mb:w-[575px] `}
          />
        </div>
      </div>
    </div>
  )
}

export default Direction
