import React, { useContext, useState,useEffect, useCallback } from 'react'
import Head from 'next/head'

import tw from 'tailwind-styled-components/dist/tailwind'
import { DataContext } from '../store/GlobalState'
import {  validTourBooking } from '../utils/valid'
import { getData, postData } from '../utils/fetchData'
import ACTIONS from '../store/Action'
import Loading from '../components/Loading'
import AdmissionLayout from '../components/AdmissionLayout'
import { GoCalendar } from 'react-icons/go'
import IntlTelInput from 'react-intl-tel-input';

import 'react-intl-tel-input/dist/main.css';
import CaptchaComponent from '../components/admission/CaptchaComponent'
import { getPrimary } from '../middleware/serverLogic'

const Inbox = ({ selectedCategory }) => {
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state


    const initialState = { parent_first_name: '', parent_last_name: '', child_name: '', child_age: '', mobile: '', email: '', preferred_date: '' }
    const [tourData, setTourData] = useState(initialState)
    const [phoneNumber,setPhoneNumber] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const { parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date } = tourData


    const checkVerified = useCallback(
        (check) => {
          setIsVerified(check)
          
    
          
        },
        [isVerified],
      )

    useEffect(()=>{
        dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
      },[tourData,isVerified])
      
    

    const handleChange = (e) => {
        const { name, value } = e.target
        setTourData({ ...tourData, [name]: value })
        dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const errmsg = validTourBooking( parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date)
        if (errmsg) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: errmsg } })
            return;
        }

        if(!isVerified){
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: 'Please verify that you are a human' } })
            return;
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        const res = await postData('tourBooking', tourData)

        if (res.error) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: res.error } })
            return;
        }

        

        dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Success', success: res.msg } })
        return
    }

    const handleStatus = (status) => {
        if (status.title === 'Error') {

            return 'Something Wrong!'
        } else if (status.loading === true) {

            return (<Loading showSpinner message="Sending..." contentColorClass="text-white" hasVisibilityToggle={false} />)
        } else {
            return 'Submit'
        }
    }

    return (
        <div>
            <Head>
                <title>Virtual Tour </title>
            </Head>
            <AdmissionLayout category={selectedCategory}>

                <Container>
                    {/* <p className='text-2xl font-bold text-red-600'>Please complete the below form to request a place.</p> */}
                    <Notification>
                        {
                            notify.title === 'Error' && typeof notify.error === 'Object'
                                ? notify.error.map((err,index) => (
                                    <ErrorText key={index}>{err}</ErrorText>
                                ))
                                : <ErrorText>{notify.error}</ErrorText>
                        }

                        <SuccessText>{notify.success}</SuccessText>
                    </Notification>
                    {notify.title !== 'Success' &&
                        <ItemContainer onSubmit={handleSubmit}>
                            <Item>
                                <Label htmlFor='parent_first_name'>Parent&lsquo;s First Name:</Label>
                                <InputBox value={parent_first_name} name='parent_first_name' onChange={handleChange} type='text' />
                            </Item>
                            <Item>
                                <Label htmlFor='parent_last_name'>Parent&lsquo;s Last Name:</Label>
                                <InputBox value={parent_last_name} name='parent_last_name' onChange={handleChange} type='text' />
                            </Item>
                            <Item>
                                <Label htmlFor='child_name'>Name Of Your Child:</Label>
                                <InputBox value={child_name} name='child_name' onChange={handleChange} type='text' />
                            </Item>
                            <Item>
                                <Label htmlFor='child_age'>Age Of Your Child:</Label>
                                <SelectWrapper>
                                    <Select name="child_age" value={child_age} onChange={handleChange}>
                                        <OptionWrapper value={''}></OptionWrapper>
                                        {
                                            [...Array.from(Array(18).keys())].map((item, index) => (
                                                <OptionWrapper key={index} value={index + 1}>{index + 1}</OptionWrapper>
                                            ))
                                        }
                                    </Select>
                                </SelectWrapper>
                                {/* <InputBox value={child_age} name='child_age' onChange={handleChange} type='text' /> */}
                            </Item>
                            <Item>
                                <Label htmlFor='mobile'>Phone Number:</Label>
                                <IntlTelInput

                                    // autoHideDialCode='false'
                                    defaultCountry= 'mm'
                                    value={phoneNumber}
                                    onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber, extension)=>{
                                        setPhoneNumber(value)
                                        setTourData({ ...tourData, mobile: fullNumber })
                                      }}
                            
                                    containerClassName="intl-tel-input my-2"
                                    inputClassName="form-control w-full  border border-slate-800/30 outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center"
                                />
                                {/* <InputBox value={mobile} name='mobile' onChange={handleChange} type='tel' /> */}
                            </Item>
                            <Item>
                                <Label htmlFor='email'>Email:</Label>
                                <InputBox value={email} name='email' onChange={handleChange} type='email' />
                            </Item>

                            <Item>
                                <Label htmlFor='date'>Please select your preferred date of tour:</Label>

                                <DateInputWrapper>
                                    <DateInput value={preferred_date} name='preferred_date' onChange={handleChange} type='date' data-date-inline-picker={true} />

                                    <GoCalendar />
                                </DateInputWrapper>
                            </Item>
                            <CaptchaComponent checkVerified={checkVerified}/>
                            <ButtonWrapper $title={notify.title} $loading={notify.loading} type='submit' disabled={notify.loading === true || notify.title === 'Error' ? true : false}>
                                {handleStatus(notify)}
                            </ButtonWrapper>
                        </ItemContainer>}
                </Container>

            </AdmissionLayout>

        </div>
    )
}

export default Inbox

const Wrapper = tw.section`
 my-10 px-2
`

const Heading = tw.h3`
text-center text-6xl text-indigo-900 font-bold flex flex-col items-center
`

const Red = tw.h5`
text-3xl text-red-600 my-5 w-fit after:w-10 after:h-1 after:bg-indigo-900 after:absolute relative after:top-1/2 after:-left-10 after:-translate-x-1/2 after:text-center my-3 before:w-10 before:h-1 before:bg-indigo-900 before:absolute  before:top-1/2 before:-right-20 before:-translate-x-1/2 before:text-center
`

const Container = tw.div`
w-full
`

const Notification = tw.div`
 my-10
`

const SuccessText = tw.p`
text-sky-800 text-lg w-full text-center
`

const ErrorText = tw.p`
text-red-500 sm:text-sm text-xs w-full
`

const ItemContainer = tw.form`
w-full  flex flex-col items-end gap-4 
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

const SelectWrapper = tw.div`
w-full my-2
`

const Select = tw.select`
w-full  border border-slate-800/30 outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center
`

const OptionWrapper = tw.option`
my-px font-light text-slate-800/70 sm:text-base text-sm
`

const DateInput = tw.input`
date_input
`
const DateInputWrapper = tw.div`
w-full my-2 border border-slate-800/30 outline-none px-2 bg-white hover:bg-gray-50 h-[50px] flex items-center justify-end 
`

const CaptchaWrapper = tw.div`
w-full flex justify-center
`

const ButtonWrapper = tw.button`
${(p) => (p.$title === 'Error' ? 'bg-red-500' : 'bg-indigo-900')}
${(p) => (p.$title === 'Error' || p.$loading ? 'cursor-not-allowed' : 'cursor-pointer')}

hover:opacity-75 text-white text-lg  py-3 w-32 transition flex justify-center items-center 
`

export async function getStaticProps() {


    const res = await getPrimary(`/school_tour`)



    return {

        props: {
            selectedCategory: res.selectedCategory
        },

    }
}