import Logo from '@/assets/logo-colored.svg'
import WhiteLogo from '@/assets/logo-white.svg'
import styles from './Header.module.scss'
import Languages from '@/components/ui/languages/Languages'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Burger from '@/assets/icons/burger.svg'
import { useScrollContext } from '@/context/providers/ScrollContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'

const Header = () => {
  const { route } = useRouter()
  const { scrollY } = useScrollContext()
  const windowSize = useWindowSizeContext()
  return (
    <div className={styles.main}>
      <div className={styles.marginContainer}>
        <Link href={'/'}>
          {route === '/' && scrollY === 0 ? <WhiteLogo /> : <Logo />}
        </Link>
        <div className={styles.wrapper}>
          {windowSize.width > 900 ? (
            <>
              <div className={styles.breadcrumb} />
              <Languages scrollY={scrollY} route={route} />
            </>
          ) : (
            <Burger style={{ stroke: '#000' }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
