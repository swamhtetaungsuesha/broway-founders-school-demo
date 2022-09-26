import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {FaHandsHelping,FaSchool} from 'react-icons/fa'
import {MdEditCalendar} from 'react-icons/md'
import Link from 'next/link'

const GlobalButton = () => {
  return (
    <Wrapper>
      <Heading>
        Next <HeadingIndigo>Step</HeadingIndigo>
      </Heading>
      <ButtonsContainer>
        <Link href='/school_tour' passHref>
          <ButtonWrapper>
            <FaSchool className='md:text-5xl sm:text-4xl text-3xl'/>
            <ButtonHeading>
              Visit A Tour
            </ButtonHeading>
              

          </ButtonWrapper>
        </Link>
        <Link href='/enrollment' passHref>
          <ButtonWrapper>
          <MdEditCalendar className='md:text-5xl sm:text-4xl text-3xl'/>
                  
                  <ButtonHeading>
                  Just Apply Now
            </ButtonHeading>
               

          </ButtonWrapper>
        </Link>
        <Link href='/form_career_application' passHref>
          <ButtonWrapper>
          <FaHandsHelping className='md:text-5xl sm:text-4xl text-3xl'/>
          
          <ButtonHeading>
             Join Our Team
            </ButtonHeading>
           
          </ButtonWrapper>
        </Link>
      </ButtonsContainer>
    </Wrapper>
  )
}

const Wrapper = tw.section`
my-10  
`

const Heading = tw.h3`
text-red-600  text-center text-6xl my-2 uppercase  my-8 font-bold 
`
const HeadingIndigo = tw.span`
text-indigo-900 
`

const ButtonsContainer = tw.div`
flex justify-between items-center flex-wrap mx-auto sm:gap-4 gap-2
`
const ImageWrapper = tw.img`
text-red-600
`

const ButtonHeading = tw.span`
p-4
`

const ButtonWrapper = tw.a`
no-underline flex-1  p-3 bg-indigo-900 text-white flex justify-center items-center uppercase text-xl whitespace-nowrap hover:opacity-90 transition-opacity duration-500
`

export default GlobalButton