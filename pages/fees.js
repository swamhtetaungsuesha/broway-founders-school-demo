import React from 'react'
import Head from 'next/head'
import Layout from '../components/PageLayout/Layout'
import { getData } from '../utils/fetchData'
import tw from 'tailwind-styled-components/dist/tailwind'
import { getPrimary } from '../middleware/serverLogic'

const Fees = (props) => {


  return (
    <>
     <Head>
        <title>Fees</title>
      </Head>
      <Layout category={props.selectedCategory} >
       
            
        
      </Layout>
    </>
  )
}



export default Fees

export async function getStaticProps() {
  
  const res = await getPrimary('/fees')


  return {
    props: {
      selectedCategory : res.selectedCategory,
      
    },
  }
}


