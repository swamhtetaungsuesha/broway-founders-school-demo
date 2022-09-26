import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'

const WelcomeComponent = () => {
  return (
    <Wrapper>
        <Title>
                <Red>Welcome to BROWAY Founders School - Yangon</Red>
                Offering the National Curriculum 
                  <br/>
                 for England
        </Title>
        <Content>
        We are the choice for parents seeking an affordable, high quality education in Yangon
        </Content>
        <Container>

            <LeftWrapper>
                <iframe src="https://player.vimeo.com/video/726713542?h=951cecb117" width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
            </LeftWrapper>
    
        </Container>
    </Wrapper>
  )
}

export default WelcomeComponent

const Wrapper = tw.section`
 font-serif my-5 flex flex-col gap-8 px-2 w-full items-center 
`

const Title = tw.div`
text-center md:text-5xl text-4xl text-indigo-900 font-extrabold  flex flex-col items-center gap-4 my-20 relative after:w-24 after:h-1 after:bg-red-600 after:absolute after:-bottom-10 after:left-1/2 after:-translate-x-1/2 
`

const Red = tw.h5`
md:text-2xl text-xl text-red-600  my-3 uppercase
`

const Container = tw.div`
grid  grid-cols-1  md:divide-x-8 divide-slate-200 w-full
`

const LeftWrapper = tw.div`
p-2 flex items-center  w-full md:h-[500px] h-[300px]
`

const RightWrapper = tw.div`
flex items-center p-4
`

const Content = tw.p`
text-2xl font-light text-slate-700/80 text-justify text-center
`