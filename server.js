const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Daftar Pelanggan Anda (Ubah atau tambahkan data sesuai kebutuhan tim)
const daftarPelanggan = [
    { bank: '014', norek: '1234567890', namaTerdaftar: 'BUDI SANTOSO' },
    { bank: 'EW_DANA', norek: '08123456789', namaTerdaftar: 'SITI AMINAH' },
    { bank: '535', norek: '028700000', namaTerdaftar: 'ANDI WIJAYA' }
];

// Jalur Pengecekan & Validasi
app.post('/api/cek', async (req, res) => {
    const { bank, norek } = req.body;
    const norekBersih = norek.trim();

    // Mencari nomor rekening/HP di daftar pelanggan
    const pelanggan = daftarPelanggan.find(
        item => item.bank === bank && item.norek === norekBersih
    );

    if (!pelanggan) {
        return res.json({
            ditemukan: false,
            pesan: 'Nomor rekening / HP tidak ditemukan di dalam daftar pelanggan.'
        });
    }

    // Simulasi pengambilan nama pemilik rekening dari bank
    // (Nanti bagian ini diganti dengan kode API resmi Xendit/Flip jika sudah berlangganan)
    const namaAsliDariBank = pelanggan.namaTerdaftar; 

    // Mencocokkan nama
    const isSesuai = namaAsliDariBank.toLowerCase() === pelanggan.namaTerdaftar.toLowerCase();

    res.json({
        ditemukan: true,
        namaRekening: namaAsliDariBank,
        namaPelanggan: pelanggan.namaTerdaftar,
        sesuai: isSesuai,
        statusPesan: isSesuai ? '✅ SESUAI (Nama rekening cocok dengan daftar pelanggan)' : '❌ TIDAK SESUAI (Nama berbeda)'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server CekDong.com berjalan di port ${PORT}`);
});