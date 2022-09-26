import Head from 'next/head'
import React, { useState, useCallback, useContext,useEffect } from 'react'
import AdmissionLayout from '../components/AdmissionLayout'
import { getData, postData } from '../utils/fetchData'

import 'react-intl-tel-input/dist/main.css';
import ContactDetail from '../components/enrollment/ContactDetail'
import tw from 'tailwind-styled-components/dist/tailwind'
import ChildDetail from '../components/enrollment/ChildDetail'
import CaptchaComponent from '../components/admission/CaptchaComponent'
import Loading from '../components/Loading'
import { DataContext } from '../store/GlobalState'
import { validateEnrollmentForm } from '../utils/valid'
import ACTIONS from '../store/Action'
import { getPrimary } from '../middleware/serverLogic';





const Enroll = ({ selectedCategory }) => {
  const { state, dispatch } = useContext(DataContext)
  const { notify } = state
  const [hasSiblingStudying, setHasSiblingStudying] = useState(false)
  const [primary,setPrimary] = useState({})
  const [secondary,setSecondary] = useState({})
  const [child,setChild] = useState({})
  const [isVerified,setIsVerified] = useState(false)
  const [isSubmited,setIsSubmited] = useState(false)
  


  const handlePrimary = useCallback(
    (details) => {
      setPrimary(details)
    },
    [primary],
  )
  const handleSecondary = useCallback(
    (details) => {
      setSecondary(details)
    },
    [secondary],
  )
  const handleChild = useCallback(
    (details) => {
      setChild(details)
    },
    [child],
  )

  const checkVerified = useCallback(
    (check) => {
      setIsVerified(check)
      
    },
    [isVerified],
  )

  const handleStatus = (status) => {
    if (status.title === 'Error') {

        return 'Something Wrong!'
    } else if (status.loading === true) {

        return (<Loading showSpinner message="Sending..." contentColorClass="text-white" hasVisibilityToggle={false} />)
    } else {
        return 'Submit'
    }
}

  const handleSubmit = async(e) => {
    e.preventDefault()

    const errmsg = validateEnrollmentForm(primary,secondary,child)
    setIsSubmited(true)

        if (errmsg) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: errmsg } })
            return;
        }

        if(!isVerified){
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: 'Please verify that you are a human' } })
            return;
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        const res = await postData('enrollmentForm', {primary,secondary,child,hasSiblingStudying})

        if (res.error) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: res.error } })
            return;
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Success', success: res.msg } })
        return
  }
  
  useEffect(()=>{
    dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
  },[primary,secondary,child,hasSiblingStudying,isVerified])

 

  return (
    <div>
      <Head>
        <title>Online Enroll</title>
      </Head>
      <AdmissionLayout category={selectedCategory}>
        {notify.title&&<NotifyWrapper $isNotify={notify.title}>
          <Title $isNotify={notify.title}>
            {notify.title}:
          </Title>
          {
              notify.title === 'Error' && typeof notify.error === 'object'
                  ? notify.error.map((err,index) => (
                        <NotifyText key={index}>{err}</NotifyText>
                  ))
                  : <NotifyText>{notify.error}</NotifyText>
          }
          <NotifyText>{notify.success}</NotifyText>
        </NotifyWrapper>}
        {
          notify.title!=='Success'&&
        <FormWrapper onSubmit={handleSubmit}>

          <ContactDetail heading={'Primary Contact Details'} addDetail={handlePrimary} isSubmited={isSubmited}/>
          <ContactDetail heading={'Secondary Contact Details'} addDetail={handleSecondary} isSubmited={isSubmited}/>
          <SiblingCheckWrapper>
            <Text>Please tick the box if the applicant has one or more siblings studying in our school?</Text>
            <SiblingCheck name='hasSiblingStudying' type='checkbox' checked={hasSiblingStudying} onChange={() => setHasSiblingStudying(!hasSiblingStudying)} />
          </SiblingCheckWrapper>
          
          <ChildDetail addDetail={handleChild} isSubmited={isSubmited}/>
          <CaptchaComponent checkVerified={checkVerified}/>
          {isSubmited&&!isVerified&&<ErrorText>Please fill in this field.</ErrorText>}
          <ButtonWrapper>
            <Button $title={notify.title} $loading={notify.loading} type='submit' disabled={notify.loading === true || notify.title === 'Error' ? true : false}>
              {handleStatus(notify)}
            </Button>

          </ButtonWrapper>
          
        </FormWrapper>
        }
        
      </AdmissionLayout>
    </div>
  )
}

export default Enroll

const SiblingCheckWrapper = tw.div`
flex items-center justify-between flex-wrap
`

const Text = tw.p`
md:text-xl text-lg
`

const SiblingCheck = tw.input`
w-[20px] h-[20px]
`
const FormWrapper = tw.form`
flex flex-col gap-4 
`
const ButtonWrapper = tw.div`
w-full flex justify-end
`

const Button = tw.button`
${(p) => (p.$title === 'Error' ? 'bg-red-500' : 'bg-indigo-900')}
${(p) => (p.$title === 'Error' || p.$loading ? 'cursor-not-allowed' : 'cursor-pointer')}

hover:opacity-75 text-white text-lg  py-3 w-32 transition flex justify-center items-center 
`

const NotifyWrapper = tw.div`
${(p) => (p.$isNotify === 'Error' && 'border border-red-600 bg-orange-200' )}
${(p) => (p.$isNotify === 'Success' && 'border border-lime-600 bg-lime-200' )}
p-4 
`

const Title = tw.h3`
${(p) => (p.$isNotify === 'Error' && 'text-red-600' )}
${(p) => (p.$isNotify === 'Success' && 'text-lime-600' )}
text-2xl font-bold
`

const NotifyText = tw.p`
text-lg block px-2
`

const ErrorText = tw.p`
text-red-600 text-lg text-center
`

export async function getStaticProps() {


  const res = await getPrimary(`/enrollment`)



  return {

    props: {
      selectedCategory: res.selectedCategory
    },

  }
}