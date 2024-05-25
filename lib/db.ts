import mongoose, { Connection } from "mongoose"
let isConnected: Connection | boolean = false;

const connectDatabase = async () => {
    if (isConnected) {
        return isConnected;
    }
    try {
        const res = await mongoose.connect("mongodb+srv://svkpapan:o51V6wdXbNam5Z14@cluster0.vdqwjok.mongodb.net/");
        console.log('mongodb connected successfully.');
        isConnected = res.connection;
        return isConnected;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default connectDatabase;