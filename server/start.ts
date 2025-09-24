import { createApp } from './index.js';

async function start() {
    const app = await createApp();
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

start().catch(console.error);