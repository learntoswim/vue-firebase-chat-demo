<template>
  <div class="chat">
    <h1>#{{ chats.topic }}</h1>
    <div class="user-list">
      <div v-if="!currentUser.username">
        Join chat<br />
        <input class="new-user" type="text" v-model="newUser" placeholder="Name" />
        <button @click="handleOnAddUser">Add</button>
      </div>
      <div class="current-users">
        Current users:
        <ul>
          <li v-for="user in users">
            <!-- <router-link :to="`/chat/${chatId}/${user['.key']}`">{{ user.username }}</router-link> -->
            <span v-if="currentUser.username === user.username" class="you">{{ user.username }}</span>
            <span v-else>{{ user.username }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-content">
        <div class="comment-container">
          You are <span class="you">{{ currentUser.username }}</span>
          <input class="comment" type="text" v-model="comment" />
          <button @click="handleOnAddComment">Send</button>
        </div>
        <ul class="comment-stream">
          <li v-for="data in chats.comments">{{ data.username }} - {{ data.comment }}</li>
        </ul>
      </div>
    </div>
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

  methods.handleOnAddUser = function () {
    // this.addComment(this.comment);
    const newUser = {
      username: this.newUser,
    };
    const userKey = db.ref(`chats/${this.chatId}/users`).push().key;
    db.ref(`chats/${this.chatId}/users/${userKey}`).update(newUser)
      .then(() => {
        this.$router.push(`/chat/${this.chatId}/${userKey}`);
      })
      .catch(() => {
        // commit(types.CHAT_ERROR, error);
      });
  };

  methods.handleOnAddComment = function () {
    // this.addComment(this.comment);
    const newComment = {
      uid: this.userId,
      username: this.currentUser.username,
      comment: this.comment,
    };
    console.log(newComment);
    db.ref(`chats/${this.chatId}/comments`).push(newComment)
      .then(() => {
      })
      .catch(() => {
      });
  };

  export default {
    name: 'chat',
    data() {
      return {
        comment: null,
        loading: true,
        newUser: null,
        chatId: this.$route.params.chatId,
        userId: this.$route.params.userId,
      };
    },
    firebase() {
      return {
        chats: {
          source: db.ref(`chats/${this.chatId}`),
          asObject: true,
        },
        users: {
          source: db.ref(`chats/${this.chatId}/users`),
        },
        currentUser: {
          source: db.ref(`chats/${this.chatId}/users/${this.$route.params.userId}`),
          asObject: true,
        },
      };
    },
    // On route change, update user (testing only)
    watch: {
      $route() {
        db.ref(`chats/${this.chatId}/users/${this.$route.params.userId}`).on('value', (snap) => {
          this.userId = this.$route.params.userId;
          this.currentUser = snap.val();
        });
      },
    },
    methods: {
      ...methods,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    text-align: center;
  }
  .chat {
    text-align: left;
  }
  .user-list {
    float: left;
    width: 20%;
  }
  .you {
    font-weight: bold;
  }
  .chat-container {
    float: right;
    width: 80%;
    text-align: left;
  }
  .chat-content {
    padding: 0 20px 20px;
  }
  ul, li {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }
  .current-users {
    margin-top: 20px;
  }
  .comment-container {
    margin: 20px 0;
  }
  .comment {
    width: 100%;
    font-size: 20px;
  }
  .comment-stream li {
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0 0;
    background: #efefef;
  }
</style>
