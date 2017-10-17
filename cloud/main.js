Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

//Push Notification new assignments
Parse.Cloud.afterSave("Assignment", function(request) {
    console.log('Parse.serverURL: ' + Parse.serverURL);
    var title = request.object.get('title');
    var description = request.object.get('description');
    // var assignmentId = request.object.get('objectId');
    var assignmentId = request.object.id;
    var pushQuery = new Parse.Query(Parse.Installation);
    Parse.Push.send({
        where: pushQuery, // Set our Installation query
        data: {
            "assignmentId": assignmentId,
            "title": title,
            "description": description
        }
    }, {
        success: function() {
            console.log("Push notification was sent successfully");
            // Push was successful
        },
        error: function(error) {
            throw "Got an error " + error.code + " : " + error.message;
        }
    });
});
