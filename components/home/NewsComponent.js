import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {ImNewspaper} from 'react-icons/im'
import Link from 'next/link'

const NewsComponent = ({item}) => {
  return (
    <Wrapper>
        <Title>
            <IconWrapper>

            <ImNewspaper/>
            </IconWrapper>
            <TextWrapper>
                Broway - YGN
                <Large>
                    News
                </Large>
            </TextWrapper>
        </Title>
        <Content>{item.content}</Content>
        <Link href={item.routerPath} passHref>

             <ButtonWrapper>
                <Text>
                    Go To News
                </Text>
                <BsFillArrowRightCircleFill className='transition-all duration-500 group-hover:translate-x-10 group-hover:invisible group-hover:opacity-0 group-hover:text-red-600' />
            </ButtonWrapper>
        </Link>
    </Wrapper>
  )
}

export default NewsComponent

const Wrapper = tw.section`
w-full   p-5 flex flex-col items-center justify-evenly  text-indigo-900 gap-5 min-h-[380px] 
`

const Title = tw.div`
flex items-center gap-4
`

const TextWrapper = tw.div`
text-2xl flex flex-col items-center uppercase
`

const IconWrapper = tw.div`
text-8xl 
`

const Large = tw.h3`
uppercase font-bold text-6xl
`

const Content = tw.p`
text-2xl text-center
`

const ButtonWrapper = tw.a`
no-underline text-indigo-900  md:text-2xl text-xl flex justify-between border-2 border-indigo-900  min-w-[250px] items-center gap-6   p-3 group transition-all duration-500
`

const Text = tw.p`
transition-all duration-500 group-hover:translate-x-1/3 

`