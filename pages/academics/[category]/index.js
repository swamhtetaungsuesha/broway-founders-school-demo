import React,{useState} from 'react'
import { getData } from '../../../utils/fetchData'
import Head  from 'next/head'
import Layout from '../../../components/PageLayout/Layout'
import AnimateHeight from 'react-animate-height'
import tw from 'tailwind-styled-components/dist/tailwind'
import {MdKeyboardArrowRight} from 'react-icons/md'

const Academics = (props) => {
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
        <title>{props.selectedCategory.title}</title>
      </Head>
    <Layout category={props.selectedCategory} >
      <Wrapper>
        <ItemsContainer>
          {
            props.items.map((item,index)=>(
              <ItemWrapper key={index}>
                <Heading onClick={()=>handleClick(index)} aria-controls="example-panel" $isOpened={indexArr.includes(index)}>
                  <MdKeyboardArrowRight className={`${ indexArr.includes(index)&&'rotate-90 origin-center'} transition duration-500`}/>
                  {item.title}

                </Heading>
                <AnimateHeight 
                  id="example-panel"
                    duration={500}
                    height={indexArr.includes(index)?'auto':0} 
                    >
                <Content dangerouslySetInnerHTML={{__html: item.content}}/>
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

export default Academics

const Wrapper = tw.section`

`

const ItemsContainer = tw.div`
grid grid-cols-1 divide-y divide-white
`

const ItemWrapper = tw.div`

`

const Heading = tw.h3`
${(p) => (p.$isOpened ? "bg-indigo-900 text-white" : "bg-slate-700/30 text-slate-700 hover:bg-slate-700/60")}
  p-4 sm:text-2xl text-lg flex items-center transition duration-500 cursor-pointer
`

const Content = tw.div`
cms-content  px-4 font-content  sm:text-base  text-sm
`

export async function getServerSideProps(context) {
  const { params } = context
  
  const res = await getData(`academic/${params.category}`)

  
  return {
    props: {
      selectedCategory  : res.selectedCategory,
      items:res.items
    },
  }
}