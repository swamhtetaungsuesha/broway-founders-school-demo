import Link from 'next/link'
import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
const CareerBox = ({title}) => {
  return (
    <>
    {title==='careers'
    &&
    <Wrapper>
        <Heading>Interested in Applying?</Heading>
        <Link href='/form_career_application' passHref>
        
          <Button>Apply Now</Button>
        </Link>
    </Wrapper>
  
    }
    </>
  )
}

export default CareerBox

const Wrapper = tw.section`
h-72 flex flex-col items-start justify-evenly bg-slate-100 p-3  gap-5
`

const Heading = tw.h3`
text-4xl text-indigo-900 font-bold uppercase
`

const Button = tw.a`
text-2xl text-white uppercase bg-indigo-900 p-3
`