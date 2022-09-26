import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import NewsletterSubscribe from './newsletter/NewsletterSubscribe'
import { FaFacebookF,FaInstagram,FaTwitter,FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

const MainFooter = () => {
  return (
    <Wrapper>
        <UpperFooter>
            <MapWrapper>
                
            <iframe width="100%" height="250" id="gmap_canvas" src="https://maps.google.com/maps?q=16%C2%B053'30.8%22N%2096%C2%B012'49.7%22E&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                        
            </MapWrapper>
            <ContactWrapper>
                <LocationWrapper>

                    <TitleWrapper>
                        EXPLORE OUR CAMPUS LOCATION
                    </TitleWrapper>
                        <Text>
                            935(B) Aung Yadanar Street <br />
                            Dagon Myothit(East), Yangon, <br />
                            Republic of the Union of Myanmar
                        </Text>
                </LocationWrapper>
                <NeedHelpWrapper>
                    
                    <TitleWrapper>
                        NEED HELP?
                        
                    </TitleWrapper>
                    <TitleWrapper>
                        Call Us:
                        <br/>
                        +95 9 984 261 387
                        <br />
                        +95 9 776 519 502
                    </TitleWrapper>
                    <TitleWrapper>
                        Mail Us:
                        <br/>
                        <LinkWrapper href='mailto:swamsuesha76@gmail.com'>
                            info@broway.edu.mm
                        </LinkWrapper>
                    </TitleWrapper>
                </NeedHelpWrapper>
                
                
            </ContactWrapper>
            <NewsletterAndSocialMediaWrapper>
                <NewsletterWrapper>
                    <NewsletterSubscribe/>
                </NewsletterWrapper>
                <ConnectWrapper>
                    <TitleWrapper>
                        CONNECT WITH US
                    </TitleWrapper>
                    <SocialMediaWrapper>
                        <SocialMedia href='#'>
                            <FaFacebookF/>
                        </SocialMedia>
                        <SocialMedia href='#'>
                            <FaInstagram/>
                        </SocialMedia>
                        <SocialMedia href='#'>
                            <FaTwitter/>
                        </SocialMedia>
                        <SocialMedia href='#'>
                            <FaLinkedinIn/>
                        </SocialMedia>
                    </SocialMediaWrapper>
                </ConnectWrapper>
            </NewsletterAndSocialMediaWrapper>
        </UpperFooter>
        <LowerFooter>
            <LinkButtonWrapper>
                <Link href='/school_tour' passHref>
                <LinkButton>
                    Visit A Tour
                </LinkButton>
                </Link>
                <Link href='/enrollment' passHref>
                <LinkButton>
                Just Apply Now
                    
                </LinkButton>
                </Link>
                <Link href='/form_career_application' passHref>
                    <LinkButton>
                    Join Our Team
                    </LinkButton>
                </Link>
            </LinkButtonWrapper>
            <CopyRightWrapper>
                <Text>
                © 2022 BROWAY.ALL RIGHT RESERVED
                </Text>
                <Text>
                    Website by <LinkWrapper href='https://www.facebook.com/swam.htag.3'>Swam Htet Aung</LinkWrapper>
                </Text>
            </CopyRightWrapper>
        </LowerFooter>

    </Wrapper>
  )
}

export default MainFooter

const Wrapper = tw.footer`
text-white  -z-30
`

const UpperFooter = tw.div`
flex justify-around  p-3 bg-slate-700   gap-4 flex-wrap-reverse
`

const LowerFooter = tw.div`
bg-slate-800 grid grid-cols-1 gap-2 
`

const MapWrapper = tw.div`
 place-self-center sm:order-1 order-2 p-3 bg-white
`

const ContactWrapper = tw.div`
grid grid-cols-1 gap-4 sm:order-2 order-1 
`

const NewsletterAndSocialMediaWrapper = tw.div`
grid grid-cols-1 order-3 gap-4
`

const NewsletterWrapper = tw.div``

const ConnectWrapper = tw.div``

const TitleWrapper = tw.div`
 capitalize mb-5 font-bold 
`

const LinkWrapper = tw.a`
text-base normal-case underline text-sky-600
`

const SocialMediaWrapper = tw.div`
flex items-center justify-start
`

const SocialMedia = tw.a`
bg-white text-2xl p-3 text-slate-700 mx-2
`

const Text = tw.p`
text-sm font-light
`

const LocationWrapper = tw.div``

const NeedHelpWrapper = tw.div``

const LinkButton = tw.a`
px-4 text-white no-underline sm:text-base text-sm
`

const LinkButtonWrapper = tw.div`
flex divide-x my-2 divide-slate-500 sm:justify-start justify-center flex-wrap
`

const CopyRightWrapper = tw.div`
flex sm:justify-between items-center sm:px-10 flex-wrap justify-center gap-4
`