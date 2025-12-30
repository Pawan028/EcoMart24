const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pincode = require('./models/pincodeModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const pincodes = [
    { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', deliveryTime: '30-45 mins' },
    { pincode: '400002', city: 'Mumbai', state: 'Maharashtra', deliveryTime: '30-45 mins' },
    { pincode: '400020', city: 'Mumbai', state: 'Maharashtra', deliveryTime: '30-45 mins' },
    { pincode: '110001', city: 'Delhi', state: 'Delhi', deliveryTime: '35-50 mins' },
    { pincode: '110002', city: 'Delhi', state: 'Delhi', deliveryTime: '35-50 mins' },
    { pincode: '560001', city: 'Bangalore', state: 'Karnataka', deliveryTime: '30-40 mins' },
    { pincode: '560002', city: 'Bangalore', state: 'Karnataka', deliveryTime: '30-40 mins' },
    { pincode: '500001', city: 'Hyderabad', state: 'Telangana', deliveryTime: '35-45 mins' },
    { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', deliveryTime: '35-50 mins' },
    { pincode: '700001', city: 'Kolkata', state: 'West Bengal', deliveryTime: '40-55 mins' },
];

const importData = async () => {
    try {
        await Pincode.deleteMany();
        await Pincode.insertMany(pincodes);

        console.log('✅ Pincode data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Pincode.deleteMany();

        console.log('✅ Pincode data destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
