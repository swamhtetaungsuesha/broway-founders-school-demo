import { useRouter } from 'next/router'
import React,{useState} from 'react'
import {  FaSearch } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import tw from 'tailwind-styled-components/dist/tailwind'

const SearchBar = ({isToggledSearchBar,handleToggleSearchBar}) => {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(searchValue){

            router.push(`/search?q=${searchValue.split(' ').join('+')}`)
            setSearchValue('')
            handleToggleSearchBar(false)
        }
        return
    }
  return (
    <Wrapper $isToggledSearchBar={isToggledSearchBar}>
        <CloseWrapper onClick={()=>handleToggleSearchBar(false)}>
                <ImCross/>
            </CloseWrapper>
        <Container>

            <SearchWrapper onSubmit={handleSubmit}>
                <InputBar placeholder='What would you like to search for?' value={searchValue.toLowerCase()} onChange={(e)=>setSearchValue(e.target.value)}/>
                <SubmitButton type='submit'>
                    <FaSearch/>
                </SubmitButton>
            </SearchWrapper>
        
        </Container>
    </Wrapper>
  )
}

export default SearchBar

const Wrapper = tw.section`
${(p)=>(p.$isToggledSearchBar?'top-0':'-top-full')}
fixed  w-full left-0 bg-slate-50 border border-slate-200  py-5 z-50 flex flex-col items-end px-3 gap-2 transition-all duration-500 ease
`

const Container = tw.div`
max-w-[700px] w-full mx-auto flex items-center justify-around gap-3 relative
`

const SearchWrapper = tw.form`
flex  gap-2  px-3 py-1 w-full
`

const InputBar = tw.input`
appearance-none rounded-l rounded-r   border border-gray-400 border-b block pl-4  w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none
`

const SubmitButton = tw.button`
text-white  p-3 sm:text-2xl text-xl bg-indigo-900 rounded hover:opacity-70 transition-opacity duration-500
`

const CloseWrapper = tw.div`
text-white bg-red-600 text-3xl p-3 cursor-pointer hover:opacity-70 transition-opacity duration-500
`


