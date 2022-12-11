import {Request,Response} from 'express'

export const editProfileImage = async(req:Request,res:Response)=>{
 const response = await addProfileImage(req.body.imgurl)
 if(response ) res.send(200).send('successfully-edited')
}
 export const editCoverImage =async (req:Request,res:Response) => {
    const response = await editCover(req.body.imgurl)
    if(response) res.send(200).send('success')

 }