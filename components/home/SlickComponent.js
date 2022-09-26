import React from 'react'
import ImageHandle from '../ImageHandle'
import tw from 'tailwind-styled-components/dist/tailwind'
import Slider from "react-slick";
import { tagCutString } from '../../utils/dateFormat';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import Image from 'next/image';
const SlickComponent = ({admissionItems}) => {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    useCSS: 1,
    slidesToScroll: 1,
    autoplay: true,
      speed: 1000,
      autoplaySpeed: 10000,
      cssEase: "ease",
    initialSlide: 0,
    fade: true,
    className: 'slick-slider-fade',
    arrows: false,
    dotsClass:'custom-dots',
    appendDots: dots => <IndexContainer>{dots}</IndexContainer>,
    customPaging: i => (
      <PageIndexWrapper>
        {i+1}
      </PageIndexWrapper>
    )
  };
  return (
            <Wrapper>
        <Slider {...settings}>
          {
            admissionItems.map(item=>(
              <AdmissionWrapper key={item._id._id}>
                  <div className='w-full h-full  bg-slate-700/40 absolute top-0 right-0'></div>
                <ImageWrapper>
                  
                <ImageHandle className='w-full min-h-[400px] object-cover'    errorImg="/images/coverForAllPath.jpg"
                                                    placeholderImg="https://via.placeholder.com/400x200.png/FFFFFF/FFFFFF?text=This+Will+Be+Shown+Before+Load" src={item._id.avatar} alt={item._id.avatar} />
                </ImageWrapper>
                <ItemWrapper>

                    <SlickTitle>
                    {item._id.title}
                    </SlickTitle>
                    <Content>{tagCutString(item._id.content,20)}</Content>
                    <Link href={item._id.routerPath} passHref>
              
                      <ButtonWrapper>
                        <Text>
                         {item._id.sub_title}
                        </Text>
                        <BsFillArrowRightCircleFill className='transition-all duration-500 group-hover:translate-x-10 group-hover:invisible group-hover:opacity-0 group-hover:text-red-600' />
                      </ButtonWrapper>
                    </Link>
                </ItemWrapper>
              </AdmissionWrapper>
            ))
          }
        </Slider>
        </Wrapper>
  )
}

export default SlickComponent

const Wrapper = tw.section`
w-full overflow-hidden max-h-[570px]  font-serif 
`

const AdmissionWrapper = tw.div`
w-full relative max-h-[570px] 
`

const ImageWrapper = tw.div`
w-full 
`

const ItemWrapper = tw.div`
absolute  md:bottom-12 md:left-12 bottom-8  left-0  w-full  text-white flex flex-col items-start gap-2 sm:gap-8 md:max-w-2xl lg:max-w-3xl p-4 z-50
`

const SlickTitle = tw.h3`
sm:text-5xl  text-4xl font-bold
`

const Content = tw.p`
sm:text-3xl text-xl 
`

const ButtonWrapper = tw.a`
no-underline text-white  md:text-2xl text-xl flex justify-between border-4 border-white md:min-w-[300px] min-w-[250px] items-center gap-6  sm:p-5 p-3 group transition-all duration-500
`

const Text = tw.p`
transition-all duration-500 group-hover:translate-x-1/3

`

const IndexContainer = tw.ul`
flex md:flex-col items-center gap-2  z-40 absolute md:top-1/2 top-8 md:-translate-y-1/2 translate-y-0 md:right-5 right-3
`
const PageIndexWrapper = tw.button`
border-2 border-slate-300/50 text-white rounded-full w-[40px] h-[40px] flex items-center justify-center
`

// https://i0.wp.com/www.wembleyps.wa.edu.au/wp-content/uploads/2021/02/Wembley-PS-211.jpg?resize=1030%2C685