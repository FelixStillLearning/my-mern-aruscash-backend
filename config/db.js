const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // !! PENTING !!
        // Ganti nilai process.env.MONGO_URI dengan URI koneksi MongoDB Anda.
        // Anda bisa mendapatkannya dari MongoDB Atlas (rekomendasi) atau dari instalasi lokal.
        // Simpan URI di dalam file .env di root folder backend.
        // Contoh: MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/aruskasapp?retryWrites=true&w=majority

        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000, // 15 seconds
            socketTimeoutMS: 45000, // 45 seconds
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error('Full error:', error);
        
        // Don't exit, let the app continue but warn about DB issues
        console.warn('⚠️  Application starting without database connection');
    }
};

module.exports = connectDB;
