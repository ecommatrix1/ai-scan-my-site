<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## AI Maintenance Workflows

### Setup Commands
To setup the project locally, run:
```bash
npm install
npm run dev
```

### Environment Variables
Copy `.env.example` to `.env.local` or `.env` and set the following values:
```bash
API_URL=https://api.example.com
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
```

### Test Execution
To run the automated tests, execute:
```bash
npm run test
```
