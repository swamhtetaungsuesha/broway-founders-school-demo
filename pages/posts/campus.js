import React from 'react'
import Head from 'next/head'
import { getData } from '../../utils/fetchData'

import Layout from '../../components/PageLayout/Layout'
import CardComponent from '../../components/eventAndCampus/CardComponent'
import { getPrimary } from '../../middleware/serverLogic'
const Item = (props) => {
  return (
    <>
       <Head>
        <title>{props.selectedCategory.title}</title>
      </Head>
    <Layout category={props.selectedCategory}>
      <CardComponent items={props.items} path={props.selectedCategory.routerPath}/>
    </Layout>
    </>
  )
}

export default Item

export async function getStaticProps() {

  const res = await getPrimary('/posts/campus')


  return {
      props: {
          result: res.result,
          selectedCategory: res.selectedCategory,
          items: res.items
      },
  }
}