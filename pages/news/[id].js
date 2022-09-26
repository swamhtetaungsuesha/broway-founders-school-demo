import Head from 'next/head'
import React from 'react'
import ContentComponent from '../../components/newAndCareer/ContentComponent'
import NavigationLink from '../../components/PageLayout/NavigationLink'

import { getData } from '../../utils/fetchData'

const New = ({selectedCategory,selectedCategoryNews,selectedNew}) => {

  
  return (
    <div >
      <Head>
        <title>{selectedNew.title}</title>
      </Head>
      <NavigationLink first='school media' second='news' third={selectedNew.title} path='/news'/>
      <ContentComponent content={selectedNew} other={selectedCategoryNews} title='news'/>
    </div>
  )
}

export default New



export async function getServerSideProps(context) {
  const { params } = context
  
  const res = await getData(`new/${params.id}`)
  
  return {
    props: {
      selectedCategory : res.selectedCategory,
      selectedCategoryNews : res.selectedCategoryNews,
      selectedNew :res.selectedNew,
    },
  }
}

