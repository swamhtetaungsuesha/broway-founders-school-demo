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
                    Blogs
                </title>
            </Head>
            <Layout category={props.selectedCategory}>
                <Wrapper>
                    <ItemsContainer>
                        {
                            props.blogs.map((blog,index)=>(
                                <ItemWrapper key={index}>
                                    <ImageWrapper>
                                    <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={blog.avatar} alt={blog.avatar} className='object-cover w-full h-full'/>
                                    </ImageWrapper>
                                    <Title>{blog.title}</Title>
                                    <Content>{tagCutString(blog.content,20)}</Content>
                                    <Link href={`${props.selectedCategory.routerPath}/${blog._id}`} passHref>
                                        <Button>
                                            Read More
                                        </Button>
                                    
                                    </Link>
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

`

const ItemsContainer = tw.div`
grid lg:grid-cols-3 gap-3 text-center sm:grid-cols-2 grid-cols-1 
`

const ItemWrapper = tw.div`
shadow-lg p-3 rounded-lg flex flex-col justify-between gap-4 items-center
`

const ImageWrapper = tw.div`
h-[250px] w-full
`

const Title = tw.h3`
text-xl text-indigo-600 
`

const Content = tw.p`
text-sm text-slate-700/60
`
const Button = tw.a`
text-lg border border-red-600  text-white  rounded-full bg-red-600 px-5 py-1 hover:underline decoration-1
`

export async function getStaticProps() {

    const res = await getPrimary('/posts/blogs')


    return {
        props: {
            result: res.result,
            selectedCategory: res.selectedCategory,
            blogs: res.items
        },
    }
}