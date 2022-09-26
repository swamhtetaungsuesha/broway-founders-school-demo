import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { ImCross } from 'react-icons/im'
import {GoArrowLeft,GoArrowRight} from 'react-icons/go'
import { HiChevronDoubleLeft,HiChevronLeft,HiChevronRight,HiChevronDoubleRight } from 'react-icons/hi'
import { filterSearch } from '../utils/filterSearch'
import Layout from '../components/PageLayout/Layout'
import ImageHandle from '../components/ImageHandle'
import tw from 'tailwind-styled-components/dist/tailwind'

const PhotoGallery = (props) => {
    const router = useRouter()
    const [photos, setPhotos] = useState(props.photos)
    const [page, setPage] = useState(1)
    const [showPhoto, setShowPhoto] = useState({})
    const [showIndex, setShowIndex] = useState()
    const handlePage = (pageNumber) => {
        setPage(pageNumber)
        filterSearch({ router, page: pageNumber })
    }
    const handleShowImage = (photo,i) => {
        setShowPhoto({...photo})
        setShowIndex(i)
    }
    useEffect(() => {
        setPhotos(props.photos)
    }, [props.photos])
    useEffect(() => {

            if (router.query.page) setPage(Number(router.query.page))

    }, [])

    const handleDecreaseIndex = () => {
        const i = showIndex === 0 ? 5 : showIndex-1

        const addPhoto = photos.slice(i,i+1)
        handleShowImage(...addPhoto,i)
    }

    const handleIncreaseIndex = () => {
        const i = showIndex === 5 ? 0 : showIndex+1

        const addPhoto = photos.slice(i,i+1)
        handleShowImage(...addPhoto,i)
    }

    return (
        <>
         <Head>
            <title>Photo Gallery</title>
        </Head>
        <Layout category={props.selectedCategory}>

                    <Wrapper>
                        <ShowImageContainer $isShowed = {Object.keys(showPhoto).length !== 0?true : false}>
                            <ShowImageWrapper $isShowed = {Object.keys(showPhoto).length !== 0?true : false}>

                                <UpperWrapper>
                                    <CountWrapper>
                                        <ArrowButton onClick={handleDecreaseIndex} >
                                            <GoArrowLeft/>
                                        </ArrowButton>
                                        <CountHeading >{showIndex+1} of 6</CountHeading>
                                        <ArrowButton onClick={handleIncreaseIndex} >
                                            <GoArrowRight/>
                                        </ArrowButton>
                                    </CountWrapper>
                                    <RemoveWrapper onClick={() => setShowPhoto({})}>
                                        <ImCross className='m-2'/>
                                    </RemoveWrapper>
                                </UpperWrapper>
                                <ImageWrapper className='max-w-3xl  max-h-full block leading-none  mx-auto '>
                                <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={showPhoto.avatar} alt={showPhoto.avatar} className='w-full h-full'/>
                                
                                </ImageWrapper>
                                

                                <Heading>{showPhoto.title}</Heading>
                            </ShowImageWrapper>
                        </ShowImageContainer>
                        <ButtonsContainer>
                            {page>1&&
                                <>
                                    <PageButton onClick={()=>handlePage(1)} ><HiChevronDoubleLeft />First</PageButton>
                                    
                                    <PageButton onClick={()=>handlePage(page-1)} ><HiChevronLeft />Previous</PageButton>
                                </>
                            }
                            {
                                [...Array(Math.ceil(props.allCount/6))].map((e,i)=>(
                                    <NumberButton key={i} onClick={()=>handlePage(i+1)} $isPage={page===i+1}>{i+1}</NumberButton>
                                ))
                            }
                            {page<Math.ceil(props.allCount/6)&&
                                <>
                                    <PageButton onClick={()=>handlePage(page+1)} >Next<HiChevronRight /></PageButton>

                                    <PageButton onClick={()=>handlePage(Math.ceil(props.allCount/6))} >Last<HiChevronDoubleRight /></PageButton>
                                </>
                            }

                        </ButtonsContainer>
                        <ItemsContainer>
                                {
                                    photos.map((photo,i) => (
                                        <ItemWrapper key={photo._id}>
                                            <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                                placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" className='w-full h-full object-cover' src={photo.avatar} alt={photo.avatar} onClick={() => handleShowImage(photo,i)}/>
                                        
                                            
                                        </ItemWrapper>
                                    ))
                                }
                        </ItemsContainer>
                    </Wrapper>
 
       
        </Layout>
        
        </>
    )
}

const Wrapper = tw.section`
mx-3
`

const ShowImageContainer = tw.div`
${(p) => (p.$isShowed ? 'visible opacity-100 ' : 'invisible opacity-0')}
fixed top-0 left-0  z-50 flex flex-col items-center  justify-center w-full h-screen py-10 
`
const ShowImageWrapper = tw.div`
${(p) => (p.$isShowed ? 'max-h-screen' : 'max-h-0')}
bg-white p-2 mx-2 relative  flex flex-col justify-center items-center   transition-all duration-500 ease-in-out rounded-md border border-slate-800/40

`

const UpperWrapper = tw.div`
flex justify-between items-center w-full my-1
`

const CountWrapper = tw.div`
flex justify-center items-center
`

const ArrowButton = tw.div`
text-slate-800/40  bg-white  hover:text-slate-800 border border-slate-800/40 rounded-full
`

const CountHeading = tw.h3`
font-number  text-slate-800/70 mx-1
`

const ImageWrapper = tw.div`
max-w-3xl  max-h-full block leading-none  mx-auto
`

const Heading = tw.h3`
font-number  text-slate-800/70
`

const RemoveWrapper = tw.div`
text-slate-800/40 absolute -top-2 -right-2 bg-white  hover:text-slate-800 border border-slate-800/40 rounded-full
`

const ButtonsContainer = tw.div`
flex items-center justify-end flex-wrap my-5
`

const PageButton = tw.button`
sm:text-base text-sm border-slate-800/40 border hover:bg-slate-800/10 transition   flex items-center justify-start sm:py-2 sm:px-4 py-1 px-2
`

const NumberButton = tw.button`
${(p) => (p.$isPage ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/10')}
sm:text-base text-sm border-slate-800/40 border  transition   flex items-center justify-start sm:py-2 sm:px-4 py-1 px-2
`

const ItemsContainer = tw.div`
w-full grid grid-cols-3 gap-2
`

const ItemWrapper = tw.div`
w-full
`



export default PhotoGallery

export async function getServerSideProps({ query }) {

    const page = query.page || 1


    const res = await getData(`photo?page=${page}`)

    return {
        props: {
            result: res.result,
            selectedCategory: res.selectedCategory,
            photos: res.photos,
            allCount: res.allCount
        },
    }
}