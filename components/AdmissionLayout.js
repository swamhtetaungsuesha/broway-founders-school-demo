import React from 'react'
import NavigationLink from './PageLayout/NavigationLink'
import tw from 'tailwind-styled-components/dist/tailwind'


const AdmissionLayout = ({category,children}) => {
  return (
    <Wrapper>
        <NavigationLink first={category.field} second={category.title} path={category.routerPath}/>
        <ItemWrapper>
            <Heading>{category.sub_title}</Heading>
            <Content dangerouslySetInnerHTML={{__html: category.content}}/>
            {children}
        </ItemWrapper>
    </Wrapper>
  )
}

export default AdmissionLayout

const Wrapper = tw.section``

const ItemWrapper = tw.div`
 my-10 px-2  max-w-5xl mx-auto flex flex-col w-full gap-4
`

const Heading = tw.h3`
text-indigo-900 lg:text-6xl sm:text-5xl text-4xl font-bold  py-3 after:w-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-red-600 relative uppercase

`

const Content = tw.div`
cms-content   font-content  sm:text-base  text-sm
`