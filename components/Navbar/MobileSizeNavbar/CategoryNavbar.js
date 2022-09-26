import React, {  useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {GoPlus} from 'react-icons/go'
import {ImMinus} from 'react-icons/im'
import { IoMdArrowDropright} from 'react-icons/io'

import { HandleMenuList } from '../../../utils/setting'
import Link from 'next/link'
const CategoryNavbar = ({isMenuOpened,menuItems,handleMenuID}) => {

    const [indexArr,setIndexArr] = useState([])
    useEffect(()=>{
        setIndexArr([])
    },[isMenuOpened])
    const handleClick = index => {
        let Arr = [...indexArr]
        if(Arr.includes(index)){
            const i = Arr.indexOf(index)
            Arr.splice(i, 1)
        }else{

            Arr.push(index)
        }
        setIndexArr(Arr)
    }
  return (
    <Wrapper $isOpened={isMenuOpened}>
        <CategoryTitleWrapper>

            {
                ['about us', 'academics', 'school media', 'school life'].map((item, index)=>(
                    <CategoryWrapper key={index}>

                        <NavTitle onClick={()=>handleClick(index)}>
                        
                                {item}
                            
                                {
                                    indexArr.includes(index)?<ImMinus/>:<GoPlus/>
                                }
                                
                        
                        </NavTitle>
                        <ItemsContainer $isincluded={indexArr.includes(index)}>

                            {
                                HandleMenuList(item,menuItems).map((category,index)=>(
                                    <ItemWrapper key={index}>
                                        <Link href={category._id.routerPath} passHref>
                                            <NormalTitle>
                                                {category._id.title}

                                            </NormalTitle>
                                        
                                        </Link>
                                        {
                                            category.items.length!==0 && category._id.field!=='academic'&&
                                        <IoMdArrowDropright onClick={()=>handleMenuID(category._id._id)}/>
                                        }
                                    </ItemWrapper>
                                ))
                            }
                        </ItemsContainer>
                    </CategoryWrapper>
                ))
            }
        </CategoryTitleWrapper>
        <AdmissionButtonWrapper>
            <Link href='/school_tour' passHref>
            
            <AdmissionButton>
                school tour
            </AdmissionButton>
            </Link>
            <Link href='/enrollment' passHref>
            
            <AdmissionButton>
                online enroll
            </AdmissionButton>
            </Link>
            <Link href='/form_career_application' passHref>
            
            <AdmissionButton>
                career application
            </AdmissionButton>
            </Link>
        </AdmissionButtonWrapper>
    </Wrapper>
  )
}

export default CategoryNavbar

const Wrapper = tw.div`
${(p) => (p.$isOpened ? "translate-y-0" : "-translate-y-full")}
w-full  absolute left-0 bg-red-600 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] overflow-y-auto grid grid-cols-1  -z-20 transition-all duration-500 
`

const NavTitle = tw.div`
flex text-white uppercase text-2xl  p-2 justify-between items-center  
`

const CategoryTitleWrapper = tw.div`
grid grid-cols-1 
`
const AdmissionButtonWrapper = tw.div`
divide-y divide-slate-500  bg-indigo-900 self-end grid grid-cols-1 
`
const AdmissionButton = tw.a`
text-white uppercase text-2xl p-2  text-center no-underline
`
const CategoryWrapper = tw.div`
group
`

const ItemWrapper = tw.div`

flex justify-between items-center pl-3 py-2
`
const ItemsContainer = tw.div`
${(p) => (p.$isincluded ? "max-h-screen transition-all duration-500" : "max-h-0")}
bg-slate-200 text-indigo-900 capitalize text-xl  px-2 overflow-hidden 
`

const NormalTitle = tw.a`
text-xl  text-left capitalize no-underline text-indigo-900
`