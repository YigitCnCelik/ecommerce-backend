
# E-commerce Backend System

Bu proje, kullanıcıların bir e-ticaret platformunda kayıt olmalarını, giriş yapmalarını ve çeşitli hizmetler için sipariş vermelerini sağlayan bir backend sistemi içerir. Sistem, Node.js ile Express.js kullanılarak geliştirilmiştir ve SQLite veritabanını kullanır. JWT (JSON Web Token) ile kimlik doğrulama yapılmaktadır.

## Özellikler

- Kullanıcı Kaydı ve Giriş Yapma
- JWT Token ile Kimlik Doğrulama
- Hizmet Listesi Görüntüleme
- Sipariş Oluşturma ve Sipariş Listesi Görüntüleme
- SQLite Veritabanı Kullanımı

## Gereksinimler

- [Node.js](https://nodejs.org/en/) (v14 veya daha günceli)
- [SQLite](https://www.sqlite.org/index.html)

## Projenin Kurulumu

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/username/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Gerekli Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Veritabanını Ayarlayın

Proje SQLite veritabanını kullanır. Veritabanı migration işlemlerini gerçekleştirmek için şu komutu çalıştırın:

```bash
npx sequelize-cli db:migrate
```

### 4. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını projenizin ana dizinine ekleyin ve aşağıdaki ortam değişkenlerini tanımlayın:

```bash
JWT_SECRET=supersecretkey
PORT=3000
```

- **JWT_SECRET**: JWT tokenları oluşturmak için kullanılan gizli anahtar. Bunu güvenli bir anahtar ile değiştirin.
- **PORT**: Sunucunun çalışacağı port. Varsayılan olarak `3000` kullanılır.

### 5. Sunucuyu Başlatın

```bash
npm start
```

Sunucu başarılı bir şekilde başlatıldıktan sonra şu adreste çalışacaktır: `http://localhost:3000`.

## API Dökümantasyonu

### Kullanıcı Kayıt Olma

- **URL**: `/auth/register`
- **Metod**: `POST`
- **Body (JSON)**:
  ```json
  {
      "name": "John",
      "surname": "Doe",
      "email": "john@example.com",
      "password": "123456"
  }
  ```
- **Başarılı Yanıt**: `201 Created`
  ```json
  {
      "id": 1,
      "name": "John",
      "surname": "Doe",
      "email": "john@example.com",
      "balance": 100
  }
  ```

### Kullanıcı Giriş Yapma

- **URL**: `/auth/login`
- **Metod**: `POST`
- **Body (JSON)**:
  ```json
  {
      "email": "john@example.com",
      "password": "123456"
  }
  ```
- **Başarılı Yanıt**: `200 OK`
  ```json
  {
      "token": "your_jwt_token"
  }
  ```

### Servisleri Listeleme

- **URL**: `/services`
- **Metod**: `GET`
- **Başarılı Yanıt**: `200 OK`
  ```json
  {
      "services": [
          {
              "id": 1,
              "name": "Standard Shipping",
              "description": "Basic shipping service with average delivery time.",
              "price": 5.00
          },
          {
              "id": 2,
              "name": "Express Shipping",
              "description": "Faster delivery service with premium charges.",
              "price": 15.00
          }
      ]
  }
  ```

### Sipariş Oluşturma

- **URL**: `/orders`
- **Metod**: `POST`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Body (JSON)**:
  ```json
  {
      "service_id": 1,
      "quantity": 2
  }
  ```
- **Başarılı Yanıt**: `201 Created`
  ```json
  {
      "order_id": 1,
      "user_id": 1,
      "service_id": 1,
      "quantity": 2,
      "total_price": 10.00
  }
  ```

### Siparişleri Listeleme

- **URL**: `/orders`
- **Metod**: `GET`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Başarılı Yanıt**: `200 OK`
  ```json
  {
      "orders": [
          {
              "id": 1,
              "service_id": 1,
              "quantity": 2,
              "total_price": 10.00,
              "createdAt": "2024-09-19T12:34:56.789Z"
          }
      ]
  }
  ```

## Test Çalıştırma

Testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:

```bash
npm test
```

Temel testler, kullanıcı kayıt ve giriş işlemlerini kontrol eder.

## Proje Yapısı

```
.
├── controllers
│   ├── authController.js
│   ├── orderController.js
│   └── serviceController.js
├── models
│   ├── User.js
│   ├── Order.js
│   └── Service.js
├── routes
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   └── serviceRoutes.js
├── config
│   └── database.js
├── migrations
│   └── {timestamp}-create-user.js
├── tests
│   └── auth.test.js
├── app.js
├── server.js
└── README.md
```

## Katkıda Bulunma

Her türlü katkı, hata bildirimleri veya öneriler memnuniyetle karşılanır. Lütfen bir **issue** açın veya bir **pull request** gönderin.

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
