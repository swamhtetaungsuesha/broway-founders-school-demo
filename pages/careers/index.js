import Head from 'next/head'
import tw from 'tailwind-styled-components/dist/tailwind'

import React,{useState,useEffect} from 'react'

import ItemsComponent from '../../components/newAndCareer/ItemsComponent'
import Layout from '../../components/PageLayout/Layout'

import { getData } from '../../utils/fetchData'


const Careers = (props) => {
 
  const [careers, setCareers] = useState(props.careers)

  useEffect(()=>{
    setCareers(props.careers)
  },[props.careers])

  return (
    <>
       <Head>
        <title>Careers</title>
      </Head>
    <Layout category={props.selectedCategory} >
      <Wrapper>

        <ItemsComponent items={careers} result={props.result} path={props.selectedCategory.routerPath}/>
      </Wrapper>
    </Layout>
    </>
    
  )
}

const Wrapper = tw.section``

export default Careers

export async function getServerSideProps({query}) {
  const page = query.page || 1
  const res = await getData(`career?limit=${page*6}`)

  return {
    props: {
      result: res.result,
      selectedCategory : res.selectedCategory,
      careers :res.careers,
    },
  }
}