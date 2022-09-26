import React from 'react'
import CampusComponent from './CampusComponent'
import tw from 'tailwind-styled-components/dist/tailwind'
const CampusAndComment = () => {
  return (
    <Wrapper>
      <Title>Explore Campus Here</Title>
        <CampusComponent/>

    </Wrapper>
  )
}

export default CampusAndComment

const Wrapper = tw.section`
flex flex-col items-center
`

const Title = tw.h3`
text-center uppercase upperline text-4xl font-serif text-indigo-900 my-20 font-bold border-b-2 border-red-600 py-4 mx-3
`