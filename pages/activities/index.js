import React,{useState} from 'react'
import Head from 'next/head'
import Layout from '../../components/PageLayout/Layout'
import { getData } from '../../utils/fetchData'
import {BiPlusMedical} from 'react-icons/bi'
import {ImMinus} from 'react-icons/im'
import tw from 'tailwind-styled-components/dist/tailwind'
import ImageHandle from '../../components/ImageHandle'
import AnimateHeight from 'react-animate-height'
import { getPrimary } from '../../middleware/serverLogic'

const Activities = (props) => {
  const [indexArr,setIndexArr] = useState([])


      const handleClick = index => {
        let Arr = [...indexArr]
        if(Arr.includes(index)){
            const i = Arr.indexOf(index)
            Arr.splice(i, 1)
        }else{

            Arr.push(index)
        }
        setIndexArr(Arr)
    }

  return (
    <>
       <Head>
        <title>Activities</title>
      </Head>
    <Layout category={props.selectedCategory} >
      <Wrapper>
        <ItemsContainer>
          {
            props.activities.map((activity,index)=>(
              <ItemWrapper key={index}>
                <TitleWrapper onClick={()=>handleClick(index)} aria-controls="example-panel">
                  <Title>{activity.title}</Title>
                  {
                                    indexArr.includes(index)?<ImMinus/>:<BiPlusMedical/>
                                }
                </TitleWrapper>
                <AnimateHeight 
                    id="example-panel"
                    duration={500}
                    height={indexArr.includes(index)?'auto':0} 
                    style={{
                      "padding" : "0 10px",
                      "overflow" : "hidden"
                    }}
                >
                    <ImageWrapper>
                    
                  <ImageHandle    errorImg='https://www.cheshirehomechoice.org.uk/choice/images/shared/noimagethumb.jpg'
                                      placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load" src={activity.avatar} alt={activity.avatar} className='object-cover w-full h-full'/>
                    </ImageWrapper>
                  <Content dangerouslySetInnerHTML={{__html: activity.content}}/>
                </AnimateHeight>
              </ItemWrapper>
            ))
          }
        </ItemsContainer>
      </Wrapper>
    </Layout>
    </>
  )
}

const Wrapper = tw.section``

const ItemsContainer = tw.div``

const ItemWrapper = tw.div`
bg-slate-100 my-4 border-y border-red-600 group
`

const TitleWrapper = tw.div`
flex justify-between items-center text-red-600  sm:text-4xl text-2xl p-2 cursor-pointer
`

const Title = tw.h3`
font-bold
`



const Content = tw.div`
cms-content  sm:px-4 font-content  sm:text-base  text-sm 
`

const ImageWrapper = tw.div`
 sm:w-60 w-full float-right 
`

export default Activities

export async function getStaticProps() {

    const res = await getPrimary(`/activities`)
  
    return {
      props: {
        result : res.result,
        selectedCategory : res.selectedCategory,
        activities : res.items
      },
    }
  }