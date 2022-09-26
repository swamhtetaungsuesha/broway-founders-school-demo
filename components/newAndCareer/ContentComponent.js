import React from 'react'
import DetailContent from './DetailContent'
import OtherContent from './OtherContent'
import tw from 'tailwind-styled-components/dist/tailwind'
import CareerBox from './CareerBox'

const ContentComponent = ({content,other,title}) => {
  return (
    <Wrapper >

      <DetailContent item={content}/>
      <RightWrapper>

      <OtherContent items={other.slice(0,3)}/>


          <CareerBox title={title}/>

      </RightWrapper>
      
      
    </Wrapper>
  )
}

export default ContentComponent

const Wrapper = tw.section`
grid md:grid-cols-3 max-w-6xl mx-auto px-2 grid-cols-1 gap-3
`

const RightWrapper = tw.div`
flex flex-col  gap-5
`