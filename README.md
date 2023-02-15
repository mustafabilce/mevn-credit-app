
![picture alt](https://repository-images.githubusercontent.com/274452889/5e9b9700-c5bc-11ea-85f3-f61a86c7f1e4)

# Bank Credit Project

Proje MEVN Stack (MongoDB, ExpressJS, VueJS, NodeJS) kullanılarak kodlanmıştır.

## Proje Konusu

Bir kredi başvuru sistemi için, kredi başvuru isteklerini alıp ilgili kriterlere göre müşteriye kredi sonucunu dönen servisin içinde yer alacak restful bir uygulamanın yazılması ve isteğe bağlı olarak önyüzünün yazılması.

### Kurallar
- Kullanıcının Kredi Skoru 0 ile 1500 arasında rastgele bir sayı üretilerek oluşturulur.

- Eğer kullanıcı Kredi Skorunu biliyorsa kendisi farklı bir değer girerek başvuruyu gönderebilir.

- Sisteme yeni kullanıcılar tanımlanabilir, mevcut kullanıcılar güncellenebilir veya silinebilir.

- Kredi skoru 500’ün altında ise kullanıcı reddedilir. (Kredi sonucu: __Red__)

- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 5000 TL’nin altında ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya 10.000 TL limit atanır. (Kredi Sonucu: __Onay__). Eğer teminat vermişse teminat bedelinin  __%10__ u kadar tutar kredi limitine eklenir.

- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 5000 TL ile 10.000TL arasında ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya 20.000 TL limit atanır. (Kredi Sonucu: __Onay__) Eğer teminat vermişse teminat bedelinin  __%20__ si kadar tutar kredi limitine eklenir.

- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 10.000 TL’nin üstünde ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya AYLIK GELİR BİLGİSİ * KREDİ LİMİT ÇARPANI/2 kadar limit atanır. (Kredi Sonucu: __Onay__) Eğer teminat vermişse teminat bedelinin  __%25__ i kadar tutar kredi limitine eklenir.

- Kredi skoru 1000 puana eşit veya üzerinde ise kullanıcıya AYLIK GELİR BİLGİSİ * KREDİ LİMİT ÇARPANI kadar limit atanır. (Kredi Sonucu: __Onay__) Eğer teminat vermişse teminat bedelinin  __%50__ si kadar tutar kredi limitine eklenir.

- Kredinin neticelenmesi sonucunda ilgili kullanıcı ve başvuruyu içeren bilgiler veritabanına kaydedilir. 
- Gerçekleştirilmiş ve kaydedilmiş bir kredi başvurusu sorgulanabilmeli. 

__Not__: Kredi limit çarpanı varsayılan olarak __4__’tür.
