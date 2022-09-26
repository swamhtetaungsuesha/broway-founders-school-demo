import React, { useContext } from 'react'
import ContentComponent from './ContentComponent'
import NavigationLink from './NavigationLink'
import tw from 'tailwind-styled-components/dist/tailwind'
import CategoryList from './CategoryList'
import { HandleMenuList } from '../../utils/setting'
import { DataContext } from '../../store/GlobalState'



const Layout = ({children,category}) => {
  const { state, dispatch } = useContext(DataContext)
  const { menuItems } = state
  return (
    <Wrapper>
        <NavigationLink first={category.field} second={category.title} path={category.routerPath}/>
        <UpperWrapper>
            
            <ContentComponent category={category}  />
            {children}
            <CategoryList items={HandleMenuList(category.field,menuItems,category.routerPath)} title={category.field}/>
            
        </UpperWrapper>
        
    </Wrapper>
  )
}

export default Layout

const Wrapper = tw.div``

const UpperWrapper = tw.div`
 mx-auto max-w-6xl gap-5 grid grid-cols-1
`

const LowerWrapper = tw.div``