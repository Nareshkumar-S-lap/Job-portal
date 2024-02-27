function logReqResponseOnConsole(request, h) {
    console.log(`[REQ]: ${request.method} ${request.path}`);

    return h.continue;
}

module.exports = {
    logReqResponseOnConsole
};
