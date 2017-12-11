/* eslint-env webextensions */
const native = browser.runtime.connectNative('browser_complete_server');


const TIMEOUT = 500;


console.log('Background script works!');

async function handleRequest(req) {
    console.log('Received request', req);

    // Select active tabs
    const tabs = await browser.tabs.query({active: true});

    let responses = [];
    const promises = tabs.map((tab, i) => {
        return browser.tabs.sendMessage(tab.id, {
            type: 'request',
            request: Object.assign(req, {
                query: req.query.replace(/^\s+/, '')
            })
        })
            .catch(err => {
                // Probably the content script was not loaded.
                if (err.message.includes('connection'))
                    return null;
                throw err;
            })
            .then(resp => {
                if (responses) responses[i] = resp;
            });
    });

    // Wait for a limited time
    const racePromise = Promise.race([
        Promise.all(promises),
        new Promise((resolve) => setTimeout(resolve, TIMEOUT))
    ]);

    if (!await racePromise) console.log('Request timed out, responding...');

    const output = {
        id: req.id,
        completions: []
    };
    for (const resp of responses) {
        if (!resp) continue;
        output.completions.push(...resp.completions);
    }

    // Allow GC even if there are unresolved promises
    responses = null;

    console.log('Replying', output);

    native.postMessage(output);
}

native.onMessage.addListener(async (req) => {
    try {
        await handleRequest(req);
    } catch (err) {
        native.postMessage({id: req.id, error: true, message: err.message});
    }
});
