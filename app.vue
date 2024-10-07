<template>
  <main class="container-fluid">

    <!-- Form to add new comment -->
    <div class="grid">
      <div id="section-form">
        <h1 id="title">Guestbook</h1>
        <button @click="downloadFile">Download Guide</button>
        <section>
          <h2>Add a Comment</h2>
          <form @submit.prevent="addComment">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" required />

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />

            <label for="comment">Comment:</label>
            <textarea id="comment" v-model="form.comment" required></textarea>

            <button type="submit">Add Comment</button>
          </form>
        </section>

        <!-- Search comments -->
        <section>
          <h2>Search Comments</h2>
          <form @submit.prevent="searchComments">
            <label for="search">Keyword:</label>
            <input type="text" id="search" v-model="searchQuery" placeholder="Search for comments..." />
            <button type="submit">Search</button>
            <button @click="fetchComments" type="button">Reset</button>
          </form>
        </section>
      </div>
      <!-- List of existing comments -->
      <section v-if="comments.length">
        <article v-for="comment in comments" :key="comment.id" class="comment">
          <header>
            <h3>{{ comment.name }}</h3>
            <small>{{ comment.email }}</small>
          </header>
          <div v-html="comment.comment"></div>
        </article>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  name: '',
  email: '',
  comment: ''
})

const comments = ref([])
const searchQuery = ref('')

const fetchComments = async () => {
  try {
    const response = await $fetch('/api/get-comments', {
      method: 'GET'
    })
    comments.value = response
  } catch (error) {
    console.error('Failed to fetch comments:', error)
  }
}

const addComment = async () => {
  try {
    await $fetch('/api/add-comment', {
      method: 'POST',
      body: form.value
    })

    form.value = {
      name: '',
      email: '',
      comment: ''
    }
    await fetchComments()
  } catch (error) {
    console.error('Failed to add comment:', error)
  }
}

const searchComments = async () => {
  try {
    if (!searchQuery.value) {
      return fetchComments()
    }

    const response = await $fetch('/api/search-comment', {
      method: 'GET',
      query: { search: searchQuery.value }
    })

    comments.value = response
  } catch (error) {
    console.error('Failed to search comments:', error)
  }
}

const downloadFile = async () => {
  try {
    const filename = 'guide.pdf';

    const url = `/api/read-file?filename=${encodeURIComponent(filename)}`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('Failed to download the file:', error);
  }
}

onMounted(() => {
  fetchComments()
})
</script>

<style scoped>
main {
  padding: 3em;
}

#section-form {
  position: sticky;
  height: 100%;
}

#title {
  margin-bottom: 2rem;
}

form {
  margin-bottom: 2rem;
}

.comment {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 1rem;
}

button[type="button"] {
  margin-left: 1rem;
}
</style>
