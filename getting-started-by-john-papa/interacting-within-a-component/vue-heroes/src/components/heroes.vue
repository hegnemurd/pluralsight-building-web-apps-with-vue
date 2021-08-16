<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="card" v-show="heroes.length">
          <header class="card-header">
            <p class="card-header-title">heroes list</p>
          </header>
          <ul class="list is-hoverable">
            <li v-for="hero in heroes" :key="hero.id">
              <a
                class="list-item"
                @click="selectHero(hero)"
                :class="{ 'is-active': selectedHero === hero }"
              >
                <span>{{ hero.firstName }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>

      <div class="columns is-4" v-if="selectedHero">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ fullName }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>
                  {{ selectedHero.id }}
                </label>
              </div>
              <div class="field">
                <label class="label" for="firstName">First name</label>
                <input
                  class="input"
                  id="firstName"
                  v-model="selectedHero.firstName"
                />
              </div>
              <div class="field">
                <label class="label" for="lastName">Last name</label>
                <input
                  class="input"
                  id="lastName"
                  v-model="selectedHero.lastName"
                />
              </div>
              <div class="field">
                <label class="label" for="description">Description</label>
                <input
                  class="input"
                  id="description"
                  v-model="selectedHero.description"
                />
              </div>
              <div class="field">
                <label class="label" for="originDate">Origin date</label>
                <input
                  type="date"
                  class="input"
                  id="originDate"
                  v-model="selectedHero.originDate"
                />
                <p class="comment">
                  My origin story began on
                  {{ selectedHero.originDate | shortDate }}
                </p>
              </div>
              <div class="field">
                <label class="label" for="capeCounter">Cape counter</label>
                <input
                  class="input"
                  id="capeCounter"
                  type="number"
                  v-model="selectedHero.capeCounter"
                />
              </div>
              <div class="field">
                <label class="label" for="capeMessage">Cape message</label>
                <label class="input" name="capeMessage">{{
                  capeMessage
                }}</label>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero()"
            >
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';
const inputDateFormat = 'yyyy-MM-dd';
const displayDateFormat = `MMM dd, yyyy'`;

const ourHeroes = [
  {
    id: 10,
    firstName: 'Sabrina',
    lastName: 'Morts',
    capeCounter: 1,
    originDate: format(new Date(2000, 9, 17), inputDateFormat),
    description: 'Strom Bringer',
  },
  {
    id: 20,
    firstName: 'Rae',
    lastName: 'Erif',
    capeCounter: 3,
    originDate: format(new Date(1998, 7, 23), inputDateFormat),
    description: 'Did someone say fire',
  },
  {
    id: 30,
    firstName: 'Ella',
    lastName: 'Odanrot',
    capeCounter: 2,
    originDate: format(new Date(1997, 3, 5), inputDateFormat),
    description: 'Wielder of tornados ',
  },
  {
    id: 40,
    firstName: 'Jack',
    lastName: 'Deeps',
    capeCounter: 0,
    originDate: format(new Date(1999, 11, 31), inputDateFormat),
    description: 'Speediest of them all',
  },
];
export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  computed: {
    fullName() {
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
  },
  created() {
    this.loadHeroes();
  },
  methods: {
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'Getting the heroes, please be patient.';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
    cancelHero() {
      this.selectedHero = undefined;
      this.message = '';
    },
    saveHero() {
      // This only updates when you click the save button
      this.message = JSON.stringify(this.selectedHero, null, '\n ');
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`Watcher evaluated, old=${oldValue}, new${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    shortDate: function(DateinISOformat) {
      return format(parseISO(DateinISOformat), displayDateFormat);
    },
  },
};
</script>
