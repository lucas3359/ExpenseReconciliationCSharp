import React from 'react'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import Layout from '../../components/Layout'

const Signout = () => {
  return (
    <Layout>
      <Card link='/api/auth/signin'>
        <Icon icon='profile' classes='w-20 mx-auto' />
        <p className='text-center font-semibold'>Sign back in</p>
      </Card>
    </Layout>
  )
}

export default Signout
