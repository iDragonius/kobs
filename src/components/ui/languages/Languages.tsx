import styles from '@/components/ui/languages/Languages.module.scss'
import Image from 'next/image'
import LanguagesIcon from '@/assets/icons/languages.svg'
import { useRouter } from 'next/router'
import Dropdown from '@/components/ui/dropdown/Dropdown'
import { LanguagesEnum } from '@/config'
import cx from 'classnames'

interface ILanguages {
  scrollY: number
  route: string
}
function Languages({ scrollY, route }: ILanguages) {
  const { locale } = useRouter()

  return (
    <div
      className={cx(
        scrollY === 0 && route === '/'
          ? styles.homeLanguageContainer
          : styles.languageContainer
      )}
    >
      <div className={styles.languageWrapper}>
        <LanguagesIcon
          className={cx(
            scrollY === 0 && route === '/' ? 'stroke-[#fff]' : 'stroke-[#000]'
          )}
        />
        <p className={styles.language}>
          {locale?.split('')[0].toUpperCase()}
          {locale?.split('')[1]}
        </p>
      </div>
      <div> {}</div>
    </div>
  )
}

export default Languages
