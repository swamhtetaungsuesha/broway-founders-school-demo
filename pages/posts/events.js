import Head from 'next/head'
import React from 'react'
import Layout from '../../components/PageLayout/Layout'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../../components/ImageHandle'
import { tagCutString } from '../../utils/dateFormat'
import { getData } from '../../utils/fetchData'
import Link from 'next/link'
import { getPrimary } from '../../middleware/serverLogic'

const Blogs = (props) => {
    return (
        <>
            <Head>
                <title>
                    Events
                </title>
            </Head>
            <Layout category={props.selectedCategory}>
                <Wrapper>
                    <ItemsContainer>
                        {
                            props.items.map((item,index)=>(
                                <ItemWrapper key={index}>
                                    <ImageWrapper>
                                    <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item.avatar} alt={item.avatar} className='object-cover w-full h-full'/>
                                    </ImageWrapper>
                                    <EventDate>
                                        <Day>{item.sub_title.split(',')[0]}</Day>
                                        {item.sub_title.split(',')[1]}
                                    </EventDate>
                                    <TextWrapper>

                                        <Title>{item.title}</Title>
                                        <Content>{tagCutString(item.content,20)}</Content>
                                        <Link href={`${props.selectedCategory.routerPath}/${item._id}`} passHref>
                                            <Button>
                                                Learn More
                                            </Button>
                                        
                                        </Link>
                                    </TextWrapper>
                                </ItemWrapper>
                            ))
                        }
                    </ItemsContainer>
                </Wrapper>
            </Layout>
        </>
    )
}

export default Blogs

const Wrapper = tw.section`
font-serif
`

const ItemsContainer = tw.div`
grid sm:grid-cols-2 gap-3 grid-cols-1
`

const ItemWrapper = tw.div`
shadow-lg  rounded-sm flex flex-col justify-start  items-start relative bg-white 
`

const ImageWrapper = tw.div`
h-[250px] w-full
`

const EventDate = tw.div`
absolute top-0 left-0 bg-red-600 text-white  w-24 h-24 flex flex-col items-center justify-center
`

const Day = tw.h3`
text-3xl 
`
const TextWrapper = tw.div`
flex flex-col items-start gap-3 p-4 justify-between h-full
`
const Title = tw.h3`
text-3xl text-indigo-900 
`

const Content = tw.p`
text-lg text-slate-700/60
`
const Button = tw.a`
text-lg border border-red-600  text-white   bg-red-600 py-3 px-5 hover:underline decoration-1
`

export async function getStaticProps() {

    const res = await getPrimary('/posts/events')


    return {
        props: {
            result: res.result,
            selectedCategory: res.selectedCategory,
            items: res.items
        },
    }
}