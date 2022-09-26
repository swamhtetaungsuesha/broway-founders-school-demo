import Head from 'next/head'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { BsUpload } from 'react-icons/bs'
import tw from 'tailwind-styled-components/dist/tailwind'
import { DataContext } from '../store/GlobalState'
import { validCareer } from '../utils/valid'
import { postData } from '../utils/fetchData'
import ACTIONS from '../store/Action'
import Loading from '../components/Loading'
import { fileUpload } from '../utils/fileUpload'
import AdmissionLayout from '../components/AdmissionLayout'
import CaptchaComponent from '../components/admission/CaptchaComponent'
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { getFormCareerApplication, getPrimary } from '../middleware/serverLogic'

const Form_Career_Application = ({ selectedCategory, in_positions }) => {

  const { state, dispatch } = useContext(DataContext)
  const { notify } = state

  const initialState = { firstName: '', lastName: '', email: '', phone: '', position: [in_positions[0].title] }
  const fileInitialState = { cover: [], resume: [] }
  const up_per_initial = { cover_per: 0, resume_per: 0 }

  const [uploadPercent, setUploadPercent] = useState(up_per_initial)
  const [careerData, setCareerData] = useState(initialState)
  const [fileData, setFileData] = useState(fileInitialState)
  const [mobile,setMobile] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const { firstName, lastName, email, phone, position } = careerData
  const { cover, resume } = fileData
  const { cover_per, resume_per } = uploadPercent

  const handleChange = (e) => {
    const { name, value } = e.target
    setCareerData({ ...careerData, [name]: value })

  }

  const handleFiles = async (e) => {
    const { name, files } = e.target
    if (name === 'cover') {

      setUploadPercent({ ...uploadPercent, cover_per: 0 })
    }
    if (name === 'resume') {
      setUploadPercent({ ...uploadPercent, resume_per: 0 })
    }
    setFileData({ ...fileData, [name]: files })

  }

  const checkVerified = useCallback(
    (check) => {
      setIsVerified(check)



    },
    [isVerified],
  )




  useEffect(() => {
    dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
  }, [careerData, fileData, isVerified])


  const handleSelect = (selectedItems) => {
    const selectedPosition = [];
    for (let i = 0; i < selectedItems.length; i++) {
      selectedPosition.push(selectedItems[i].value);
    }
    setCareerData({ ...careerData, position: selectedPosition })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errmsg = validCareer(firstName, lastName, email, phone)
    if (errmsg) {
      dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: errmsg } })
      return;
    }
    if (!isVerified) {
      dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: 'Please verify that you are a human!' } })
      return;
    }
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
    let file = [];
    let errArr = [];

    if (cover.length !== 0 && cover_per !== 100) {
      const uploadResult = await fileUpload(cover, errArr, setUploadPercent, uploadPercent, 'cover_per')
      if (uploadResult.length !== 0) {

        file.push({ cover: uploadResult[0].file_id })
      }

    }
    if (resume.length !== 0 && resume_per !== 100) {

      const uploadResult = await fileUpload(resume, errArr, setUploadPercent, uploadPercent, 'resume_per')
      if (uploadResult.length !== 0) {
        file.push({ resume: uploadResult[0].file_id })
      }
    }

    if (errArr.length !== 0) {
      dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: errArr } })
      return
    }
    let fileObject;
    if (file.length !== 0) {

      fileObject = Object.assign(...file)
    }


    const res = await postData('careerForm', { ...careerData, ...fileObject })

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
        <title>Form-Career Application</title>
      </Head>
      <AdmissionLayout category={selectedCategory}>

        <Container>
          <p className='text-slate-800 font-light text-lg underline w-full text-right'>Required<span className='text-red-600'>*</span></p>
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
                <Label htmlFor='firstName'>First Name<span className='text-red-600'>*</span>:</Label>
                <InputBox name='firstName' type='text' title='First Name' value={firstName} onChange={handleChange} />
              </Item>
              <Item>
                <Label htmlFor='lastName'>Last Name<span className='text-red-600'>*</span>:</Label>
                <InputBox name='lastName' type='text' title='Last Name' value={lastName} onChange={handleChange} />
              </Item>
              <Item>
                <Label htmlFor='email'>Email<span className='text-red-600'>*</span>:</Label>
                <InputBox name='email' type='email' title='Email' value={email} onChange={handleChange} />
              </Item>
              <Item>
                <Label htmlFor='phone'>Phone Number<span className='text-red-600'>*</span>:</Label>
                <IntlTelInput

                  defaultCountry='mm'
                  value={mobile}
                  onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber, extension) => {
                    setMobile(value)
                    setCareerData({ ...careerData, phone: fullNumber })
                  }}

                  containerClassName="intl-tel-input my-2"
                  inputClassName='form-control w-full  outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center border border-slate-800/30'
                />
              </Item>
              <Item>
                <Label htmlFor='position'>Position(s) you are interested in?:</Label>
                <SelectWrapper>
                  <Select name="position" defaultValue={[in_positions[0]?.title]} onChange={e => handleSelect(e.target.selectedOptions)} title='Position(s) you are interested in?' multiple={true}>
                    {
                      in_positions.map((in_pos, index) => (
                        <OptionWrapper key={in_pos._id} value={in_pos.title}>{in_pos.title}</OptionWrapper>
                      ))
                    }
                  </Select>
                </SelectWrapper>
              </Item>
              <Item>
                <Label htmlFor='cover letter'>Upload your cover letter:</Label>
                <FileInputWrapper>
                  <FileText>
                    {cover.length !== 0 ? cover[0].name : 'Drop File...'}
                  </FileText>
                  <PercentageBar
                    style={{
                      width: `${cover_per}%`
                    }}
                  ></PercentageBar>
                  <IconWrapper>
                    {cover_per}%
                    <BsUpload className='bg-slate-800/50 text-white  h-8 w-8 p-1' />
                  </IconWrapper>
                  <FileInput type='file' id='cover_up' name='cover' accept='.txt,.xlsx,.xls,.pdf,video/*,.doc,.docx,.mp4,.dot,.dotx' onChange={handleFiles} title='Upload your cover letter' />
                </FileInputWrapper>
                <NoteText>Only Doc, Video, Other are allowed to upload!</NoteText>
              </Item>
              <Item>
                <Label htmlFor='resume'>Upload your resume:</Label>
                <FileInputWrapper>
                  <FileText>
                    {resume.length !== 0 ? resume[0].name : 'Drop File...'}
                  </FileText>
                  <PercentageBar
                    style={{
                      width: `${resume_per}%`
                    }}
                  ></PercentageBar>
                  <IconWrapper>
                    {resume_per}%
                    <BsUpload className='bg-slate-800/50 text-white  h-8 w-8 p-1' />
                  </IconWrapper>
                  <FileInput type='file' id='resume_up' name='resume' accept='.txt,.xlsx,.xls,.pdf,video/*,.doc,.docx,.mp4,.dot,.dotx' onChange={handleFiles} title='Upload your resume' />
                </FileInputWrapper>
                <NoteText>Only Doc, Video, Other are allowed to upload!</NoteText>
              </Item>
              <CaptchaComponent checkVerified={checkVerified} />
              <ButtonWrapper $title={notify.title} $loading={notify.loading} type='submit' disabled={notify.loading === true || notify.title === 'Error' ? true : false}>
                {handleStatus(notify)}
              </ButtonWrapper>
            </ItemContainer>}
        </Container>
      </AdmissionLayout>

    </div>
  )
}

