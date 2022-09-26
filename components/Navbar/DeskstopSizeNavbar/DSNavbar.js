import React from 'react'
import MenuComponent from './MenuComponent'
import tw from 'tailwind-styled-components/dist/tailwind'
import {  FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const DSNavbar = ({handleToggleSearchBar}) => {
  return (
    <Wrapper>
      <Link href='/' passHref>
      
        <LogoWrapper>
        <Image height='100px' width='300px' priority={true} src='/images/navbar_logo.svg' alt='logo'/>
        </LogoWrapper>
      </Link>
        <SideWrapper>
          <AdmissionWrapper>
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
          </AdmissionWrapper>
          <LowerSideWrapper>
            <MenuComponent/>
            <SearchWrapper onClick={()=>handleToggleSearchBar(true)}>
              <FaSearch/>
            </SearchWrapper>
          </LowerSideWrapper>
          
        </SideWrapper>
        
    </Wrapper>
  )
}

export default DSNavbar

const Wrapper = tw.header`
lg:flex items-center justify-between  hidden 
`

const LogoWrapper = tw.a`
 flex items-center justify-end
`

const SideWrapper = tw.div`
grid grid-cols-1 gap-4 flex-1
`

const AdmissionWrapper = tw.div`
flex items-center justify-end w-full
`

const AdmissionButton = tw.a`
bg-indigo-900 p-3 text-white   uppercase  w-[200px] h-[60px] flex items-center justify-center even:bg-red-600 hover:opacity-80
`

const LowerSideWrapper = tw.div`
flex items-center  mx-5 justify-between
`

const SearchWrapper = tw.div`
text-2xl text-indigo-900 bg-slate-200 p-3 cursor-pointer
`