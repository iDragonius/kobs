import styles from './Navbar.module.scss'
import { NavigationElementType } from '@/lib/graphql/queries/layout.query'
import { useState } from 'react'
import Forward from '@/assets/icons/forward.svg'
import Link from 'next/link'
import cx from 'classnames'
export interface INavbarElement {
  data: NavigationElementType
}

function NavbarElement({ data }: INavbarElement) {
  return (
    <Link href={data.path} className={cx(styles.navigationLink)}>
      <Forward className={cx(styles.forward)} />
      <div className={styles.navbarElement}>
        <p>{data.label}</p>
      </div>
    </Link>
  )
}

export default NavbarElement
