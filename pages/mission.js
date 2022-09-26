import React from 'react'
import Head from 'next/head'
import { getData } from '../utils/fetchData'
import Layout from '../components/PageLayout/Layout'
import { getPrimary } from '../middleware/serverLogic'

const Mission = (props) => {
  return (
    <>
     <Head>
        <title>Our Mission</title>
      </Head>
    <Layout category={props.selectedCategory}>
      
    </Layout>
    </>
   
  )
}

export default Mission

export async function getStaticProps() {
  
  const res = await getPrimary('/mission')


  return {
    props: {
      selectedCategory : res.selectedCategory,
      missions :res.items
    },
  }
}