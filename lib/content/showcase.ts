export type ShowcaseItem = {
  name: string
  description: string
}

export type ShowcaseCategory = {
  id: string
  label: string
  items: ShowcaseItem[]
}

export const showcaseCategories: ShowcaseCategory[] = [
  {
    id: "umkm",
    label: "UMKM",
    items: [
      {
        name: "Batik Nusantara",
        description: "Toko online batik handmade dengan katalog produk lengkap",
      },
      {
        name: "Kopi Kita",
        description: "Landing page kedai kopi lokal dengan menu dan reservasi",
      },
      {
        name: "Catering Bu Sari",
        description: "Website catering dengan paket harga dan form pemesanan",
      },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    items: [
      {
        name: "Portofolio Reza",
        description:
          "Portofolio fotografer profesional dengan galeri interaktif",
      },
      {
        name: "Blog Perjalanan Dina",
        description: "Blog travel dengan cerita dan tips wisata nusantara",
      },
      {
        name: "CV Online Arif",
        description: "Resume digital interaktif untuk melamar pekerjaan impian",
      },
    ],
  },
  {
    id: "korporat",
    label: "Korporat",
    items: [
      {
        name: "PT Maju Bersama",
        description:
          "Website perusahaan konstruksi dengan profil dan portofolio proyek",
      },
      {
        name: "Klinik Sehat Sentosa",
        description:
          "Website klinik dengan jadwal dokter dan pendaftaran online",
      },
      {
        name: "Yayasan Peduli Anak",
        description:
          "Website yayasan sosial dengan program donasi terintegrasi",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    items: [
      {
        name: "Toko Herbal Alami",
        description:
          "Toko online produk herbal dengan sistem keranjang belanja",
      },
      {
        name: "Fashion Lokal ID",
        description:
          "E-commerce fashion lokal dengan filter produk dan wishlist",
      },
      {
        name: "Elektronik Murah",
        description:
          "Marketplace elektronik dengan perbandingan harga dan ulasan",
      },
    ],
  },
]
