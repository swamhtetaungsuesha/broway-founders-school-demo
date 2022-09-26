import React from 'react'
import ImageHandle from '../ImageHandle'
import tw from 'tailwind-styled-components/dist/tailwind'
import Link from 'next/link'

const EventsComponent = ({items}) => {
  return (
    <Wrapper>
        <Heading>Upcoming Events</Heading>
        <ItemsContainer>
            {
                items.map(item=>(
                    <Link href={'/posts/events/'+item._id} passHref key={item._id}>
                        <ItemWrapper>
                            <ImageWrapper>
                            <ImageHandle className='w-full h-[400px] object-cover group-hover:scale-150 transition-transform duration-500'    errorImg="https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg"
                                                        placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item.avatar} alt={item.avatar} />
                            </ImageWrapper>
                            <Title>{item.title}</Title>
                            <EventDate>
                                            <Day>{item.sub_title.split(',')[0]}</Day>
                                            {item.sub_title.split(',')[1]}
                                        </EventDate>
                            
                        </ItemWrapper>
                    </Link>
                ))
            }
        </ItemsContainer>
        <Link href='/posts/events' passHref>
        
            <ButtonWrapper>
                SEE ALL EVENTS
            </ButtonWrapper>
        </Link>
    </Wrapper>
  )
}

export default EventsComponent

const Wrapper = tw.section`
flex flex-col items-center mx-auto max-w-7xl font-serif gap-20
`

const Heading = tw.h3`
text-4xl font-bold text-indigo-900  uppercase text-center
`

const ItemsContainer = tw.div`
flex items-center justify-between gap-4 md:flex-row flex-col
`

const ItemWrapper = tw.a`
relative group overflow-hidden
`

const ImageWrapper = tw.div``

const Title = tw.h3`
absolute top-0 left-0 w-full h-full text-3xl font-bold flex items-center justify-center text-center text-white bg-slate-900/50
`

const EventDate = tw.div`
absolute top-0 left-0 bg-red-600 text-white  w-24 h-24 flex flex-col items-center justify-center
`

const Day = tw.h3`
text-3xl 
`

const ButtonWrapper = tw.a`
p-3 text-2xl  bg-red-600 text-white hover:opacity-80
`