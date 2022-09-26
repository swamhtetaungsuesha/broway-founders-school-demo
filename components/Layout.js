import React,{useState,useCallback, useContext} from 'react'
import MSNavbar from './Navbar/MobileSizeNavbar/MSNavbar'
import MainFooter from './Footer/MainFooter'
import GlobalButton from './GlobalButton'
import DSNavbar from './Navbar/DeskstopSizeNavbar/DSNavbar'
import SNNavbar from './Navbar/ScrollNavbar/SNNavbar'
import SearchBar from './SearchBar'
import { DataContext } from '../store/GlobalState'


const Layout = ({children}) => {
  const [isToggledSearchBar,setIsToggledSearchBar] = useState(false)
  const {state,dispatch} = useContext(DataContext)
  const {menuItems} = state
  const handleToggleSearchBar = useCallback(
    (value) => {
      setIsToggledSearchBar(value)
    },
    [isToggledSearchBar],
  )
  


  return (
    <div className='font-serif'>
        
        {
          menuItems.length!==0&&
          <>
          <DSNavbar handleToggleSearchBar={handleToggleSearchBar}/>
        <SNNavbar/>
        <MSNavbar handleToggleSearchBar={handleToggleSearchBar}/>
        <SearchBar isToggledSearchBar={isToggledSearchBar} handleToggleSearchBar={handleToggleSearchBar}/>
        {children}
        <GlobalButton/>
        <MainFooter/>
          </>
        }
    </div>
  )
}

export default Layout