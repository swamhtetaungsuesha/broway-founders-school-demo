import React from 'react'
import { getData } from '../../utils/fetchData'
import tw from 'tailwind-styled-components/dist/tailwind'
import { stringCutFormat } from '../../utils/dateFormat'
import ImageHandle from '../../components/ImageHandle'
import NavigationLink from '../../components/PageLayout/NavigationLink'
import Head from 'next/head'

const LeadershipContent = (props) => {

  return (
    <Wrapper>
      <Head>
        <title>Welcome Message From Our {props.selectedLeadership.title}</title>
      </Head>
        <NavigationLink first='about us' second='leadership' third={`welcome message from our ${stringCutFormat(props.selectedLeadership.title,true)}`} path='/leadership'/>
      <Container>
        <ImageWrapper>
                      
          <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
              placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={props.selectedLeadership.avatar} alt={props.selectedLeadership.avatar} className='object-cover w-full h-full'/>
          </ImageWrapper>
          <LeftWrapper>

            <Title>Welcome message from our {props.selectedLeadership.title}</Title>
            <Name>{props.selectedLeadership.sub_title}</Name>
            <Content dangerouslySetInnerHTML={{__html: props.selectedLeadership.content}}/>
            <Foot>
              <LittleName>

              {props.selectedLeadership.sub_title}
              </LittleName>
              <Role>
                {props.selectedLeadership.title}

              </Role>

            </Foot>
          </LeftWrapper>
      </Container>
    </Wrapper>
  )
}

export default LeadershipContent

const Wrapper = tw.div``

const Container = tw.section`
max-w-6xl mx-auto  p-4
`

const ImageWrapper = tw.div`
float-right md:w-1/2 w-full md:p-4 mx-auto
`

const LeftWrapper = tw.div`

`

const Title = tw.h3`
text-indigo-900 lg:text-6xl sm:text-5xl text-4xl font-bold my-6 py-3 after:w-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-red-600 relative capitalize
`

const Name = tw.h3`
text-2xl text-slate-700/70 font-bold my-10
`

const Content = tw.div`
cms-content   font-content  sm:text-base  text-sm
`
const Foot = tw.div``

const Role = tw.h3`
text-slate-700/80 text-lg
`

const LittleName = tw.h5`
text-2xl text-indigo-900 font-bold
`

export async function getServerSideProps(context) {
    const { params } = context
    
    const res = await getData(`leadership/${params.id}`)

  
    return {
      props: {
        selectedCategory : res.selectedCategory,
        selectedLeadership : res.item
      },
    }
  }