<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
    <v-container>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-container>
      <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="ПІБ"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.year"
                      label="Рік народження"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Телефон"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                  <v-btn
                  depressed
                    color="primary"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-text>
  
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="ПІБ"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.year"
                      label="Рік народження"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Телефон"
                  ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                  <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Ви справді хочете видалити цього студента?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Вийти</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Так</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      search:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ПІБ',
          align: 'start',
          value: 'name',
        },
        { text: 'Рік народження', value: 'year' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        year: 0,
        phone: 0,
        email: 0
      },
      defaultItem: {
        name: '',
        year: 0,
        phone: 0,
        email: 0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
       this.students = [
          {
            name: 'Боць Володимир Юрійович',
            year: 2001,
            phone: 380986335801,
            email: 'volodymyr.bots@oa.edu.ua'
          },
          {
            name: 'Бунтін Максим Анатолійович',
            year: 2000,
            phone: 380886375884,
            email: 'maksym.buntin@oa.edu.ua'
          },
          {
            name: 'Вознюк Денис Вікторович',
            year: 2000,
            phone: 380675975101,
            email: 'denys.vozniuk@oa.edu.ua'
          },
          {
            name: 'Грищук Микола Володимирович',
            year: 1998,
            phone: 389674408910,
            email: 'mykola.hryshchuk@oa.edu.ua'
          },
          {
            name: 'Демидюк Михайло Дмитрович',
            year: 1999,
            phone: 380668935864,
            email: 'mykhailo.demydiuk@oa.edu.ua'
          },
          {
            name: 'Дігалевич Тарас Сергійович',
            year: 2001,
            phone: 380686975222,
            email: 'taras.dihalevych@oa.edu.ua'
          },
          {
            name: 'Зінчук Ярослав Степанович',
            year: 1999,
            phone: 380689031804,
            email: 'yaroslav.zinchuk@oa.edu.ua'
          },
          {
            name: 'Калініченко Микола Олексійович',
            year: 2001,
            phone: 380890546466,
            email: 'mykola.kalinichenko@oa.edu.ua'
          },
          {
            name: 'Коваль Ростислав Васильович',
            year: 2000,
            phone: 3809765975804,
            email: 'rostyslav.koval@oa.edu.ua'
          },
          {
            name: 'Ковбасюк Олександр Михайлович',
            year: 1998,
            phone: 380686975890,
            email: 'oleksandr.kovbasiuk@oa.edu.ua'
          }
    ]
      },

      editItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.students.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
        } else {
          this.students.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>