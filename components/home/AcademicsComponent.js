import React from 'react'
import Slider from 'react-slick'
import ImageHandle from '../ImageHandle'
import tw from 'tailwind-styled-components/dist/tailwind'
import { tagCutString } from '../../utils/dateFormat'
import Link from 'next/link'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {IoMdSwap,IoMdArrowDropright,IoMdArrowDropleft} from 'react-icons/io'

function SampleNextArrow(props) {
  const { side,onClick } = props;
  return (
    <ArrowWrapper $side={side} onClick={onClick}>
      <IoMdArrowDropright/>
    </ArrowWrapper>
  );
}

function SamplePrevArrow(props) {
  const { side,onClick } = props;
  return (
    <ArrowWrapper $side={side} onClick={onClick}>
      <IoMdArrowDropleft/>
    </ArrowWrapper>
  );
}

const AcademicsComponent = ({academicsItems}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow side='-right-4'/>,
        prevArrow: <SamplePrevArrow side='-left-4'/>,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
  return (
    <Wrapper>
        <Slider {...settings}>
            {
                academicsItems.map(item=>(
                    <ItemWrapper key={item._id._id}>
                        <ImageWrapper>
                            <ImageHandle className='w-full  object-cover min-h-[450px]'    errorImg="https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg"
                                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item._id.avatar} alt={item._id.avatar} />
                        </ImageWrapper>
                        <TextWrapper>
                            <div className='flex flex-col gap-5'>

                                <Title>{item._id.title}</Title>
                                <Content>{tagCutString(item._id.content,10)}</Content>
                            </div>
                            <Link href={item._id.routerPath} passHref>

                                <ButtonWrapper>
                                    <Text>
                                     Explore More
                                    </Text>
                                    <BsFillArrowRightCircleFill className='transition-all duration-500 group-two-hover:translate-x-10 group-two-hover:invisible group-two-hover:opacity-0 ' />
                                </ButtonWrapper>
                            </Link>
                            <IconWrapper>
                              <IoMdSwap/>
                            </IconWrapper>
                        </TextWrapper>
                    </ItemWrapper>
                ))
            }
        </Slider>
    </Wrapper>
  )
}

export default AcademicsComponent

const Wrapper = tw.section`
max-w-7xl mx-auto   w-full overflow-hidden md:px-5
`

const ItemWrapper = tw.div`
relative group-one
`

const ImageWrapper = tw.div``

const TextWrapper = tw.div`
absolute w-full h-full top-0 left-0 flex flex-col items-center justify-around gap-6 p-2 bg-slate-700/40 text-white text-center font-bold
`


const Title = tw.h3`
text-4xl transition-all duration-1000 lg:group-one-hover:translate-y-0 lg:translate-y-[160px]
`

const Content = tw.p`
text-2xl  transition-all duration-1000 lg:invisible lg:group-one-hover:visible lg:opacity-0 lg:group-one-hover:opacity-100 lg:group-one-hover:translate-y-0 lg:translate-y-8
`

const ButtonWrapper = tw.a`
no-underline lg:opacity-0 lg:group-one-hover:opacity-100 lg:group-one-hover:translate-y-0 lg:translate-y-8  lg:invisible lg:group-one-hover:visible  text-white bg-slate-700/70  border-white  flex justify-between border  min-w-[200px] items-center p-3 group-two transition-all duration-500
`

const Text = tw.p`
transition-all duration-500 group-two-hover:translate-x-1/3

`

const IconWrapper = tw.div`
text-5xl text-slate-200/70  absolute bottom-2 block sm:hidden
`

const ArrowWrapper = tw.div`
${(p) => (p.$side==='-right-4'?'md:-right-4 right-0':'md:-left-4 left-0')}
absolute top-0 text-3xl bg-slate-200 hover:bg-slate-300 p-4 z-40 sm:block hidden
`