<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Kullanıcıyı Düzenle</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field v-model="customer.identificationNumber" label="Kimlik Numarası" prepend-icon="mdi-note" :rules="rules"></v-text-field>
            <v-text-field v-model="customer.nameSurname" label="Ad Soyad" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-text-field v-model="customer.monthlyIncome" label="Aylık Gelir" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-text-field v-model="customer.phoneNumber" label="Telefon Numarası" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-text-field v-model="customer.birthday" label="Doğum Tarihi" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-text-field v-model="customer.deposit" label="Teminat" prepend-icon="mdi-view-list" ></v-text-field>
            <v-btn type="submit" class="mt-3" color="primary">Düzenle</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  data(){
    return {
      rules: [(value) => !!value || "This field is required! "],
      customer: {
        nameSurname: "",
        identificationNumber: "",
        monthlyIncome: "",
        phoneNumber: "",
        deposit: "",
        creditScore: "",
        creditLimit: "",
        creditResult: "",
      },
    };
  },
  async created(){
      const response = await API.getCustomerByID(this.$route.params.id);
      this.customer = response;
  },
  methods: {
    async updateForm(){
      if(this.$refs.form.validate()){
        const response = await API.updateCustomer(this.$route.params.id, this.customer);
        this.$router.push({ name: 'home', params: { message: response.message } });
      }
    }
  }
}
</script>