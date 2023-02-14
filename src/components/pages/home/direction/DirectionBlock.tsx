import styles from './Direction.module.scss'
import { DirectionElementProps } from '@/lib/graphql/queries'
import cx from 'classnames'
import MoreInfo from '@/components/ui/more-info-button/MoreInfo'
import Link from 'next/link'
import ForwardLink from '@/assets/icons/forwardLink.svg'
import { useTranslation } from 'next-i18next'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
export interface IDirectionBlock {
  data: DirectionElementProps
}

function DirectionBlock({ data }: IDirectionBlock) {
  const { t } = useTranslation('common')
  const windowSize = useWindowSizeContext()

  return (
    <Link
      href={`/direction/${data.id}`}
      className={cx(styles.block)}
      style={
        windowSize.width > 640
          ? { width: 'calc(50% - 20px)' }
          : { width: '100%' }
      }
    >
      <h1 className={styles.title}>{data.attributes.title}</h1>
      <p className={cx(styles.content)}>{data.attributes.content}</p>
      <div className={styles.linkWrapper}>
        <p className={styles.link}>{t('moreInfo')}</p>
        <ForwardLink className={styles.icon} />
      </div>
    </Link>
  )
}

export default DirectionBlock
