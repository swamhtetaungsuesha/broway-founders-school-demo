import Head from 'next/head'
import tw from 'tailwind-styled-components/dist/tailwind'
import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'

import ItemsComponent from '../../components/newAndCareer/ItemsComponent'
import Layout from '../../components/PageLayout/Layout'
import {  myFormat, queryFormat } from '../../utils/dateFormat'
import { getData } from '../../utils/fetchData'
import { filterSearch } from '../../utils/filterSearch'

const News = (props) => {
  const router = useRouter()
  const [news, setNews] = useState(props.news)

  const [date,setDate] = useState('')

  useEffect(()=>{
    
    filterSearch({router,date:date})

},[date])

  useEffect(()=>{
    setNews(props.news)
  },[props.news])

  return (
    <>
     <Head>
        <title>News</title>
      </Head>
    <Layout category={props.selectedCategory} >
      <Wrapper>
        <LeftWrapper>

        <ItemsComponent items={news} result={props.result} path={props.selectedCategory.routerPath}/>
        </LeftWrapper>
        <DateControlWrapper>
          <Heading>News Archives</Heading>
          <ItemsContainer>
            <ItemWrapper onClick={()=>setDate('all')}>All News</ItemWrapper>
            {
              props.newsDate.map((item,index)=>(
                <ItemWrapper key={index} onClick={()=>setDate(queryFormat(item))}>
                  {item}
                </ItemWrapper>
              ))
            }
          </ItemsContainer>
        </DateControlWrapper>

      </Wrapper>
    </Layout>
    </>
    
  )
}


export default News

const Wrapper = tw.section`
grid sm:grid-cols-4 grid-cols-1 gap-4
`
const LeftWrapper = tw.div`
col-span-3
`

const DateControlWrapper = tw.div`
col-span-1 p-4 
`

const Heading = tw.h3`
text-red-600 text-3xl font-bold 
`

const ItemsContainer = tw.div`
my-6 font-content 
`

const ItemWrapper = tw.div`
py-3  border-b-2 border-indigo-900  border-dashed hover:opacity-60 block cursor-pointer
`



export async function getServerSideProps({query}) {
  
  const page = query.page || 1
  const date =  query.date ||'all'

  
  const res = await getData(`new?limit=${page*6}&date=${date}`)
  let finalDateArray = []
  const fdArray =res.newsDate.map(nd=>
    myFormat(nd.createdAt)


  )

  for (const fd of fdArray) {
      if(!finalDateArray.includes(fd)){
        finalDateArray.push(fd)
      }

  }


  return {
    props: {
      result: res.result,
      selectedCategory:res.selectedCategory,
      news :res.news,
      newsDate : finalDateArray
    },
  }
}