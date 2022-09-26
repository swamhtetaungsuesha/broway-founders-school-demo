import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../ImageHandle'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import Link from 'next/link'
import { tagCutString } from '../../utils/dateFormat'

const CardComponent = ({items,path}) => {
  return (
    <Wrapper>
        <Heading></Heading>
        <ItemsContainer>
            {
                items.map((item,index)=>(
                    <ItemWrapper key={index}>
                        <ContentWrapper>
                            <Title>
                                {item.title}
                            </Title>
                            <Content>
                                {tagCutString(item.content)}
                            </Content>
                            <Link href={`${path}/${item._id}`} passHref>
                            
                                <Button >
                                    <Text>
                                    View More
                                    </Text>
                                    <BsFillArrowRightCircleFill className='transition-all duration-500 group-hover:translate-x-10 group-hover:invisible group-hover:opacity-0 group-hover:text-red-600'/>
                                </Button>
                            </Link>

                        </ContentWrapper>
                        <ImageWrapper>
                            <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item.avatar} alt={item.avatar} className='w-full h-full object-cover'/>
                        </ImageWrapper>
                    </ItemWrapper>
                ))
            }
        </ItemsContainer>
    </Wrapper>
  )
}

const Wrapper = tw.section`

`

const Heading = tw.h3``

const ItemsContainer = tw.div`
grid grid-cols-1 gap-4
`

const ItemWrapper = tw.div`
flex justify-evenly items-center flex-wrap-reverse gap-3 bg-slate-100  min-h-[384px]  p-3
`

const ImageWrapper = tw.div`
w-60 h-56 relative after:absolute after:w-full after:h-full sm:m-5 after:bg-indigo-400 after:top-5 after:left-5 after:-z-10 z-20
`

const ContentWrapper = tw.div`
p-2 max-w-xl flex flex-col items-start z-10
`

const Title = tw.h3`
text-indigo-900 sm:text-6xl text-4xl font-bold my-6 py-3 after:w-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-red-600 relative 
`

const Content = tw.p`
 font-content text-base font-light my-4 
`

const Button = tw.a`
no-underline text-indigo-900  hover:border-red-600 flex justify-between border border-indigo-900 min-w-[200px] items-center p-3 group transition-all duration-500
`

const Text = tw.h3`
transition-all duration-500 group-hover:translate-x-1/2 group-hover:text-red-600
`

export default CardComponent