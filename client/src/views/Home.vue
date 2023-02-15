<template>
  <v-container>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6">
          Sil
        </v-card-title>

        <v-card-text class="py-3">
          Bu kullanıcıyı silmek istediğinize emin misiniz?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn style="text-transform: capitalize;" color="primary" text @click="dialog = false">
            Vazgeç
          </v-btn>
          <v-btn style="text-transform: capitalize;" color="error" text @click="removeCustomer(selectedItemId)">
            Sil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}
    </v-alert>
    <v-row no-gutters>
      <v-col sm="12" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>
            Kullanıcı Listesi
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Ara"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="this.loading"
            loading-text="Veriler Yükleniyor..."
            :headers="headers"
            :items="customers"
            :search="search"
            :footer-props="{
              itemsPerPageText: 'Sayfa başına satır sayısı:',
            }"
          >
            <template v-slot:item.creditResult="{ item }">
              <v-chip :color="item.creditResult == true ? 'success' : 'error'" label outlined small>
                <span v-if="item.creditResult == true">Onaylandı</span>
                <span v-else>Reddedildi</span>
              </v-chip>
            </template>
            <template v-slot:item.deposit="{ item }">
              <p class="mb-0" v-if="item.deposit != null">{{ item.deposit }}</p>
              <p class="mb-0 font-weight-bold" v-else>-</p>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <v-btn
                  icon
                  color="primary"
                  :to="{ name: 'edit-customer', params: { id: item._id } }"
                >
                  <v-icon dark small> mdi-pen </v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  @click.stop="openRemoveModal(item._id)"
                >
                  <v-icon dark small> mdi-delete </v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      customers: [],
      dialog: false,
      search: "",
      selectedItemId: "",
      headers: [
        { text: "Ad Soyad", value: "nameSurname" },
        { text: "Kimlik Numarası", value: "identificationNumber" },
        { text: "Aylık Gelir", value: "monthlyIncome" },
        { text: "Telefon Numarası", value: "phoneNumber" },
        { text: "Doğum Tarihi", value: "birthday" },
        { text: "Teminat", value: "deposit" },
        { text: "Kredi Skoru", value: "creditScore" },
        { text: "Kredi Limiti", value: "creditLimit" },
        { text: "Kredi Sonucu", value: "creditResult" },
        { text: "İşlemler", value: "actions" },
      ],
    };
  },
  async created() {
    this.customers = await API.getAllCustomer();
  },
  mounted(){
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    async removeCustomer(id) {
      const response = await API.deleteCustomer(id);
      if (response.message_code === "SUCCESS") {
        this.dialog = false;
        this.$route.params.message = response.message;
        this.customers = await API.getAllCustomer();
      }
    },
    openRemoveModal(id){
      this.selectedItemId = id;
      this.dialog = true;
    }
  },
};
</script>
