import React,{useState} from 'react'
import { GoCalendar } from 'react-icons/go'
import tw from 'tailwind-styled-components/dist/tailwind'


const SiblingDetail = () => {

    const initialState = { full_name:'',sibling_id : '',birth_date : ''}
    const [siblingDetail, setSiblingDetail] = useState(initialState)
  
    const { full_name,sibling_id,birth_date} = siblingDetail
  
    const handleChange=(e) =>{
      const {name, value} = e.target
      setSiblingDetail({...siblingDetail,[name]:value})
      
    }

    return (
        <Wrapper>
            <Item>
                <Label htmlFor='full_name'>Sibling Full Name<span className='text-red-600'>*</span>:</Label>
                <InputBox name='full_name' type='text' value={full_name} onChange={handleChange} />
            </Item>
            <Item>
                <Label htmlFor='sibling_id'>Sibling ID<span className='text-red-600'>*</span>:</Label>
                <InputBox name='sibling_id' type='text' value={sibling_id} onChange={handleChange} />
            </Item>
            <Item>
                <Label htmlFor='birth_date'>Sibling Date of Birth<span className='text-red-600'>*</span>:</Label>

                <DateInputWrapper>
                    <DateInput value={birth_date} name='birth_date' onChange={handleChange} type='date'  />

                    <GoCalendar />
                </DateInputWrapper>
            </Item>
        </Wrapper>
    )
}

export default SiblingDetail

const Wrapper = tw.form`
w-full  grid grid-cols-2 gap-4 
`



const Item = tw.div`
text-left w-full flex flex-col 
`

const Label = tw.label`
text-slate-800 text-lg  font-light
`

const InputBox = tw.input`
w-full my-2 border border-slate-800/30 outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center
`

const DateInput = tw.input`
date_input
`
const DateInputWrapper = tw.div`
w-full my-2 border border-slate-800/30 outline-none px-2 bg-white hover:bg-gray-50 h-[50px] flex items-center justify-end 
`
