import Head from 'next/head'
import React from 'react'
import ContentComponent from '../../components/newAndCareer/ContentComponent'
import { getData } from '../../utils/fetchData'
import NavigationLink from '../../components/PageLayout/NavigationLink'

const New = ({selectedCategory,selectedCategoryCareers,selectedCareer}) => {


  return (
    <div >
      <Head>
        <title>{selectedCareer.title}</title>
      </Head>
      <NavigationLink first='about us' second='careers' third={selectedCareer.title} path='/careers'/>
      <ContentComponent content={selectedCareer} other={selectedCategoryCareers} title='careers'/>

    </div>
  )
}

export default New


export async function getServerSideProps(context) {
  const { params } = context
  
  const res = await getData(`career/${params.id}`)

  
  return {

      props: {
        selectedCategory : res.selectedCategory,
        selectedCategoryCareers : res.selectedCategoryCareers,
        selectedCareer :res.selectedCareer,
      },

  }
}