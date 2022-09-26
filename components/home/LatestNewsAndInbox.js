import React from 'react'
import {WiTime10} from 'react-icons/wi'
import InboxComponent from './InboxComponent'
import tw from 'tailwind-styled-components/dist/tailwind'
import { mdyFormat } from '../../utils/dateFormat'
import Link from 'next/link'
const LatestNewsAndInbox = ({items}) => {
  return (
    <Wrapper>
        <ItemsContainer>
            <Title href='#'>Latest News</Title>
            {
                items.map(item=>(
                    <ItemWrapper key={item._id}>
                        <Link href={'/news/'+item._id} passHref>
                            <Title>{item.title}</Title>
                        
                        </Link>
                        <DateText><WiTime10/> {mdyFormat(item.createdAt)}</DateText>
                    </ItemWrapper>
                ))
            }
        </ItemsContainer>
        <InboxWrapper>

        <InboxComponent/>
        </InboxWrapper>
    </Wrapper>
  )
}

const Wrapper = tw.section`
 flex lg:items-start items-center justify-around font-serif bg-slate-200 py-10 px-4 gap-3 lg:flex-row flex-col
`

const ItemsContainer = tw.div`
grid grid-cols-1 divide-y-2 divide-indigo-900 gap-3 
`

const ItemWrapper = tw.div`
flex flex-col gap-2 py-2
`

const Title = tw.a`
text-indigo-900 text-3xl hover:text-red-600
`

const DateText = tw.h5`
flex items-center gap-2 text-xl text-slate-700/70
`
const InboxWrapper = tw.div`
max-w-xl w-full
`

export default LatestNewsAndInbox