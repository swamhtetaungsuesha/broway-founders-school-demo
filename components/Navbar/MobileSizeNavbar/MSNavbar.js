import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState,useCallback } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { DataContext } from '../../../store/GlobalState'
import CategoryNavbar from './CategoryNavbar'
import ItemNavbar from './ItemNavbar'
import UpperNavbar from './UpperNavbar'
const MSNavbar = ({handleToggleSearchBar}) => {
  const router = useRouter()
  const [isMenuOpened,setIsMenuOpened] = useState(false)
  const [items,setItems] = useState([])
  const { state, dispatch } = useContext(DataContext)
  const { menuItems } = state
  const [sideMenuID,setSideMenuID] = useState(null)
  useEffect(()=>{
    setSideMenuID(null)
  },[isMenuOpened])
  useEffect(()=>{
    const filteredItems = menuItems.filter(item=>item.items.length!==0)
    setItems(filteredItems)

  },[])
  useEffect(() => {
    setIsMenuOpened(false)

  }, [router])
  
  const handleMenuOpen = useCallback(
    (value) => {
      setIsMenuOpened(value)
    },
    [isMenuOpened],
  )
  const handleMenuID = useCallback(
    (value) => {
      setSideMenuID(value)
    },
    [isMenuOpened],
  )
  return (
    <Wrapper>
        <UpperNavbar isMenuOpened={isMenuOpened} handleMenuOpen={handleMenuOpen} handleToggleSearchBar={handleToggleSearchBar}/>
        <CategoryNavbar isMenuOpened={isMenuOpened} menuItems={menuItems} handleMenuID={handleMenuID}/>
        {
          items.map((menuItem,index)=>(
            <ItemNavbar key={index} item={menuItem} isToggled={sideMenuID===menuItem._id._id?true:false} handleMenuID={handleMenuID}/>
          ))
        }
        
    </Wrapper>
  )
}

export default MSNavbar

const Wrapper = tw.header`
w-full sticky top-0 lg:hidden z-50 
`
