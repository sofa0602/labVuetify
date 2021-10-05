<template>
      <v-list
      subheader
      flat
    >
     <v-text-field class='ma-6'
            v-model="newItemTitle"
            clearable
            @keyup.enter='addNewItem()'
            outlined
            @click:append="addNewItem()"
            label="Add input"
            append-icon="mdi-cart-outline"
          ></v-text-field>
    <div v-for="(item, index ) in shoppingList"
        :key="item.title">
        <v-list-item
          @click="doneBought(item.id)"
          :class="{ 'blue lighten-5' : item.bought}"
        >
          <template>
            <v-list-item-action>
              <v-checkbox
                :input-value='item.bought'
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{'text-decoration-line-through' : item.bought}">
              {{item.title}}
              </v-list-item-title>
            </v-list-item-content>
             <v-list-item-action>
                    <v-btn icon
                     @click="deleteItem(index)">
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
              </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider inset>
        </v-divider>
    </div>
    </v-list>
</template>

<script>
export default {
  name: 'List',
  components: {
  },
  data: () => ({
    shoppingList: [
      { id: '0', title: 'Яблуко', bought: false },
      { id: '1', title: 'Груша', bought: false },
      { id: '2', title: 'Банан', bought: false }
    ],
    newItemTitle: ' '
  }),
  methods: {
    doneBought (id) {
      console.log(this.shoppingList.filter(item => item.id === id))
      const itemList = this.shoppingList.filter(item => item.id === id)
      itemList[0].bought = !itemList[0].bought
    },
    deleteItem (id) {
      this.shoppingList.splice(id, 1)
    },
    addNewItem () {
      this.shoppingList.push({
        id: this.shoppingList.length,
        title: this.newItemTitle
      })
      this.newItemTitle = ' '
      this.shoppingList.forEach((i) => { console.log(i.id) })
    }
  }
}
</script>
