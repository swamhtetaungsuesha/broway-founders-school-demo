
export const validComment = (name,email,comment) => {
    if(!name||!email||!comment){
        return 'Please add all fields!'
    }
    if(!validateEmail(email)){
        return 'Invalid email!'
    }

}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePhoneNumber(phone) {
    // var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var re = /^\+(?:[0-9] ?){6,14}[0-9]$/
    return re.test(phone);
  }

export function validateBirthDate(d){

    const currentDate = new Date()
    const last3years=new Date(currentDate.setFullYear(currentDate.getFullYear() - 3)).getTime()
    const selectedDate = new Date(d)
    const selectedTime = new Date(selectedDate.setFullYear(selectedDate.getFullYear())).getTime()

    return last3years > selectedTime
}


export const validCareer = (firstName,lastName,email,phone) => {
    if(!firstName||!lastName||!email||!phone) {
        return 'You must pass requires!'
    }
    if(!validateEmail(email)){
        return 'Invalid email!'
    }
    if(!validatePhoneNumber(phone)){
        return 'Invalid phone number!'
    }

}

export const validTourBooking = (parent_first_name, parent_last_name, child_name, child_age, mobile, email, preferred_date) => {
    if(!parent_first_name|| ! parent_last_name|| ! child_name|| ! child_age|| ! mobile|| ! email|| ! preferred_date) {
        return 'Please complete the below form to request a place!'
    }
    if(!validateEmail(email)){
        return 'Invalid email!'
    }
    if(!validatePhoneNumber(mobile)){
        return 'Invalid phone number!'
    }

}

export const  validateEnrollmentForm = (primary,secondary,child) => {
    let errArr = []
    const primaryKeys = Object.keys(primary);

    primaryKeys.forEach((key, index) => {
        if(key!=='notes'&&primary[key]===''){
            errArr.push('You must pass requires!')
           
        }
    });
    const secondaryKeys = Object.keys(secondary);

    secondaryKeys.forEach((key,index)=>{
        if(key!=='notes'&&key!=='notes'&&key!=='local_address'&&key!=='country_residence'&&key!=='passport_number_id'&&primary[key]===''){
            errArr.push('You must pass requires!')
        }
    })

    const childKeys = Object.keys(child);

    childKeys.forEach((key,index)=>{
        if(primary[key]===''){
            errArr.push('You must pass requires!')
        }
    })
    if((!validateEmail(primary['email'])&&primary['email']!=='')||(!validateEmail(secondary['email'])&&secondary['email']!=='')){
        errArr.push('Invalid email!')
       
    }
    if((!validatePhoneNumber(primary['mobile'])&&primary['mobile']!=='')||(!validatePhoneNumber(secondary['mobile'])&&secondary['mobile']!=='')){
        errArr.push('Invalid phone number!')

    }

    if(child['birth_date']!==''&&!validateBirthDate(child['birth_date'])){
        errArr.push('Age not valid !')
    }

    let lasterrArr = errArr.filter((element, index) => {
        return errArr.indexOf(element) === index;
    });

    if(lasterrArr.length!==0){
        return lasterrArr
    }




}