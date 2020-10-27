module.exports = function(app) {
    app.get("/", function(request, response) {
        response.json({ test: 'This is the main route' })
    });
}