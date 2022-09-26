import React from 'react'
import Head from 'next/head'
import { getData } from '../utils/fetchData'
import Layout from '../components/PageLayout/Layout'
import Link from 'next/link'
import { mdyFormat } from '../utils/dateFormat'
import tw from 'tailwind-styled-components/dist/tailwind'
import {WiTime10} from 'react-icons/wi'
import { getPrimary } from '../middleware/serverLogic'


const Mission = (props) => {



  return (
    <>
     <Head>
        <title>School Policies</title>
      </Head>
    <Layout category={props.selectedCategory}>
        <Wrapper>
          <ItemsContainer>
            {
              props.policies.map((policy,index)=>(
                <ItemWrapper key={index}>
                  <PrefixNo>
                    {index+1>=10?index+1:"0"+(index+1)}
                  </PrefixNo>
                  <RightWrapper>
                    <Link href={policy.avatar} passHref >
                    
                      <Title target='_blank'>{policy.title}</Title>
                    </Link>
                    <DateWrapper><WiTime10/> {mdyFormat(policy.createdAt)}</DateWrapper>
                  </RightWrapper>
                </ItemWrapper>
              ))
            }
          </ItemsContainer>
        </Wrapper>
    </Layout>
    </>
    
  )
}

export default Mission

const Wrapper = tw.section`

`

const ItemsContainer = tw.div`
flex flex-col divide-y-4 gap-3
`

const ItemWrapper = tw.div`
flex gap-3 p-2 items-center
`

const PrefixNo = tw.h3`
 h-full bg-red-600 text-white p-4 text-2xl rounded-lg
`

const RightWrapper = tw.div`
flex flex-col gap-2
`

const Title = tw.a`
sm:text-3xl text-2xl text-indigo-900 font-bold hover:text-red-600 transition-all duration-600

`

const DateWrapper = tw.p`
flex text-slate-700/70 items-center gap-2 
`

export async function getStaticProps() {
  
  const res = await getPrimary('/school_policies')


  return {
    props: {

      selectedCategory : res.selectedCategory,
      policies :res.items
    },
  }
}