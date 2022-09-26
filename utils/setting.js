import { validateBirthDate, validateEmail, validatePhoneNumber } from "./valid";


export const HandleMenuList = (menuTitle, menuItems, currentCategory) => {


  const categories = menuItems.filter((category) => category._id.field === menuTitle && category._id.routerPath !== currentCategory)
  return categories


}

export const HandleEnrollError = (item,title) => {
  if(item===''){
    return 'Please fill in this field.'
  }
  switch (title) {
    case 'email':
      if(!validateEmail(item)){
        return 'Please enter a valid email address.'
    }
    break;
    case 'mobile':
      if(!validatePhoneNumber(item)){
        return 'Please enter a valid phone number.'
    }
    break;
    case 'birth_date':
      if(!validateBirthDate(item)){
        return 'Age not valid! Your child should be 3 years old at least.'
    }
    break;
   
    default:
      break;
  }
}


export const HandleRouterCategory = (category) => {
  switch (category) {
    case 'about us':

      return [
        { title: 'Leadership', path: '/leadership' },
        { title: 'Fees', path: '/fees' },
        { title: 'Our Mission', path: '/mission' },
        { title: 'Careers', path: '/careers' }
      ]

      break;
    case 'school media':
      return [
        { title: 'News', path: '/news' },
        { title: 'Events', path: '/events' },
        { title: 'Photo Gallery', path: '/photoGallery' }
      ]

      break;
    case 'school life':
      return [
        { title: 'Our Campus', path: '/campus' },
        { title: 'Activities', path: '/activities' },
        { title: 'School Calendar', path: '/calendar' }
      ]

      break;
    default:
      break;
  }
}

export const menu = [
  {
    title: 'about us',
    items:
      [
        { title: 'leadership', path: '/leadership' },
        { title: 'fees', path: '/fees' },
        { title: 'our mission', path: '/mission' },
        { title: 'careers', path: '/careers' }
      ]
  },
  {
    menuTitle: 'academics',
    menuListItem:
      [
        { title: 'elementary school', path: '/news' },
        { title: 'middle school', path: '/events' },
        { title: 'high school', path: '/photoGallery' }
      ]
  },
  {
    title: 'school media',
    items:
      [
        { title: 'news', path: '/news' },
        { title: 'events', path: '/events' },
        { title: 'photo gallery', path: '/photoGallery' }
      ]
  },
  {
    menuTitle: 'activities',
    menuListItem:
      [
        { title: 'language', path: '/activities/language' },
        { title: 'athletics', path: '/activities/athletics' },
        { title: 'music', path: '/activities/music' },
        { title: 'arts&crafts', path: '/activities/arts&crafts' }
      ]
  },
  {
    title: 'school life',
    items:
      [
        { title: 'our campus', path: '/campus' },
        { title: 'activities', path: '/activities' },
        { title: 'school calendar', path: '/calendar' }
      ]
  }
]

export const data = [
  {
    text: 'Website Re-Design Plan',
    startDate: new Date('2021-04-26T16:30:00.000Z'),
    endDate: new Date('2021-04-26T18:30:00.000Z'),
  }, {
    text: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date('2021-04-26T19:00:00.000Z'),
    endDate: new Date('2021-04-26T20:00:00.000Z'),
    allDay: true,
  }, {
    text: 'Install New Router in Dev Room',
    startDate: new Date('2021-04-26T21:30:00.000Z'),
    endDate: new Date('2021-04-26T22:30:00.000Z'),
  }, {
    text: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date('2021-04-27T17:00:00.000Z'),
    endDate: new Date('2021-04-27T18:00:00.000Z'),
  }, {
    text: 'Final Budget Review',
    startDate: new Date('2021-04-27T19:00:00.000Z'),
    endDate: new Date('2021-04-27T20:35:00.000Z'),
  }, {
    text: 'New Brochures',
    startDate: new Date('2021-04-27T21:30:00.000Z'),
    endDate: new Date('2021-04-27T22:45:00.000Z'),
  }, {
    text: 'Install New Database',
    startDate: new Date('2021-04-28T16:45:00.000Z'),
    endDate: new Date('2021-04-28T18:15:00.000Z'),
  }, {
    text: 'Approve New Online Marketing Strategy',
    startDate: new Date('2021-04-28T19:00:00.000Z'),
    endDate: new Date('2021-04-28T21:00:00.000Z'),
  }, {
    text: 'Upgrade Personal Computers',
    startDate: new Date('2021-04-28T22:15:00.000Z'),
    endDate: new Date('2021-04-28T23:30:00.000Z'),
  }, {
    text: 'Customer Workshop',
    startDate: new Date('2021-04-29T18:00:00.000Z'),
    endDate: new Date('2021-04-29T19:00:00.000Z'),
    allDay: true,
  }, {
    text: 'Prepare 2021 Marketing Plan',
    startDate: new Date('2021-04-29T18:00:00.000Z'),
    endDate: new Date('2021-04-29T20:30:00.000Z'),
  }, {
    text: 'Brochure Design Review',
    startDate: new Date('2021-04-29T21:00:00.000Z'),
    endDate: new Date('2021-04-29T22:30:00.000Z'),
  }, {
    text: 'Create Icons for Website',
    startDate: new Date('2021-04-30T17:00:00.000Z'),
    endDate: new Date('2021-04-30T18:30:00.000Z'),
  }, {
    text: 'Upgrade Server Hardware',
    startDate: new Date('2021-04-30T21:30:00.000Z'),
    endDate: new Date('2021-04-30T23:00:00.000Z'),
  }, {
    text: 'Submit New Website Design',
    startDate: new Date('2021-04-30T23:30:00.000Z'),
    endDate: new Date('2021-05-01T01:00:00.000Z'),
  }, {
    text: 'Launch New Website',
    startDate: new Date('2021-04-30T19:20:00.000Z'),
    endDate: new Date('2021-04-30T21:00:00.000Z'),
  },
];


