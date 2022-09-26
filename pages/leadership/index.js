import React from 'react'
import { getData } from '../../utils/fetchData'
import tw from 'tailwind-styled-components/dist/tailwind'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/PageLayout/Layout'
import ImageHandle from '../../components/ImageHandle'
import { getPrimary } from '../../middleware/serverLogic'
const Leadership = (props) => {


    
  return (
    <>
      <Head>
        <title>Leadership</title>
      </Head>
      <Layout category={props.selectedCategory} >
        <Wrapper>
          <Heading>
            <HeadingTitle>

            Welcome Message 
            </HeadingTitle>
            
            from Our Leaders
            
          </Heading>
          <ItemsContainer>

            {
              props.leadershipItems.map(item=>(
                <ItemWrapper key={item._id}>
                  <ImageWrapper>
                  <ImageHandle    errorImg='/images/coverForAllPath.jpg'
                              placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item.avatar} className='w-full h-full object-cover rounded-full' alt={item.avatar}/>
                  </ImageWrapper>
                  <Link href={`/leadership/${item._id}`} passHref>
                    <Name>
                      {item.sub_title}
                    </Name>
                  
                  </Link>
                </ItemWrapper>
              ))
            }
          </ItemsContainer>
        </Wrapper>
      </Layout>
    </>
  )
}

export default Leadership

const Wrapper = tw.section`
text-center grid grid-cols-1  capitalize
`
const HeadingTitle = tw.h3`
sm:text-6xl text-4xl text-red-600 uppercase py-3
`

const Heading = tw.div`
text-center text-2xl  text-indigo-900 uppercase
`
const ItemsContainer = tw.div`
grid grid-cols-1 my-10 max-w-4xl mx-auto
`
const ItemWrapper = tw.div`
flex items-center my-4 gap-2
`

const ImageWrapper = tw.div`
w-20 h-20 overflow-hidden rounded-full border border-red-600 p-1 
`

const Name = tw.a`
border-y border-red-600 p-2 text-xl text-indigo-900 flex-1 text-center no-underline hover:text-red-600
`

export async function getStaticProps() {

    const res = await getPrimary(`/leadership`)
  
    return {
      props: {
        result : res.result,
        selectedCategory : res.selectedCategory,
        leadershipItems : res.items
      },
    }
  }

