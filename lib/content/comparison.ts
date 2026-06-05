export type ComparisonRow = {
  attribute: string
  diy: string
  agency: string
  wevlra: string
}

export const comparisonRows: ComparisonRow[] = [
  {
    attribute: "Kecepatan",
    diy: "Berminggu-minggu belajar",
    agency: "1–3 bulan pengerjaan",
    wevlra: "Siap dalam 3–7 hari",
  },
  {
    attribute: "Biaya",
    diy: "Gratis, tapi waktu mahal",
    agency: "Rp 10–50 juta+",
    wevlra: "Mulai Rp 499 ribu",
  },
  {
    attribute: "Kustomisasi",
    diy: "Terbatas template",
    agency: "Penuh, tapi lama",
    wevlra: "Penuh & Kustom",
  },
  {
    attribute: "Dukungan",
    diy: "Forum & dokumentasi",
    agency: "Terbatas pasca-launch",
    wevlra: "Tim lokal via WhatsApp",
  },
  {
    attribute: "SEO",
    diy: "Manual, perlu keahlian",
    agency: "Tergantung paket",
    wevlra: "Bawaan di setiap paket",
  },
  {
    attribute: "Hosting",
    diy: "Bayar & urus sendiri",
    agency: "Sering tidak termasuk",
    wevlra: "Termasuk di semua paket",
  },
  {
    attribute: "Update Konten",
    diy: "Harus bisa coding",
    agency: "Bayar per perubahan",
    wevlra: "Mudah via dashboard",
  },
]
