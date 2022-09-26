import React from 'react'
import { mdyFormat } from '../../utils/dateFormat'
import {WiTime10} from 'react-icons/wi'
import Link from 'next/link'
import tw from 'tailwind-styled-components/dist/tailwind'

const OtherContent = ({items}) => {
  return (
   <Wrapper>
    <Heading>Lastest Posts</Heading>
    <ItemsContainer>
        {
            items.map((item,index)=>(
                <ItemWrapper key={index}>
                    <Link href={`${item._id}`} passHref>
                        <Title>{item.title}</Title>
                    
                    </Link>
                    <DateText><WiTime10/> {mdyFormat(item.createdAt)}</DateText>
                </ItemWrapper>
            ))
        }
    </ItemsContainer>
   </Wrapper>
  )
}

export default OtherContent

const Wrapper = tw.section`
bg-slate-100   p-3
`

const Heading = tw.h3`
text-3xl text-indigo-900 font-bold my-2
`

const ItemsContainer = tw.div`
grid grid-cols-1 gap-4
`

const ItemWrapper = tw.div`
border-b border-red-600 flex flex-col gap-2 py-3
`

const Title = tw.a`
text-xl text-indigo-900 hover:text-red-600 transition duration-500
`

const DateText = tw.h5`
flex items-center gap-2
`