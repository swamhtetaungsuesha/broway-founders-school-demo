import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {ImCross} from 'react-icons/im'

import Link from 'next/link'
import ImageHandle from '../../ImageHandle'
const ItemNavbar = ({item,isToggled,handleMenuID}) => {
  return (
    <Wrapper $isToggled={isToggled}>
        <TitleWrapper>
            <Title>

                {item._id.title}
            </Title>
            <IconWrapper onClick={()=>handleMenuID(null)}>
                <ImCross/>
            </IconWrapper>
        </TitleWrapper>
        <ItemWrapper>
           
        <ImageWrapper>
                                    

                                    <ImageHandle    errorImg="https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg"
                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item._id.avatar} alt={item._id.avatar} />
                                    
                                </ImageWrapper>
            <ItemContainer>
                {
                    item.items.map(specificItem=>(
                        <Link key={specificItem._id} href={`${item._id.routerPath}/${specificItem._id}`} passHref>
                        
                            <Item>
                                {specificItem.title}
                            </Item>
                        </Link>
                    ))
                }
            </ItemContainer>
        </ItemWrapper>
    </Wrapper>
  )
}

export default ItemNavbar

const Wrapper = tw.div`
${(p) => (p.$isToggled ? "translate-x-0" : "-translate-x-full")}
w-full  absolute left-0 bg-slate-200 h-[calc(100vh-5rem)] overflow-y-auto s -z-10 transition-all duration-500 
`

const TitleWrapper = tw.div`
 text-3xl flex justify-between items-center text-white capitalize  
`

const Title = tw.h3`
mx-4 text-indigo-900 text-4xl font-bold after:w-10 after:absolute after:-bottom-2 after:left-0 after:h-1 after:bg-red-600 relative 
`

const IconWrapper = tw.div`
p-5 border border-slate-500 bg-red-600
`

const ItemWrapper = tw.div`

`

const ImageWrapper = tw.div`
max-w-full p-5
`

const ItemContainer = tw.div`
flex flex-col items-start divide-y divide-slate-100
`

const Item = tw.a`
no-underline text-indigo-900  text-sm p-5 w-full text-xl 
`