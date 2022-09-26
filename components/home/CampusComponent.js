import Link from 'next/link'
import React, { useContext } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { DataContext } from '../../store/GlobalState'
import ImageHandle from '../ImageHandle'

const CampusComponent = () => {
    const { state,dispatch } = useContext(DataContext)
    const { menuItems } = state

  return (
    <Wrapper>
       {
        menuItems.filter(item=>item._id.routerPath==='/posts/campus')[0].items.map(item=>(
          <Link href={`/posts/campus/${item._id}`} passHref key={item._id}>
          
            <ItemWrapper >
                        <ImageWrapper>
                            <ImageHandle className='w-full h-[400px] object-cover'    errorImg="https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg"
                                                    placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={item.avatar} alt={item.avatar} />
                        </ImageWrapper>
                        <TextWrapper>

                                <Title>{item.title}</Title>
                               
                        
                        
                        </TextWrapper>
                    </ItemWrapper>
          </Link>
        ))
       }
    </Wrapper>
  )
}

export default CampusComponent

const Wrapper = tw.section`
col-span-2 bg-white grid md:grid-cols-6 grid-cols-1  font-serif
`

const ItemWrapper = tw.a`
relative lg:col-span-2 lg:first:col-span-3 campus_layout group md:col-span-3 md:first:col-span-6
`

const ImageWrapper = tw.div`
w-full h-full
`

const TextWrapper = tw.div`
absolute w-full h-full top-0 left-0 flex  items-end   justify-start gap-6 p-2 bg-gray-900/70 hover:bg-gray-900/40  text-white  font-bold md:p-10 p-5 transition-all duration-1000
`


const Title = tw.h3`
md:text-4xl text-2xl uppercase relative after:transition-all after:duration-300 after:w-0 group-hover:after:w-2/3 after:h-1  after:absolute after:bg-red-600 after:-bottom-4 after:left-0 
`


