export interface CourseSection{
    id?:number,
    courseId:number,
    title:string,
    description:string,
    content:string,
    videoUrl:string,
    order?:number,
    isdeleted?:Boolean
}