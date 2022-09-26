import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import Recaptcha from 'react-recaptcha'


const CaptchaComponent = ({checkVerified}) => {


  

    const onloadCallback = () => {

    }
    
    const verifyCallback = async() => {
        checkVerified(true)
        
    }

    return (
        <CaptchaWrapper>

            <Recaptcha
                sitekey={process.env.RECAPTCHA_API_KEY}
                render="explicit"

                verifyCallback={verifyCallback}
                onloadCallback={onloadCallback}
            />
        </CaptchaWrapper>
    )
}

export default CaptchaComponent

const CaptchaWrapper = tw.div`
w-full flex justify-center 
`