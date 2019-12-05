<template>
  <div id="container" :style="{ backgroundColor: currentColor }">
    <div id="backgroundContainer">
      <div id="contentContainer">
        <div class="main" v-if="!edit">
          <h1>{{ currentMessage }}</h1>
          <div id="letterContainer">
            <input type="text" id="letterBox" :value="currentLetter" />
          </div>
          <button id="edit" @click="editColor(currentLetter)">
            Farbe ändern
          </button>
        </div>
        <div class="edit" v-else>
          <h1>Farbe ändern</h1>
          <div id="letterContainer">
            <input
              disabled
              type="text"
              id="letterBox"
              v-model="currentLetter"
            />
          </div>
          <v-color-picker
            id="colorPicker"
            v-model="currentEditColor"
          ></v-color-picker>
          <button id="save" @click="uploadData()">
            Daten Speichern
          </button>
        </div>
      </div>
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
        this.currentLetter = "";
        this.currentLetter = letter;
        if (this.colorData.hasOwnProperty(letter.toLowerCase())) {
          this.currentColor = this.colorData[letter.toLowerCase()];
        } else {
          this.editColor(letter);
        }
      }
    };
    $("#letterBox").keydown(event => {
      setLetter(event.key);
    });
    $("#letterBox").focus();
  },
  methods: {
    setGreetingMessage() {
      this.currentMessage = "Buchstabe eintippen:";
    },
    uploadData() {
      console.info("selected Color: ", this.currentEditColor);
      this.currentColor = this.currentEditColor;
      this.currentLetter = "";
      this.currentLetter = this.letterToEdit;
      this.colorData[this.letterToEdit.toLowerCase()] = this.currentEditColor;
      this.edit = false;
      $("#letterBox").focus();
    },
    editColor(letter) {
      this.letterToEdit = letter;
      this.currentLetter = "";
      this.currentLetter = letter;
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
#backgroundContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: radial-gradient(
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 95%
  );
}
#contentContainer {
  flex: none;
}
#colorPicker {
  margin: 20px auto 20px auto;
}
.main h2 {
  margin-top: 10px;
}
h3 {
  margin: 40px 0 0;
}
#letterBox {
  width: 90px;
  margin: 20px auto 20px auto;
  font-size: 5vh;
  text-align: center !important;
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
