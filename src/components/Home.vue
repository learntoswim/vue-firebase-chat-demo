<template>
  <div>
    <h1>Chat</h1>
    <input type="text" v-model="username" placeholder="Your username" />
    <input type="text" v-model="topic" placeholder="Enter a chat topic" />
    <button @click="handleOnCreateChat">Create chat</button>
  </div>
</template>

<script>
  /* eslint func-names: ["error", "never"] */
  import db from '../db';

  /**
   * Base object used for Methods.
   * @returns {void}
   */
  const methods = () => {};

  methods.handleOnCreateChat = function () {
    const newChat = {
      topic: this.topic,
    };
    const newUser = {
      username: this.username,
    };
    const key = db.ref('chats').push().key;
    db.ref(`chats/${key}`).set(newChat)
      .then(() => {
        // Create the current user also
        const userKey = db.ref(`chats/${key}/users`).push().key;
        db.ref(`chats/${key}/users/${userKey}`).update(newUser)
          .then(() => {
            this.$router.push(`/chat/${key}/${userKey}`);
          })
          .catch(() => {
          });
      })
      .catch(() => {
      });
  };

  export default {
    name: 'home',
    data() {
      return {
        loading: true,
        username: null,
        topic: null,
      };
    },
    firebase: {
      chats: db.ref('chats'),
    },
    methods: {
      ...methods,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
