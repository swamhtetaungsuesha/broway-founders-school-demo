import React from 'react'
import { getData } from '../../../utils/fetchData'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../../../components/ImageHandle'
import Head from 'next/head'
import NavigationLink from '../../../components/PageLayout/NavigationLink'
import {BsFillArrowRightCircleFill,BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Link from 'next/link'

const Item = ({selectedCategory,next,current,prev}) => {

    
  return (
    <Wrapper>
        <Head>
          <title>{current.title}</title>
        </Head>
        <NavigationLink first={selectedCategory.field} second={selectedCategory.title} third={current.title} path={selectedCategory.routerPath}/>
        <ItemWrapper>
            <Heading>{current.title}</Heading>
            <ImageWrapper>
                <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                  placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={current.avatar} alt={current.avatar} className='w-full h-full object-cover'/>
            </ImageWrapper>
            <Sub_Heading>{current.sub_title}</Sub_Heading>
            <Content dangerouslySetInnerHTML={{__html: current.content}}/>
        <BottomWrapper>
         { prev?<Link href={`${selectedCategory.routerPath}/${prev._id}`} passHref>
            <BottomItemWrapper>
              <IconWrapper>
                  <BsFillArrowLeftCircleFill/>
              </IconWrapper>
              <TextWrapper>
                Previous
                <Title>
                  {prev.title}
                </Title>
              </TextWrapper>
            </BottomItemWrapper>
          
          </Link>:<div></div>}
          {next?<Link href={`${selectedCategory.routerPath}/${next._id}`} passHref>
          
            <BottomItemWrapper>
              <IconWrapper>
                  <BsFillArrowRightCircleFill/>
              </IconWrapper>
              <TextWrapper>
                Next
                <Title>
                  {next.title}
                </Title>
              </TextWrapper>
            </BottomItemWrapper>
          </Link>:<div></div>}
        </BottomWrapper>
        </ItemWrapper>
    </Wrapper>
  )
}

export default Item

const Wrapper = tw.section``

const ItemWrapper = tw.div`
 p-3 flex flex-col items-start gap-3 max-w-6xl mx-auto
`

const Heading = tw.div`
text-indigo-900 sm:text-6xl text-4xl font-bold  py-3 after:w-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-red-600 relative 

`
const Sub_Heading = tw.h3`
text-2xl text-red-600
`

const ImageWrapper = tw.div`
w-full overflow-hidden
`

const Content = tw.div`
cms-content   font-content  sm:text-base  text-sm 
`

const BottomWrapper = tw.section`
grid sm:grid-cols-2 grid-cols-1  w-full sm:divide-x-2
`

const BottomItemWrapper = tw.a`
flex items-center gap-3 last:flex-row-reverse last:text-right group 
`

const IconWrapper = tw.div`
text-xl text-indigo-900
`

const TextWrapper = tw.h3`
text-3xl font-bold text-red-600 uppercase decoration-red-600 group-hover:underline 
`

const Title = tw.p`
md:text-xl text-base font-normal text-indigo-900 normal-case decoration-indigo-900 group-hover:underline 
`

export async function getServerSideProps(context) {
    const { params } = context
    
    const res = await getData(`ecb/${params.category}/${params.id}`)
  
  
    return {
      props: {
        selectedCategory:res.selectedCategory,
        next : res.nextItem,
        current : res.currentItem,
        prev : res.prevItem
      },
    }
  }