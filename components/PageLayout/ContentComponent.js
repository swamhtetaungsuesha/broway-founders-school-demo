import React from 'react'
import ImageHandle from '../ImageHandle'
import tw from 'tailwind-styled-components/dist/tailwind'

const ContentComponent = ({category}) => {

  return (
    <Wrapper>
        <ImageWrapper>
        <ImageHandle    errorImg='/images/coverForAllPath.jpg'
                placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={category.avatar} className='w-full' alt={category.avatar}/>
        </ImageWrapper>
        <ContentWrapper>
            <Heading>
                {category.title}
            </Heading>
            <Content dangerouslySetInnerHTML={{__html: category.content}}/>
        </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = tw.section`
bg-white 
`

const ImageWrapper = tw.div`
w-full
`

const ContentWrapper = tw.div`
relative sm:px-10 mx-auto
`

const Heading = tw.h3`
sm:absolute w-full sm:w-fit bg-indigo-900 font-semibold text-white  text-3xl uppercase sm:-top-6 sm:left-6 p-3 
`

const Content = tw.div`
cms-content sm:py-10 px-4 font-content  sm:text-base  text-sm py-5
`

export default ContentComponent