export default Form_Career_Application


const Container = tw.div`
max-w-5xl mx-auto w-full bg-indigo-100 p-3
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
text-slate-800/70 text-lg  font-light
`

const InputBox = tw.input`
 border border-slate-800/30 w-full my-2  outline-none p-2 bg-white hover:bg-gray-50 h-[50px] flex items-center
`

const SelectWrapper = tw.div`
w-full
`

const Select = tw.select`
w-full  border border-slate-800/30 outline-none p-2 bg-white hover:bg-gray-50
`

const OptionWrapper = tw.option`
my-px font-light text-slate-800/70 sm:text-base text-sm
`

const FileInputWrapper = tw.div`
border border-slate-800/30 w-full my-2  outline-none p-2 bg-white hover:bg-gray-50 h-[50px] relative flex justify-between items-center
`

const FileText = tw.span`
text-slate-800/70 font-light line-clamp-1 z-10
`

const PercentageBar = tw.div`
absolute top-0 left-0 bg-lime-200/70  h-full z-0
`

const IconWrapper = tw.div`
absolute top-0 right-0 font-light text-slate-800 text-right flex justify-end items-start
`

const FileInput = tw.input`
w-full absolute  outline-none opacity-0 cursor-pointer
`

const NoteText = tw.p`
text-red-600 sm:text-sm text-xs font-content
`


const ButtonWrapper = tw.button`
${(p) => (p.$title === 'Error' ? 'bg-red-500' : 'bg-indigo-900')}
${(p) => (p.$title === 'Error' || p.$loading ? 'cursor-not-allowed' : 'cursor-pointer')}

hover:opacity-75 text-white text-lg  py-3 w-32 transition flex justify-center items-center 
`

export async function getStaticProps() {

  const res_1 = await getPrimary(`/form_career_application`)

  const res = await getFormCareerApplication()


  return {

    props: {
      selectedCategory: res_1.selectedCategory,
      in_positions: res.in_positions,

    },

  }
}