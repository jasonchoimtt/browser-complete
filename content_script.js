/* eslint-env webextensions */
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'request') {
        console.log('Content received request');
        const req = msg.request;

        const collected = new Set();

        if (req.mode === 'line') {
            const elems = document.querySelectorAll('pre');

            for (const elem of elems) {
                const para = elem.textContent;
                for (const line of para.split('\n')) {
                    const value = line.trim();
                    if (value.startsWith(req.query))
                        collected.add(value);
                }
            }
        } else {
            const elems = document.querySelectorAll('code,pre');

            for (const elem of elems) {
                const para = elem.textContent.trim();
                const re = /\b\w+\b/g;
                for (let m; (m = re.exec(para)); ) {
                    const [value] = m;
                    if (value.startsWith(req.query))
                        collected.add(value);
                }
            }
        }

        const resp = {
            completions: Array.from(collected)
        };

        console.log('Content response', resp);

        sendResponse(resp);
    } else {
        throw new Error('Invalid message type:', msg.type);
    }
});
