import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import tw from 'tailwind-styled-components/dist/tailwind'
import Link from 'next/link'

const NavigationLink = ({first,second,third,path}) => {
  return (
    <Wrapper>
      <Link href='/' passHref>

        <LinkToCategoryWrapper>
            Home
          </LinkToCategoryWrapper>
      </Link>
        <MdKeyboardArrowRight/>
        <LinkToCategoryWrapper>
          {first}
        </LinkToCategoryWrapper>
        <MdKeyboardArrowRight/>
        <Link href={path} passHref>
        
          <LinkToCategoryWrapper>
            {second}
          </LinkToCategoryWrapper> 
        </Link>
        {
          third&&<>
          <MdKeyboardArrowRight/>
          <LinkToCategoryWrapper>
            {third}
          </LinkToCategoryWrapper> 
          </>
        }      
    </Wrapper>
  )
}
const Wrapper = tw.div`
border-y border-red-600 p-5 flex items-center  text-xs uppercase text-indigo-900 my-5 flex-wrap
`

const LinkToCategoryWrapper = tw.a`
no-underline px-3 text-indigo-900 hover:text-red-600
`

export default NavigationLink