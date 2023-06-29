import { createStore } from 'vuex'

export default createStore({
  state: {
    books: null,
    book: null,
    user: null,
    asc: true,
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setBooks: (state, books) => {
      state.books = books;
    },
    setBook: (state, book) => {
      state.book = book;
    },
    setProperty: (state, book) => {
      state.book = book;
    },
    sortBooksByPrice: (state) => {
      state.books.sort((a, b) => {
        return a.price - b.price;
      });
      if (!state.asc) {
        state.books.reverse();
      }
      state.asc = !state.asc;
    },
  },


  actions: {
    login: async (context, payload) => {
      const { email, password } = payload;

      const response = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const userData = await response.json();
      context.commit("setUser", userData[0]);
    },
    getBooks: async (context) => {
      fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((books) => context.commit("setBooks", books));
    },
    getBook: async (context, id) => {
      fetch(" http://localhost:3000/books/" + id)
        .then((res) => res.json())
        .then((book) => context.commit("setBook", book));
    },
  },

})
