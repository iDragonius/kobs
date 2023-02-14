import React, { ReactNode, useEffect } from 'react'
import Header from '@/components/layout/ui/header/Header'
import Footer from '@/components/layout/ui/footer/Footer'
import styles from './Layout.module.scss'

import Navbar from '@/components/layout/ui/navbar/Navbar'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useScrollContext } from '@/context/providers/ScrollContextProvider'
import { useQuery } from '@apollo/client'
import { ILayoutQuery, LayoutQuery } from '@/lib/graphql/queries/layout.query'
import { LanguagesQueryEnum } from '@/config'
interface ILayout {
  children: ReactNode
}
export const Layout = ({ children }: ILayout) => {
  const { route, locale } = useRouter()
  const { scrollY } = useScrollContext()
  const { data, loading, refetch } = useQuery<ILayoutQuery>(
    LayoutQuery(LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]),
    {
      notifyOnNetworkStatusChange: true
    }
  )

  useEffect(() => {
    refetch().catch(err => {
      console.log(err)
    })
  }, [locale])
  return (
    <>
      <div className={'min-h-screen mb-[-61px]'}>
        <div
          className={cx(
            'sticky top-0  z-10 transition mb-[50px]',
            route === '/' && scrollY === 0 ? 'bg-transparent' : 'bg-white'
          )}
        >
          <Header />
          <Navbar data={data as ILayoutQuery} loading={loading} />
        </div>
        <main className={styles.main}>{children}</main>
      </div>

      <Footer data={data as ILayoutQuery} loading={loading} />
    </>
  )
}
