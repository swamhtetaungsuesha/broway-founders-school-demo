export const mdyFormat = (d) => {
    const nd = new Date(d)
    const options = { day:'numeric', year: 'numeric', month: 'short' };
    const df = nd.toLocaleDateString('en-US',options)
    return df
  }

export const myFormat = (d) => {
    const nd = new Date(d)
    const options = {  year: 'numeric', month: 'short'};
    const df = nd.toLocaleDateString(undefined,options)
    const ff = df.replace(' ',' - ')
    return ff
}

export function queryFormat(d) {
  const [m,y] = d.split(' - ')
  const numbericMonth = (String(['Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'].indexOf(m) + 1).padStart(2, '0'))
    return `${numbericMonth}_${y}`
}

export function capitalizeFormat(str) {
  const formatedStr = str.charAt(0).toUpperCase() + str.slice(1);
  
  return formatedStr
}

export function stringCutFormat(str,isBetween) {

 

  const index0fStartposition = str.indexOf('(') 
  const index0fEndposition = str.indexOf(')') 

  if(isBetween){
    const removeStr = str.slice(index0fStartposition,index0fEndposition+1)
    const formatedStr = str.replace(removeStr,'')
    return formatedStr
  
  }
  const formatedStr = str.slice(index0fStartposition+1,index0fEndposition)

  return formatedStr
}



export function tagCutString(str,count=39) {
  const unremovedArr= str.split(/[<>]+/)
  let upSplitStr = str;
  for (const item of unremovedArr) {
    const index0fStartposition = upSplitStr.indexOf('<') 
  const index0fEndposition = upSplitStr.indexOf('>') 

  const removeStr = upSplitStr.substring(index0fStartposition,index0fEndposition+1)

  const removedStr = upSplitStr.replace(removeStr,' ')

  upSplitStr = removedStr 
  }
  
  const finalArr = upSplitStr.split(' ')
  const final =finalArr.filter(item=>item!=='').slice(0,count)
  final.push('...')
  const finalStr =final.join(' ')
  return finalStr
}

export const categoryRouterFormat = (str) => {
 const formatedStr = str.split(' ').join('_')
 return formatedStr
}