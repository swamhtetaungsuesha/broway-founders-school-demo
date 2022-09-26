import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { mdyFormat, tagCutString } from '../../utils/dateFormat'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import {WiTime10} from 'react-icons/wi'
import tw from 'tailwind-styled-components/dist/tailwind'
import { filterSearch } from '../../utils/filterSearch'

const ItemsComponent = ({ items,result,path }) => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const handleLoadMore = () => {
    setPage(page+1)
    filterSearch({router,page:page+1})
  }
  useEffect(() => {
    if(Object.keys(router.query).length === 0) {
      setPage(1)
    }else{
      if(router.query.page) setPage(router.query.page)
    }
  },[router.query])
  return (
    <Wrapper>
      <ItemsContainer>
        {
          items.map(item => (
            <ItemWrapper key={item._id}>
              <Heading>{item.title} {item.sub_title&&`(${item.sub_title})`}</Heading>
              <Content>{tagCutString(item.content)}</Content>
              <DateWrapper><WiTime10/> {mdyFormat(item.createdAt)}</DateWrapper>
              <Link href={`${path}/${item._id}`} passHref>
              
                <ButtonWrapper>
                  <Text>
                    View More
                  </Text>
                  <BsFillArrowRightCircleFill className='transition-all duration-500 group-hover:translate-x-10 group-hover:invisible group-hover:opacity-0 group-hover:text-red-600' />
                </ButtonWrapper>
              </Link>
            </ItemWrapper>
          ))
        }
      </ItemsContainer>
      {result < page * 6?''
                    :<MoreWrapper >
                      Click to Preview
                      <LoadMoreButton onClick={handleLoadMore}>
                          Load More Results
                      </LoadMoreButton>
                     
                    </MoreWrapper>}
      
    </Wrapper>
  )
}

const Wrapper = tw.div`
 flex flex-col items-start  gap-3
`

const ItemsContainer = tw.div``

const ItemWrapper = tw.div`
flex flex-col items-start p-4 border-b-2 border-red-600 gap-5 border-dashed
`

const Heading = tw.h3`
sm:text-3xl text-2xl text-indigo-900 font-bold after:w-8 after:h-1 after:absolute after:bg-red-600 relative after:-bottom-2 after:left-0
`

const Content = tw.p`
font-content text-sm
`

const DateWrapper = tw.h3`
flex text-indigo-900 items-center gap-2 
`

const ButtonWrapper = tw.a`
no-underline text-indigo-900  hover:border-red-600 flex justify-between border border-indigo-900 min-w-[200px] items-center p-3 group transition-all duration-500
`

const Text = tw.p`
transition-all duration-500 group-hover:translate-x-1/2 group-hover:text-red-600

`

const MoreWrapper = tw.div`
border border-slate-800/40 border-dashed p-3 min-w-[200px] uppercase flex flex-col items-start gap-3 text-slate-800/70 mx-2
`

const LoadMoreButton = tw.button`
 bg-red-600 p-2 text-white rounded hover:bg-red-600/70
`

export default ItemsComponent