# CourseGPT

[CourseGPT](https://course-gpt.herokuapp.com/) is more than an AI app - it's a vision for a more responsive,
personalized education system. By allowing professors to train Al models on-demand, students gain immediate access to
course-specific materials and logistical details. Professors and TA's can sit back and relax with a personal AI
assistant managing repetitive Q&A, while students can enjoy instant answers to questions for all of their courses in one
place.

**Live demo:** https://course-gpt.herokuapp.com/ (if offline, run locally—see below).  
**Demo accounts:**  
- Student/admin demo (preloaded chats/analytics): `grading@gmail.com` / `i_love_grading`  
- Professor demo (upload/train focus): `prof.emily@gmail.com` / `profemilydemo`

## What it does
- **Course-trained chat** - ingest PDFs or pasted text per course, chunk, embed, and route student questions through an OpenAI model with relevant context.
- **Multi-role** - students chat and bookmark courses; instructors upload training text; admins see feedback and usage analytics.
- **Chat UX** - history, inline feedback, prompt suggestions, copy-to-clipboard, and fuzzy search across all conversations.
- **Auth** - email/password with JWT + cookie sessions, optional Google OAuth.
- **Analytics** - sentiment and feedback dashboards with charts and word clouds.
- **Data seeding** - the demo is pre-seeded with sample course website content so you can explore immediately.

## Tech stack
- **Frontend:** React 18, Redux Toolkit, Chakra UI + styled-components, Chart.js/D3 visualizations, React Router.
- **Backend:** Node.js, Express, MongoDB/Mongoose, Passport (Google), JWT + cookie sessions.
- **AI/IR:** OpenAI (chat + embeddings), TensorFlow.js Universal Sentence Encoder, BM25 + TF-IDF utilities for similarity and keywording.
- **Build/ops:** Concurrent dev runner, Heroku deployment scripts, Nodemon for hot reload.

## Project structure
```
/client      # React SPA
/server      # Express API, auth, embeddings, analytics
/docs        # Extra screenshots
/readme_images
```

## Run it locally
1. **Prereqs:** Node 18+, MongoDB connection string, OpenAI API key (and org id if required).
2. **Environment (server/.env):**
   ```
   DB_CONNECTION_STRING=mongodb+srv://...
   JWT_SECRET=super-secret-key
   OPENAI_API_KEY=...
   OPENAI_ORG_ID=...               # optional depending on your account
   OPENAI_GPT_MODEL=gpt-4o-mini    # or gpt-4o / gpt-3.5-turbo
   EMBEDDING_MODEL=text-embedding-3-small
   TOKEN_LIMIT=6000                # optional cap for prompts
   GOOGLE_CLIENT_ID=...            # optional
   GOOGLE_CLIENT_SECRET=...        # optional
   ```
   For staging/production builds you can also set `REACT_APP_ENV=staging` when building the client.
3. **Install dependencies (root script installs client + server):**
   ```bash
   npm install
   ```
4. **Start in development:**
   ```bash
   npm run start:dev
   ```
   - API: http://localhost:3001  
   - Client: http://localhost:3000 (proxy points to the API)
5. **Prod-style run:** `npm run start` (uses the server in prod mode; build the client first with `npm run start:staging` or the Heroku postbuild).

## Using CourseGPT
1. Sign up or use the demo account.  
2. Create or pick a course, then upload text (or paste) to train it; the backend chunks, embeds, and stores vectors in MongoDB.  
3. Ask questions in a chat; CourseGPT embeds the query, retrieves the most similar chunks, and sends them with your question to OpenAI.  
4. Use search (Ctrl/Cmd+F) to fuzzy-search across all chats, add favorites, and leave feedback to feed the analytics dashboard.  
5. In the demo, explore existing chats and training data to see the workflow end-to-end.

## Screenshots
![Chat UI](readme_images/KyleRich%202023-08-09%20at%2008.52.26.png)
![Analytics dashboard](readme_images/KyleRich%202023-08-09%20at%2008.55.58.png)
![Course selector & prompts](readme_images/KyleRich%202023-08-09%20at%2008.53.22.png)
![Training progress](readme_images/KyleRich%202023-08-09%20at%2008.52.35.png)

## Notes & limits
- The repo does not ship course content; the hosted demo is preloaded with sample web-dev and systems course material. For local runs, upload your own text in the training screen.
- Large uploads are chunked; `TOKEN_LIMIT` keeps prompts under the OpenAI context window.
- OAuth is optional-if unset, only email/password login shows up.

## Next ideas
- Auto-training from mail/forum integrations.
- Sharable conversation links and richer access controls per course.
- One-click cleanup/editing of uploaded training data.
