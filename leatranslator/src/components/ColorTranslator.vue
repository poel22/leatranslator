<template>
  <div id="container" :style="{ backgroundColor: currentColor }">
    <div class="main" v-if="!edit">
      <h1>{{ currentMessage }}</h1>
      <h2>{{ currentLetter }}</h2>
      <button id="edit" @click="editColor(currentLetter)">
        Farbe ändern
      </button>
    </div>
    <div class="edit" v-else>
      <h1>Farbe ändern</h1>
      <h2>{{ letterToEdit }}</h2>
      <v-color-picker v-model="currentEditColor"></v-color-picker>
      <button id="save" @click="uploadData()">
        Daten Speichern
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "ColorTranslator",
  props: {
    colorData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: false,
      currentEditColor: "",
      currentColor: "",
      currentMessage: "",
      currentLetter: "i <3 u",
      letterToEdit: "",
      letters: "abcdefghijklmnopqrstuvwxyz"
    };
  },
  mounted() {
    this.setGreetingMessage();
    const setLetter = letter => {
      console.log(this.colorData);
      if (
        !this.edit &&
        letter.length == 1 &&
        this.letters.includes(letter.toLowerCase())
      ) {
        this.currentLetter = letter;
        if (this.colorData.hasOwnProperty(letter.toLowerCase())) {
          this.currentColor = this.colorData[letter.toLowerCase()];
        } else {
          this.editColor(letter);
        }
      }
    };
    $("#edit").keydown(event => {
      setLetter(event.key);
    });
    $("#edit").focus();
  },
  methods: {
    setGreetingMessage() {
      this.currentMessage = "Buchstabe eintippen:";
    },
    uploadData() {
      console.info("selected Color: ", this.currentEditColor);
      this.currentColor = this.currentEditColor;
      this.colorData[this.letterToEdit.toLowerCase()] = this.currentEditColor;
      this.edit = false;
    },
    editColor(letter) {
      this.letterToEdit = letter;
      this.edit = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  height: 100vh;
  width: 100vw;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
