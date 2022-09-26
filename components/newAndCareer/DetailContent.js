import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { mdyFormat } from '../../utils/dateFormat'
import {WiTime10} from 'react-icons/wi'

const DetailContent = ({item}) => {
  return (
    <Wrapper>
      <Heading>{item.title} {item.sub_title&&`(${item.sub_title})`}</Heading>
      <DateText><WiTime10/> {mdyFormat(item.createdAt)}</DateText>
      <Content dangerouslySetInnerHTML={{__html: item.content}}/>
    </Wrapper>
  )
}

export default DetailContent

const Wrapper = tw.section`
 col-span-2 flex flex-col items-start gap-5
`

const Heading = tw.h3`
text-indigo-900 sm:text-6xl text-4xl font-bold  py-3 after:w-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-red-600 relative 

`

const DateText = tw.h5`
flex items-center gap-2 text-xl text-slate-700/70
`

const Content = tw.div`
cms-content font-content  md:text-base  text-sm 
`