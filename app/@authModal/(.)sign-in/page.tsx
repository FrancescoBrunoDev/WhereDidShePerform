import CloseModal from '@/components/CloseModal'
import SignIn from '@/components/SignIn'
import { FC } from 'react'

const page: FC = () => {
  return (
    <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100'>
      <div className='container flex items-center h-full max-w-lg mx-auto'>
        <div className='relative bg-background border w-full h-fit py-20 px-2 rounded-lg'>
          <div className='absolute top-4 right-4'>
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default page