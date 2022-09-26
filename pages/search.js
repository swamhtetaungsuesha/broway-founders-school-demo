import Link from 'next/link'
import React from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { tagCutString } from '../utils/dateFormat'
import tw from 'tailwind-styled-components/dist/tailwind'
import Head from 'next/head'
import NavigationLink from '../components/PageLayout/NavigationLink'
import { useRouter } from 'next/router'
import { getData } from '../utils/fetchData'

const Search = ({items}) => {

    const router = useRouter()
    const {query} = router

  return (
    <Wrapper>
        <Head>
          <title>Search</title>
        </Head>
        <NavigationLink first='Search' second={query.q}  path={router.asPath}/>
        <Container>

            <Heading>
                Searched For: {query.q}
            </Heading>
            {items.length===0&&<p className='m-4 text-indigo-900'>No Result Found!</p>}
            {
                items.map((item,index)=>(
                  
                    <ItemWrapper key={index}>
                        <Title>{item.title}</Title>
                        {item.content&&<Content>{tagCutString(item.content)}</Content>}
                        <Link href={item.routerPath||''} passHref>
                
                            <ButtonWrapper>
                            <Text>
                                View More
                            </Text>
                            <BsFillArrowRightCircleFill className='transition-all duration-500 group-hover:translate-x-10 group-hover:invisible group-hover:opacity-0 group-hover:text-red-600' />
                            </ButtonWrapper>
                        </Link>
                    </ItemWrapper>
                ))
            }
        </Container>
    </Wrapper>
  )
}

export default Search

const Wrapper = tw.section`
 
`

const Container = tw.div`
max-w-5xl mx-auto my-10 px-2
`

const Heading = tw.h3`
uppercase text-3xl text-red-600 font-bold
`

const ItemWrapper = tw.div`
flex flex-col items-start p-4 border-b-2 border-red-600 gap-5 border-dashed
`

const Title = tw.h3`
sm:text-3xl text-2xl text-indigo-900 font-bold after:w-8 after:h-1 after:absolute after:bg-red-600 relative after:-bottom-2 after:left-0
`

const Content = tw.p`
font-content text-sm
`

const ButtonWrapper = tw.a`
no-underline text-indigo-900  hover:border-red-600 flex justify-between border border-indigo-900 min-w-[200px] items-center p-3 group transition-all duration-500
`

const Text = tw.p`
transition-all duration-500 group-hover:translate-x-1/2 group-hover:text-red-600
`

export async function getServerSideProps({query}){

        const search = query.q
      
        const res = await getData(`/search?search=${search}`)
        let Arr = [];
        
        const repairItems = res.posts.map(item=>{
          return{
            ...item,
            score:item.score.score
          }
        })
        Arr.push(...res.categories,...repairItems)
        const uniqueIds = [] 
        const unique = Arr.filter(element => {
         
         const isDuplicate = uniqueIds.includes(element._id);
         
         if (!isDuplicate) {
           uniqueIds.push(element._id);
       
           return true;
         }
       
         return false;
       });

        return{
          props:{
            result: unique.length,
            items : unique.sort(function(a, b){return b.score - a.score})
          }
        }
      
  }