import React,{memo, useState,useEffect} from 'react'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import itLocale from 'i18n-iso-countries/langs/it.json'
import tw from 'tailwind-styled-components/dist/tailwind'
import IntlTelInput from 'react-intl-tel-input';

import 'react-intl-tel-input/dist/main.css';
import { validateEmail, validatePhoneNumber } from '../../utils/valid'
import { HandleEnrollError } from '../../utils/setting'

const ContactDetail = ({heading,addDetail,isSubmited}) => {

 
  countries.registerLocale(enLocale)
  countries.registerLocale(itLocale)

  const countryObj = countries.getNames('en', { select: 'official' })
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    }
  })

  const initialState = { title: '', relation: '', first_name: '' ,last_name: '', email: '', mobile: '',country_residence: '', passport_number_id: '', local_address: '',notes:''}
  const [contactDetail, setContactDetail] = useState(initialState)
  const [phoneNumber,setPhoneNumber] = useState('')

  const { title,relation,first_name,last_name, email,mobile,country_residence,passport_number_id,local_address, notes } = contactDetail
  useEffect(() => {
    addDetail(contactDetail)
  

  }, [contactDetail])
  const handleChange=(e) =>{
    const {name, value} = e.target
    setContactDetail({...contactDetail,[name]:value})
    
  }

  return (
    <Wrapper>
      <Container>
      <HeadingWrapper>
        <Title>{heading}</Title>
        <Require>Required<span className='text-red-600'>*</span></Require>
      </HeadingWrapper>
        <ItemsContainer>

            <Item>
              <Label htmlFor='title'>Title<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="title"  onChange={handleChange} value={title} $isError={isSubmited&&!title}>
                <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    [ 'Mr.', 'Ms.', 'Mrs.'].map((item, index) => (
                      <OptionWrapper key={index} value={item}>{item}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(title,'title')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='relation'>Relation to Applicant<span className='text-red-600'>*</span>:</Label>
              <SelectWrapper>
                <Select name="relation"  onChange={handleChange} value={relation} $isError={isSubmited&&!relation}>
                <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    [ 'Father', 'Mother', 'Guardian'].map((item, index) => (
                      <OptionWrapper key={index} value={item}>{item}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {isSubmited&&<ErrorText>{HandleEnrollError(relation,'relation')}</ErrorText>}
            </Item>
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
              <Label htmlFor='email'>Email<span className='text-red-600'>*</span>:</Label>
              <InputBox name='email' type='email' value={email} onChange={handleChange} $isError={isSubmited&&(!email||!validateEmail(email))}/>
            
              {isSubmited&&<ErrorText>{HandleEnrollError(email,'email')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='mobile'>Mobile<span className='text-red-600'>*</span>:</Label>
              <IntlTelInput

                                    // autoHideDialCode='false'
                                    defaultCountry= 'mm'
                                    value={phoneNumber}
                                    onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber, extension)=>{
                                        setPhoneNumber(value)
                                        setContactDetail({ ...contactDetail, mobile: fullNumber })
                                      }}
                            
                                    containerClassName="intl-tel-input my-2"
                                    inputClassName={`form-control w-full  outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center ${isSubmited&&(!mobile||!validatePhoneNumber(mobile))?'border border-red-600':'border border-slate-800/30'}`}
                                />
              {isSubmited&&<ErrorText>{HandleEnrollError(mobile,'mobile')}</ErrorText>}
              
            </Item>
            <Item>
              <Label htmlFor='country_residence'>Country of Residence{heading!=='Secondary Contact Details'&&<span className='text-red-600'>*</span>}:</Label>
              <SelectWrapper>
                <Select $isError={isSubmited&&!country_residence&&heading!=='Secondary Contact Details'} name="country_residence" onChange={handleChange} value={country_residence}>
                  <OptionWrapper value=''>--None--</OptionWrapper>
                  {
                    !!countryArr?.length &&
                    countryArr.map(({ label, value }) => (
                      <OptionWrapper key={value} value={value}>{label}</OptionWrapper>
                    ))
                  }
                </Select>
              </SelectWrapper>
              {heading!=='Secondary Contact Details'&&isSubmited&&<ErrorText>{HandleEnrollError(country_residence,'country_residence')}</ErrorText>}
            </Item>
            <Item>
              <Label htmlFor='passport_number_id'>Passport Number/ID{heading!=='Secondary Contact Details'&&<span className='text-red-600'>*</span>}:</Label>
              <InputBox $isError={isSubmited&&!passport_number_id&&heading!=='Secondary Contact Details'} name='passport_number_id' type='text' value={passport_number_id} onChange={handleChange} />
              {heading!=='Secondary Contact Details'&&isSubmited&&<ErrorText>{HandleEnrollError(passport_number_id,'passport_number_id')}</ErrorText>}
            </Item>
        </ItemsContainer>
        <FullWidthWrapper>
          <Item>
            <Label htmlFor='local_address'>Local Address{heading!=='Secondary Contact Details'&&<span className='text-red-600'>*</span>}:</Label>
            <TextBox $isError={isSubmited&&!local_address&&heading!=='Secondary Contact Details'} value={local_address} name='local_address' onChange={handleChange} type='text'></TextBox>
           {heading!=='Secondary Contact Details'&&isSubmited&& <ErrorText>{HandleEnrollError(local_address,'local_address')}</ErrorText>}
          </Item>
          <Item>
            <Label htmlFor='notes'>Notes:</Label>
            <TextBox value={notes} name='notes' onChange={handleChange} type='text'></TextBox>
          </Item>

        </FullWidthWrapper>
      </Container>
    </Wrapper>
  )
}

export default memo(ContactDetail)

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

const TextBox = tw.textarea`
${(p) => (p.$isError  ? 'border border-red-600' : 'border border-slate-800/30')}
w-full my-2  outline-none p-2 resize-none bg-white hover:bg-gray-50
`

const ErrorText = tw.p`
text-red-600 text-lg
`