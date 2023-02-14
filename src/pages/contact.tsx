import Head from 'next/head'
import { initializeApollo } from '@/lib/graphql/apollo-client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Input from '@/components/ui/input/Input'
import {
  ContactQuery,
  IContactQuery
} from '@/lib/graphql/queries/contact.query'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { LanguagesQueryEnum } from '@/config'
import cx from 'classnames'
import { Space_Grotesk } from '@next/font/google'
import Button from '@/components/ui/button/Button'
import { checkboxTypesData } from '@/components/pages/contact/checkbox-types.data'
import Checkbox from '@/components/ui/checkbox/Checkbox'
import { useMutation } from '@apollo/client'
import {
  ContactEnum,
  ContactMutation,
  IContactMutation
} from '@/lib/graphql/mutations/contact.mutation'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})
export interface IContact {
  data: IContactQuery
}

export default function Contact({ data }: IContact) {
  const [contactData, setContactData] = useState<IContactMutation>({
    first_name: '',
    last_name: '',
    message: '',
    email: '',
    type: ContactEnum.complaint,
    phone: ''
  })
  const phoneRef = useRef()
  const { t } = useTranslation('contact')
  const [mutateFunction, { data: responseData, loading, error }] = useMutation(
    ContactMutation(),
    {
      variables: contactData
    }
  )
  const changeContactData = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({
      ...contactData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return (
    <>
      <Head>
        <title>KOBSKA</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <div>
          <h1 className={'font-semibold text-2xl mb-3'}>{t('contact')}</h1>
          <p
            className={
              'font-medium text-[#8C8C8C] text-lg w-full mb:w-1/2 xl:1/3'
            }
          >
            {t('contact_description')}
          </p>
        </div>
        <div
          className={
            'flex mb:flex-row flex-col gap-10  justify-between relative '
          }
        >
          <div className={'mt-5 w-full lg:w-1/2 '}>
            <div className={'mb-10'}>
              <div className={'flex '}>
                {checkboxTypesData.map(checkbox => {
                  return (
                    <Checkbox
                      label={t(checkbox.value)}
                      key={checkbox.value}
                      className={'mr-3'}
                      checked={
                        contactData.type ===
                        ContactEnum[checkbox.value as ContactEnum]
                      }
                      onClick={() =>
                        setContactData({
                          ...contactData,
                          type: ContactEnum[checkbox.value as ContactEnum]
                        })
                      }
                      onChange={() =>
                        setContactData({
                          ...contactData,
                          type: ContactEnum[checkbox.value as ContactEnum]
                        })
                      }
                    />
                  )
                })}
              </div>
            </div>
            <form>
              <div
                className={'flex flex-wrap gap-y-3 lg:gap-y-10 mr-0 mb:mr-5'}
              >
                <div
                  className={
                    'flex justify-between w-full gap-y-3  gap-x-5 flex-col lg:flex-row '
                  }
                >
                  <Input
                    label={t('form_firstName')}
                    type={'text'}
                    className={'w-full '}
                    name={'first_name'}
                    onChange={changeContactData}
                  />
                  <Input
                    label={t('form_lastName')}
                    type={'text'}
                    className={'w-full'}
                    name={'last_name'}
                    onChange={changeContactData}
                  />
                </div>
                <div
                  className={
                    'flex w-full gap-x-5  gap-y-3 flex-col lg:flex-row '
                  }
                >
                  <Input
                    label={'XX XXX XX XX'}
                    type={'phone'}
                    className={'w-full'}
                    name={'phone'}
                    required={true}
                  />
                  <Input
                    label={t('form_email')}
                    type={'text'}
                    className={'w-full'}
                    name={'email'}
                    onChange={changeContactData}
                    required={true}
                  />
                </div>

                <Input
                  label={t('form_message')}
                  type={'textarea'}
                  className={'basis-full w-full mb-5 '}
                  name={'message'}
                  onChange={changeContactData}
                />
              </div>
              <Button
                variant={'primary'}
                label={t('send')}
                className={'mb-12'}
                onClick={() => mutateFunction()}
              />
            </form>
          </div>
          <div>
            <div
              className={cx(
                'p-10 bg-[#F05236] text-2xl absolute left-[-20px] sm:left-[-30px]  mb:left-0  w-screen mb:max-w-[500px] mb:relative ',
                spaceGrotesk.className
              )}
            >
              <div>
                <h2 className={'text-[#F1F1F1]'}>{t('phone')}</h2>
                <p className={'font-bold text-white'}>
                  {data.contactInfo.data.attributes.phone}
                </p>
              </div>
              <div className={'my-10'}>
                <h2 className={'text-[#F1F1F1]'}>{t('email')}</h2>
                <p className={'font-bold text-white'}>
                  {data.contactInfo.data.attributes.email}
                </p>
              </div>
              <div>
                <h2 className={'text-[#F1F1F1]'}>{t('address')}</h2>
                <p className={'font-bold text-white'}>
                  {data.contactInfo.data.attributes.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apolloClient = initializeApollo()
  const res = await apolloClient.query({
    query: ContactQuery(
      LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    )
  })
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(locale, ['contact']))
    }
  }
}
