import React, { useEffect, useState } from 'react'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/client'
import Layout from '../../components/Layout'
import Card from '../../components/Card'

const SignIn = () => {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    oAuthLogin()
  }, [])

  const oAuthLogin = async () => {
    const providerRecords: Record<string, ClientSafeProvider> = await getProviders()

    setProviders(Object.values(providerRecords))
  }

  const providerBlock = providers.map((provider) => (
    <div key={provider.name}>
      <Card>
        <h1 className='text-center text-3xl'>Sign in</h1>
        <div className='flex mt-10 mb-2'>
          <div className='flex-1'></div>
          <button className='flex-1' onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
          <div className='flex-1'></div>
        </div>
      </Card>
    </div>
  ))

  return <Layout>{providerBlock}</Layout>
}

export default SignIn
