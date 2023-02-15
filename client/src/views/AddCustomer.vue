<template>
  <v-container>
    <v-alert
      border="left"
      color="red"
      icon="mdi-alert-circle-outline"
      type="error"
      text
      v-model="alert"
      dismissible
    >
      Lütfen tüm bilgileri eksiksiz doldurunuz.
    </v-alert>
    <v-row no-gutters>
      <v-col sm="12" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Yeni Kullanıcı Ekle</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              v-model="customer.identificationNumber"
              label="Kimlik Numarası"
              prepend-icon="mdi-numeric"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              v-model="customer.nameSurname"
              label="Ad Soyad"
              prepend-icon="mdi-rename"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              v-model="customer.monthlyIncome"
              label="Aylık Gelir"
              prepend-icon="mdi-cash"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              v-model="customer.phoneNumber"
              label="Telefon Numarası"
              prepend-icon="mdi-cellphone"
              :rules="rules"
            ></v-text-field>
            <!-- <v-text-field v-model="customer.birthday" label="Doğum Tarihi" prepend-icon="mdi-view-list" :rules="rules"></v-text-field> -->
            <div>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="GG/AA/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  locale="tr-TR"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <v-text-field
              v-model="customer.deposit"
              label="Teminat"
              prepend-icon="mdi-cash-fast"
            ></v-text-field>
            <v-checkbox
              v-model="isCreditScoreRandom"
              label="Kredi Skorumu biliyorum."
              @change="onCheckboxClicked"
            ></v-checkbox>
            <v-text-field
              v-if="this.isCreditScoreRandom === true"
              v-model="customer.creditScore"
              label="Kredi Skoru"
              prepend-icon="mdi-account-credit-card"
              :rules="[creditScoreRules]"
              type="number"
              max="10"
              hint="Kredi Skorunuz 0 ile 1500 arasında bir değer olmalıdır."
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-if="this.isCreditScoreRandom === false"
              v-model="customer.creditScore"
              disabled
              label="Kredi Skoru"
              prepend-icon="mdi-account-credit-card"
              hint="Kredi Skorunuz otomatik olarak 0 ile 1500 arasında bir değer olarak oluşturulmaktadır."
              persistent-hint
            ></v-text-field>
            <v-btn type="submit" class="mt-4" color="primary">Başvur</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      rules: [(value) => !!value || "Bu alan gerekli! "],
      creditScoreRules: (v) => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v > 0 && v <= 1500) return true;
        return "Kredi Skorunuz 0 ile 1500 arasında bir değer olmalıdır.";
      },
      customer: {
        identificationNumber: "",
        nameSurname: "",
        monthlyIncome: "",
        phoneNumber: "",
        birthday: "",
        deposit: null,
        creditScore: null,
      },
      date: null,
      dateFormatted: null,
      menu2: false,
      alert: false,
      isCreditScoreRandom: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    async submitForm() {
      this.customer.birthday = this.dateFormatted;
      if (this.$refs.form.validate() && this.customer.birthday != null) {
        const response = await API.addCustomer(this.customer);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      } else {
        this.alert = true;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    onCheckboxClicked(){
      if(this.isCreditScoreRandom === false){
        var min = Math.ceil(0);
        var max = Math.floor(1500);
        this.customer.creditScore =
          Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        this.customer.creditScore = null;
      }
    },
  },
  mounted(){
    this.onCheckboxClicked();
  }
};
</script>
