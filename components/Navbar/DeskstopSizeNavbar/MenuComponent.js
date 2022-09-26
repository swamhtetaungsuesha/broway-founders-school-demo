import React, { useContext } from 'react'
import { DataContext } from '../../../store/GlobalState'
import Link from 'next/link'
import { HandleMenuList } from '../../../utils/setting'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../../ImageHandle'

import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io'

const MenuComponent = () => {
    const { state, dispatch } = useContext(DataContext)
    const { menuItems } = state
  return (
    <Wrapper>
        {
            ['about us', 'academics', 'school media', 'school life'].map((item,index)=>(
                <ItemWrapper key={index}>
                    <Item>

                        {item}
                    </Item>
                    <MenuItemsContainer>
                    {
                                    HandleMenuList(item, menuItems).map((category,index) => (
                                        
                                        <CategoryItem key={category._id._id}>
                                            <Link href={`${category._id.routerPath}`} passHref>
                                               

                                                <CategoryTitle >
                                                {category.items.length!==0&&(item!=='about us'&&item!=='academics')&&
                                                <IconWrapper>

                                                    <IoMdArrowDropleft/>
                                                </IconWrapper>
                                                }
                                                    <ArrowSpace></ArrowSpace>
                                                    {category._id.title}
                                                    <ArrowSpace></ArrowSpace>
                                                    {category.items.length!==0&&(item==='about us'||item==='academics')&&
                                                    <IconWrapper $isRight={item==='about us'||item==='academics'}>

                                                        <IoMdArrowDropright/>
                                                    </IconWrapper>
                                                   }
                                                    
                                                </CategoryTitle>
                                                
                                            </Link>
                                            <SpecificItemsWrapper $isRight={item==='about us'||item==='academics'}>
                                    
                                                <ImageWrapper>
                                    

                                                    <ImageHandle    errorImg="/images/coverForAllPath.jpg"
                                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={category._id.avatar} alt={category._id.avatar} />
                                                    
                                                </ImageWrapper>
                                                <ItemContainer >
                                                    {
                                                        category.items.map((item)=>(
                                                            <Link href={`${category._id.routerPath}/${item._id}`} passHref key={item._id}>
                                                                

                                                                <ItemTitle >
                                                                    {item.title}
                                                                </ItemTitle>
                                                                
                                                            </Link>
                                                        ))
                                                    }
                                                </ItemContainer>
                                            </SpecificItemsWrapper>
                                        </CategoryItem>
                                    ))
                    }
                    </MenuItemsContainer>
                </ItemWrapper>
            ))
        }
    </Wrapper>
  )
}

export default MenuComponent

const Wrapper = tw.nav`
flex items-center justify-center  divide-x-4 divide-slate-200 flex-1
`

const ItemWrapper = tw.div`
relative  flex-1 text-center group-one
`

const Item = tw.h3`
text-2xl capitalize text-indigo-900 
`


const MenuItemsContainer = tw.div`
absolute top-[50px] right-0 invisible opacity-0 group-one-hover:visible group-one-hover:opacity-100 flex bg-slate-200 w-[250px]  flex-col items-start z-50 divide-y divide-slate-100 transition-all duration-500
`

const CategoryItem = tw.div`
 w-full text-left group-two relative
`

const IconWrapper  = tw.div`
${(p) => (p.$isRight ?'right-0':'left-0' )}
absolute inset-y-0 h-full flex items-center text-xl
`

const CategoryTitle = tw.a`

relative text-lg text-indigo-900 w-full h-full block p-3 group-two-hover:bg-slate-700 group-two-hover:text-white flex
`
const ArrowSpace = tw.em`
w-[20px] 
`

const ItemTitle = tw.a`
text-lg text-indigo-900 w-full h-full block p-3 hover:bg-slate-700 hover:text-white
`
const SpecificItemsWrapper = tw.div`
${(p) => (p.$isRight ?'left-full':'right-full' )}
absolute   top-0 bg-slate-200 w-[300px] invisible opacity-0 group-two-hover:visible group-two-hover:opacity-100
`

const ImageWrapper = tw.div`
w-full p-2
`
const ItemContainer = tw.div`
flex flex-col w-full divide-y divide-slate-100
`

