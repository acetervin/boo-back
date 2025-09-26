import { createApp } from './index.js';

async function start() {
    console.log('Starting server...');
    const app = await createApp();
    console.log('App created.');
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

start().catch(console.error);