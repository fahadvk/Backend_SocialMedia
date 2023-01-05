import  { model, Schema } from "mongoose";
import { Admin } from "../Controllers/AdminController";

const adminModel = model('Admin', 
               new Schema({ UserName: String, Password:String}), 
               'Admin'); 




export default adminModel