import Categories from "../../../models/categoryModel"
import Posts from "../../../models/postModel";
import connectdb from "../../../config/connectdb";


connectdb();

export default async function handler(req,res){
    switch (req.method) {

        case 'GET':
            await getCareers(req,res)
            break;
    }
}
class APIFeatures{
    constructor(query,queryString){
        this.query = query,
        this.queryString = queryString
    }

    sorting(){
        
            this.query=this.query.sort('-createdAt')
        
        return this
    }
    paginating(){
        const page = this.queryString.page*1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip =( page - 1 )* limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}
const getCareers=async(req,res)=>{
    try {
        const selectedCategory = await Categories.findOne({routerPath:"/careers"})
        const features =new APIFeatures(Posts.find({category:selectedCategory._id}),req.query)
       .sorting().paginating()
        const careers = await features.query
       
        // const newsDate = await Posts.find({category:selectedCategory._id}).find().select('createdAt').sort('-createdAt')
                
        return res.json({
            msg : 'success data fetching',
            result : careers.length,
            selectedCategory,
            careers 
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


// [
//     {
//         "title" : "Afterschool Coordinator",
//         "content" : "<p>The Culture Coordinator will play a critical role in spearheading the implementation, oversight and assessment of initiatives that promote a culture of achievement and respect where high expectations and results are the norms. The overarching goals of the initiatives will focus on an enhanced discipline and behavioral framework, student socio-emotional support, attendance improvement, and faculty/staff development. The School Culture Coordinator will work in close collaboration with key school and community stakeholders to manage existing and integrate new culture initiatives that are meeting expectations and the outcomes are consistently tracked. Data should reflect significant and measurable gains, each year, with all students, as well as faculty and staff. The actions of our Culture Coordinator must always be aligned with our mission, vision, Sci High Pillars, and education program.</p><p>The essential functions of our Culture Coordinator are as follows:</p><p><strong>I. CULTURE OF ACHIEVEMENT AND RESPECT</strong></p><p>• Collaborate with the school leadership team to create and manage a safe and welcoming learning environment for students, faculty, and staff to achieve and evolve.</p><p>• Collaborate with the school leadership team to develop and manage the school-wide Culture of Achievement and Respect Plan, develop and maintain systems and processes that ensure performance data is accurately, consistently, and comprehensively reported and tracked.</p><p>• Coordinate with Grade-level and Club Sponsors to manage existing and implement positive programs for students during and after-school. (Ex. Grade Level Town Hall Meetings, Student Council, Drumline, etc.)</p><p>• Develop and coordinate School-wide Assemblies, school meetings, and events.</p><p>• Research and implement new school culture initiatives and reinvigorate existing ones that support positive school culture.</p><p>• Develop strong relationships with administration, faculty/staff, students, and families to generate a collective and comprehensive commitment to the culture of achievement and</p><p>respect plan.</p><p>• Collaborate with Sci High Parent &amp; Family Engagement Specialist on family events.</p><p>• Build relationships with other professional staff, outside agencies and community organizations to form partnerships in order to improve school culture and climate.</p><p>• Model professionalism and the Sci High Pillars at all times.</p>",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-02-28T04:39:33.457+00:00"
//     },
//     {
//         "title" : "Site Testing Coordinator",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-02-22T04:39:33.457+00:00"
//     },
//     {
//         "title" : "Substitute Teacher (Immediate Opening)",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-02-12T04:39:33.457+00:00"
//     },
//     {
//         "title" : "Bilingual School Front Office Assistant",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-01-26T04:39:33.457+00:00"
//     },
//     {
//         "title" : "History Teacher (SY 22-23)",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-01-09T04:39:33.457+00:00"
//     },
//     {
//         "title" : "Computer Science Teacher (SY 22-23)",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-01-20T04:39:33.457+00:00"
//     },
//     {
//         "title" : "Environmental Science Teacher (22-23 SY)",
//         "content" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
//          "category" : "62b581b87afa2fac6d347125",
//          "createdAt" : "2022-03-18T04:39:33.457+00:00"
//     }
// ]
