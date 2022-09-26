import React, { useContext, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { DataContext } from '../../store/GlobalState'
import { validComment } from '../../utils/valid'
import {  postData } from '../../utils/fetchData'
import ACTIONS from '../../store/Action'
import Loading from '../Loading'
import Recaptcha from 'react-recaptcha'

const Inbox = () => {
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state


    const initialState = { name: '', email: '', comment: '' }
    const [commentData, setCommentData] = useState(initialState)
    const [isVerified,setIsVerified] = useState(false)
    const { name, email, comment } = commentData

    const handleSendComment = async (e) => {
        e.preventDefault()
        
        const errmsg = validComment(name, email, comment)
        if (errmsg) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: errmsg } })
            return;
        }

        if(!isVerified){
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: 'Please verify that you are a human' } })
            return;
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        const res = await postData('comment', commentData)

        if (res.error) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Error', error: res.error } })
            return;
        }

        

        dispatch({ type: ACTIONS.NOTIFY, payload: { title: 'Success', success: res.msg } })
        return

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setCommentData({ ...commentData, [name]: value })
        dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
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

    const onloadCallback = () => {

    }

    const verifyCallback = () => {
        setIsVerified(true)
        dispatch({ type: ACTIONS.NOTIFY, payload: { title: '' } })
    }

    return (


                    <Container>
                        <Title>Contact Us</Title>
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
                            <ItemContainer onSubmit={handleSendComment}>
                                <Item>
                                    <Label htmlFor='name'>name:</Label>
                                    <InputBox value={name} name='name' onChange={handleChange} type='text' />
                                </Item>
                                <Item>
                                    <Label htmlFor='email'>email:</Label>
                                    <InputBox value={email} name='email' onChange={handleChange} type='email' />
                                </Item>
                                <Item>
                                    <Label htmlFor='comments'>comments / questions:</Label>
                                    <TextBox value={comment} name='comment' onChange={handleChange} type='text'></TextBox>
                                </Item>
                                <CaptchaWrapper>

                                    <Recaptcha
                                        sitekey={process.env.RECAPTCHA_API_KEY}
                                        render="explicit"
                                        
                                        verifyCallback={verifyCallback}
                                        onloadCallback={onloadCallback}
                                    />
                                </CaptchaWrapper>
                                <ButtonWrapper $title={notify.title} $loading={notify.loading} type='submit' disabled={notify.loading === true || notify.title === 'Error' ? true : false}>
                                    {handleStatus(notify)}
                                </ButtonWrapper>
                            </ItemContainer>}
                    </Container>


    )
}

export default Inbox

const Wrapper = tw.section`
 my-10 p-2
`


const Container = tw.div`
w-full p-4 
`

const Title = tw.h3`
text-3xl text-indigo-900 font-serif uppercase font-bold text-center
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
text-slate-800 text-lg capitalize font-light
`

const InputBox = tw.input`
w-full my-2 border border-slate-800/30 outline-none p-2 bg-white hover:bg-gray-50
`

const TextBox = tw.textarea`
w-full my-2 border border-slate-800/30 outline-none p-2 resize-none bg-white hover:bg-gray-50
`

const CaptchaWrapper = tw.div`
w-full flex justify-center
`

const ButtonWrapper = tw.button`
${(p) => (p.$title === 'Error' ? 'bg-red-500' : 'bg-indigo-900')}
${(p) => (p.$title === 'Error' || p.$loading ? 'cursor-not-allowed' : 'cursor-pointer')}

hover:opacity-75 text-white text-lg  py-3 w-32 transition flex justify-center items-center 
`

