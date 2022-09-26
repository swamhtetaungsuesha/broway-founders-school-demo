
import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'

import { FaFacebookF, FaSearch } from 'react-icons/fa'

import { MdEmail } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import {MdOutlineMenuOpen} from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
const UpperNavbar = ({handleMenuOpen,isMenuOpened,handleToggleSearchBar}) => {
    return (
        <Wrapper>
            <Link href='/' passHref>

                <LogoWrapper>
                <Image layout='fill' priority={true} src='/images/navbar_logo.svg' alt='logo'/>
                    


                </LogoWrapper>
            </Link>
            <SocialMediaWrapper>
                
                <Media href='#'>
                    <FaFacebookF/>
                </Media>
                <Media href='#'>
                     <MdEmail/> 
                </Media>
                <Media href='#'>
                    <AiFillPhone/> 
                </Media>
                
            </SocialMediaWrapper>
            <MenuIconAndSearchIconContainer>
                <ButtonWrapper onClick={()=>handleToggleSearchBar(true)}>
                    <FaSearch />
                </ButtonWrapper>
                <ButtonWrapper onClick={()=>handleMenuOpen(!isMenuOpened)}>
                    {
                        !isMenuOpened?
                    <IconRobWrapper>

                        <IconRob></IconRob>
                        <IconRob></IconRob>
                        <IconRob></IconRob>
                    </IconRobWrapper>
                    :
                    <MdOutlineMenuOpen/>
                    }
                </ButtonWrapper>
            </MenuIconAndSearchIconContainer>
        </Wrapper>
    )
}

export default UpperNavbar

const Wrapper = tw.div`
bg-white w-full  flex justify-between items-center p-2  z-50
`

const LogoWrapper = tw.a`
relative h-[60px] w-[200px] sm:w-[300px] sm:h-[80px]
`

const MenuIconAndSearchIconContainer = tw.div`
flex justify-center items-center  
`
const ButtonWrapper = tw.div`
 text-3xl p-2 bg-indigo-900 text-white h-16 w-16 flex justify-center items-center  
`

const IconRob = tw.div`
 h-1 w-full bg-white 
`

const IconRobWrapper = tw.div`
 flex flex-col justify-evenly items-center w-full h-full
`

const SocialMediaWrapper = tw.div`
 justify-center items-center divide-x-2 divide-indigo-900 bg-indigo-200 mx-5 skew-x-12 p-2 sm:flex hidden
`

const Media = tw.a`
text-indigo-900 text-xl  px-3
`