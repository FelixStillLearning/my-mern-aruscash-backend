const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // !! PENTING !!
        // Ganti nilai process.env.MONGO_URI dengan URI koneksi MongoDB Anda.
        // Anda bisa mendapatkannya dari MongoDB Atlas (rekomendasi) atau dari instalasi lokal.
        // Simpan URI di dalam file .env di root folder backend.
        // Contoh: MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/aruskasapp?retryWrites=true&w=majority

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
