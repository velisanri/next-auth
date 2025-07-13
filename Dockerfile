# 1. Base image olarak Node 20 LTS kullanıyoruz
FROM node:20-alpine

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Proje dosyalarını kopyala
COPY . .

# 6. Next.js build işlemi
RUN npm run build

# 7. Uygulamayı 3000 portunda çalıştır
EXPOSE 3000

# 8. Container çalıştırıldığında bu komut çalışacak
CMD ["npm", "start"]
