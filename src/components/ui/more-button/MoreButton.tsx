import { ReactNode } from 'react'
import styles from './MoreButton.module.scss'
import Link from 'next/link'
export interface IMoreButton {
  label: string
  href: string
}

function MoreButton({ label, href }: IMoreButton) {
  return (
    <Link href={href} className={styles.button}>
      {label}
    </Link>
  )
}

export default MoreButton
