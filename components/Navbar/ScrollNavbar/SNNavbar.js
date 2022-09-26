import React, { useState,useEffect } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import MenuComponent from '../DeskstopSizeNavbar/MenuComponent'
import tw from 'tailwind-styled-components/dist/tailwind'
import Link from 'next/link'
import Image from 'next/image'

const SNNavbar = () => {
    const [isClicked,setIsClicked]=useState(false)
    const [isDisplayed, setIsDisplayed] = useState(false)

    useEffect (()=>{
      document.addEventListener("scroll", e => {
        let scrolled = document.scrollingElement.scrollTop;
        if (scrolled >= 150){
          setIsDisplayed(true)
        } else {
            setIsDisplayed(false)
          }
      })
      return()=>{
        
        setIsDisplayed(false)
      }
  },[])
  useEffect(()=>{
    setIsClicked(false)
  },[isDisplayed])
  
  return (
    <Wrapper $isDisplayed={isDisplayed}>
      <Link href='/' passHref>
        <LogoWrapper>
        <Image layout='fill' priority={true} src='/images/navbar_logo.svg' alt='logo'/>
          
        </LogoWrapper>
      </Link>
        <MenuComponent/>
        <AdmissionWrapper>
            <Title onClick={()=>setIsClicked(!isClicked)}>

                Admissions
                <IoMdArrowDropdown/>
            </Title>
            {isClicked&&<AdmissionButtonContainer $isClicked={isClicked}>
              <Link href='/school_tour' passHref>
                <AdmissionButton>
                School Tour
                </AdmissionButton>

              </Link>
              <Link href='/enrollment' passHref>
                <AdmissionButton>
                Online Enroll
                </AdmissionButton>
                
              </Link>
              <Link href='/form_career_application' passHref>
                <AdmissionButton>
                Career Application
                </AdmissionButton>
                
              </Link>
          </AdmissionButtonContainer>
          }
        </AdmissionWrapper>
    </Wrapper>
  )
}

export default SNNavbar

const Wrapper = tw.header`
${(p) => (p.$isDisplayed ?'top-0':'-top-full' )}
lg:flex hidden fixed z-50 bg-white  items-stretch  border border-slate-200 w-full transition-all duration-500
`

const LogoWrapper = tw.a`
h-[100px] m-3 xl:w-[300px] w-[230px] relative
`

const AdmissionWrapper = tw.div`
  text-2xl text-indigo-900 bg-slate-200  xl:w-[200px]  p-2
`

const Title = tw.h3`
flex items-center justify-center cursor-pointer w-full h-full 
`

const AdmissionButtonContainer = tw.div`
${(p) => (p.$isClicked ?'flex':'hidden' )}
absolute top-full  flex-col right-0 text-xl
`

const AdmissionButton = tw.a`
bg-indigo-900 text-white even:bg-red-600 p-4 font-normal uppercase hover:opacity-70 transition-opacity duration-500
`