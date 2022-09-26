import Link from 'next/link'
import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../ImageHandle'
import {IoMdArrowDropright} from 'react-icons/io'

const CategoryList = ({items,title}) => {
  return (
    <Wrapper>
        <Heading>
            More to Explore 
            <HeadingTitle>
                {title}
            </HeadingTitle>
            By Arrow
        </Heading>
        <ItemsContainer>
            {
                items.map((item,index)=>(
                    <ItemWrapper key={index}>
                        <Link href={item._id.routerPath} passHref>
                        
                            <ButtonWrapper>
                                <IoMdArrowDropright/>
                            </ButtonWrapper>
                        </Link>
                        <ImageWrapper>
                        <ImageHandle    errorImg='/images/coverForAllPath.jpg'
                            placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item._id.avatar} className='w-full h-full object-cover' alt={item._id.avatar}/>
                        </ImageWrapper>
                        <ItemHeading>
                            {item._id.title}
                        </ItemHeading>
                    </ItemWrapper>
                ))
            }
        </ItemsContainer>
    </Wrapper>
  )
}

export default CategoryList

const Wrapper = tw.section`
flex flex-col  px-5
`

const HeadingTitle = tw.h3`
sm:text-7xl text-4xl text-red-600 uppercase py-3 
`

const Heading = tw.div`
text-center text-2xl  text-indigo-900 after:w-10 after:h-1 after:bg-red-600 after:absolute relative after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:text-center my-3 before:w-10 before:h-1 before:bg-red-600 before:absolute  before:-top-4 before:left-1/2 before:-translate-x-1/2 before:text-center
`
const ItemsContainer = tw.div`
w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1
`

const ItemWrapper = tw.div`
flex-1 relative m-5
`
const ButtonWrapper = tw.a`
bg-slate-100 text-4xl no-underline text-black p-4 absolute -top-4 -right-4 hover:bg-slate-300
`

const ImageWrapper = tw.div`
overflow-hidden h-56
`

const ItemHeading = tw.div`
bg-indigo-900 text-white p-3 text-2xl uppercase absolute -bottom-4 -left-4 max-w-full
`