import styles from './Video.module.scss'
import bg from '@/assets/icons/frame.jpg'
import Image from 'next/image'
export interface IVideo {}

function Video() {
  return (
    <div className={'flex items-center'}>
      |{' '}
      <div className={'w-1/2 relative'}>
        <Image
          src={bg}
          alt={'/'}
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </div>
      <div className={'w-1/2'}></div>
    </div>
  )
}

export default Video
