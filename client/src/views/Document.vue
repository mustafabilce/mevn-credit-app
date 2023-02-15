<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" class="mx-auto">
        <v-card class="pa-5">
          <h2>Proje Konusu</h2>
          <p class="mt-3">Proje <b>MEVN</b> Stack (MongoDB, ExpressJS, VueJS, NodeJS) kullanılarak kodlanmıştır.</p>
          <p class="mt-3">
            Bir kredi başvuru sistemi için, kredi başvuru isteklerini alıp ilgili kriterlere göre müşteriye kredi sonucunu dönen servisin içinde yer alacak restful bir uygulamanın yazılması ve isteğe bağlı olarak önyüzünün yazılması.
          </p>
          <h2>Kurallar</h2>
          <div class="mt-3">
            <p>- Kullanıcının Kredi Skoru 0 ile 1500 arasında rastgele bir sayı üretilerek oluşturulur.</p>
            <p>- Eğer kullanıcı Kredi Skorunu biliyorsa kendisi farklı bir değer girerek başvuruyu gönderebilir.</p>
            <p>- Sisteme yeni kullanıcılar tanımlanabilir, mevcut müşteriler güncellenebilir veya silinebilir.</p>
            <p>- Kredi skoru 500’ün altında ise kullanıcı reddedilir. (Kredi sonucu: <b>Red</b>)</p>
            <p>- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 5000 TL’nin altında ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya 10.000 TL limit atanır. (Kredi Sonucu: <b>Onay</b>). Eğer teminat vermişse teminat bedelinin yüzde 10 u kadar tutar kredi limitine eklenir.</p>
            <p>- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 5000 TL ile 10.000TL arasında ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya 20.000 TL limit atanır. (Kredi Sonucu: <b>Onay</b>) Eğer teminat vermişse teminat bedelinin yüzde 20 si kadar tutar kredi limitine eklenir.</p>
            <p>- Kredi skoru 500 puan ile 1000 puan arasında ise ve aylık geliri 10.000 TL’nin üstünde ise kullanıcının kredi başvurusu onaylanır ve kullanıcıya AYLIK GELİR BİLGİSİ * KREDİ LİMİT ÇARPANI/2 kadar limit atanır. (Kredi Sonucu: <b>Onay</b>) Eğer teminat vermişse teminat bedelinin yüzde 25 i kadar tutar kredi limitine eklenir.</p>
            <p>- Kredi skoru 1000 puana eşit veya üzerinde ise kullanıcıya AYLIK GELİR BİLGİSİ * KREDİ LİMİT ÇARPANI kadar limit atanır. (Kredi Sonucu: <b>Onay</b> ) Eğer teminat vermişse teminat bedelinin yüzde 50 si kadar tutar kredi limitine eklenir.</p>
            <p>- Kredinin neticelenmesi sonucunda ilgili kullanıcı ve başvuruyu içeren bilgiler veritabanına kaydedilir. </p>
            <p>- Gerçekleştirilmiş ve kaydedilmiş bir kredi başvurusu sorgulanabilmeli. </p>
            <p><b>Notlar:</b> Kredi limit çarpanı varsayılan olarak 4’tür.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  components: {
    
  }
}
</script>
