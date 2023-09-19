import mongoose from 'mongoose';

const connectionDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(err){
        console.log('error ', err);
    }
}

export default connectionDB;