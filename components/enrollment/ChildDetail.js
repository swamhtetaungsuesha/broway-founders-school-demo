import React,{memo, useState,useEffect} from 'react'
import nationalities  from 'i18n-nationality'
import enLocale from 'i18n-nationality/langs/en.json'
import itLocale from 'i18n-nationality/langs/it.json'
import tw from 'tailwind-styled-components/dist/tailwind'
import { GoCalendar } from 'react-icons/go'
import { validateBirthDate } from '../../utils/valid'
import { HandleEnrollError } from '../../utils/setting'

const ChildDetail = ({addDetail,isSubmited}) => {


  
    nationalities.registerLocale(enLocale)
    nationalities.registerLocale(itLocale)

  const nationalityObj = nationalities.getNames('en', { select: 'official' })
  const nationalifyArr = Object.entries(nationalityObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    }
  })

  const initialState = { first_name: '', last_name: '', academic_year: new Date().getFullYear() +'-'+ (new Date().getFullYear()+1) ,year: 'FS1', religion: '', nationality: '',gender: '', passport_number_id: '', birth_date: ''}
  const [childDetail, setChildDetail] = useState(initialState)
  

  const { first_name,last_name,academic_year,year,religion,nationality,gender,passport_number_id,birth_date } = childDetail

  useEffect(() => {
    addDetail(childDetail)

  }, [childDetail])
  const handleChange=(e) =>{
    const {name, value} = e.target
    setChildDetail({...childDetail,[name]:value})
    
  }
  



  return (
    <Wrapper>
      <Container>
      <HeadingWrapper>
        <Title>Child Details</Title>
        <Require>Required<span className='text-red-600'>*</span></Require>
      </HeadingWrapper>
        <ItemsContainer>

            
            <Item>
              <Label htmlFor='first_name'>First Name (as per passport/ID)<span className='text-red-600'>*</span>:</Label>
              <InputBox name='first_name' type='text' value={first_name} onChange={handleChange} $isError={isSubmited&&!first_name}/>
              {isSubmited&&<ErrorText>{HandleEnrollError(first_name,'first_name')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='last_name'>Last Name (as per passport/ID)<span className='text-red-600'>*</span>:</Label>
              <InputBox name='last_name' type='text' value={last_name} onChange={handleChange} $isError={isSubmited&&!last_name}/>
              {isSubmited&&<ErrorText>{HandleEnrollError(last_name,'last_name')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='academic_year'>Academic Year<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="academic_year" onChange={handleChange} value={academic_year} $isError={isSubmited&&!academic_year}>
                
                      <OptionWrapper value={new Date().getFullYear() +'-'+ (new Date().getFullYear()+1)}>{new Date().getFullYear()} - {new Date().getFullYear()+1}</OptionWrapper>
                    
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(academic_year,'academic_year')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='year'>Year<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="year"  onChange={handleChange} value={year} $isError={isSubmited&&!year}>
                  
                  {
                    [ 'FS1', 'FS2', 'Y01', 'Y02', 'Y03', 'Y04', 'Y05', 'Y06', 'Y07', 'Y08', 'Y09', 'Y10', 'Y11', 'Y12'].map((item, index) => (
                      <OptionWrapper key={index} value={item}>{item}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(year,'year')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='religion'>Religion<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="religion" onChange={handleChange} value={religion} $isError={isSubmited&&!religion}>
                <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    [ 'Buddhism', 'Christian', 'Hindu','Muslim','Sikh','Other'].map((item, index) => (
                      <OptionWrapper key={index} value={item}>{item}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(religion,'religion')}</ErrorText>}
            </Item>
            
            
            <Item>
              <Label htmlFor='nationality'>Nationality<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="nationality"  onChange={handleChange} value={nationality} $isError={isSubmited&&!nationality}>
                <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    !!nationalifyArr?.length &&
                    nationalifyArr.map(({ label, value }) => (
                      <OptionWrapper key={value} value={value}>{label}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(nationality,'nationality')}</ErrorText>}
            </Item>

            
            <Item>
              <Label htmlFor='gender'>Gender<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="gender"  onChange={handleChange} value={gender} $isError={isSubmited&&!gender}>
                <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    [ 'Male', 'Female'].map((item, index) => (
                      <OptionWrapper key={index} value={item}>{item}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(gender,'gender')}</ErrorText>}
            </Item>
            <Item>
                <Label htmlFor='birth_date'>Date of Birth<span className='text-red-600'>*</span>:</Label>

                <DateInputWrapper $isError={isSubmited&&(!birth_date||!validateBirthDate(birth_date))}>
                    <DateInput value={birth_date} name='birth_date' onChange={handleChange} type='date'  />

                    <GoCalendar />
                </DateInputWrapper>
                {isSubmited&&<ErrorText>{HandleEnrollError(birth_date,'birth_date')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='passport_number_id'>Passport Number/ID<span className='text-red-600'>*</span>:</Label>
              <InputBox $isError={isSubmited&&!passport_number_id} name='passport_number_id' type='text' value={passport_number_id} onChange={handleChange} />
              {isSubmited&&<ErrorText>{HandleEnrollError(passport_number_id,'passport_number_id')}</ErrorText>}
            </Item>
        </ItemsContainer>
      </Container>
    </Wrapper>
  )
}

export default memo(ChildDetail)

const Wrapper = tw.section`
text-slate-800/70 
`

const Container = tw.div`
w-full grid grid-cols-1 gap-4
`

const HeadingWrapper = tw.div`
w-full flex  items-center justify-between bg-slate-100 p-3 md:text-2xl border-b-4 border-slate-700 flex-wrap text-lg
`

const Title = tw.h3``

const Require = tw.p``

const ItemsContainer = tw.div`
w-full  grid md:grid-cols-2 gap-4 grid-cols-1
`

const FullWidthWrapper = tw.div`

`

const Item = tw.div`
text-left w-full flex flex-col 
`

const Label = tw.label`
text-slate-800 text-lg  font-light
`

const InputBox = tw.input`
${(p) => (p.$isError  ? 'border border-red-600' : 'border border-slate-800/30')}
w-full my-2  outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center
`

const SelectWrapper = tw.div`
w-full my-2
`

const Select = tw.select`
${(p) => (p.$isError  ? 'border border-red-600' : 'border border-slate-800/30')}
w-full   outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center
`

const OptionWrapper = tw.option`
my-px font-light text-slate-800/70 sm:text-base text-sm
`

const DateInput = tw.input`
date_input
`
const DateInputWrapper = tw.div`
${(p) => (p.$isError  ? 'border border-red-600' : 'border border-slate-800/30')}
w-full my-2  outline-none px-2 bg-white hover:bg-gray-50 h-[50px] flex items-center justify-end 
`

const ErrorText = tw.p`
text-red-600 text-lg
`