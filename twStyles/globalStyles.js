import tw from "tailwind-styled-components/dist/tailwind";

export const ContentTitle = tw.h1`
w-fit font-body uppercase text-3xl font-semibold  before:w-1/5 before:h-2 before:bg-red-600 relative before:absolute before:-top-4
`

const nomalParagraph = tw.p`
font-content  sm:text-base  text-sm
`

export const NormalTitle = tw.a`
text-xl font-body text-left capitalize no-underline text-white
`

export const ButtonWrapper = tw.a`
flex justify-center items-center bg-indigo-900 text-white w-10 h-8 text-xl skew-x-12 mx-px hover:bg-indigo-700
`