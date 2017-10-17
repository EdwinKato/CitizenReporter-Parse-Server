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
    },
        {
            useMasterKey: true
        },
        {
        success: function() {
            console.log("Push notification was sent successfully");
            // Push was successful
        },
        error: function(error) {
            throw "Got an error " + error.code + " : " + error.message;
        }
    }).then(() => {
      // Push was successful
      console.log("Push notification was sent successfully");
  }, (e) => {
      console.log(e);
  });
});

/*
Parse.Cloud.afterSave("Comment", function(request) {
  const query = new Parse.Query("Post");
  query.get(request.object.get("post").id)
    .then(function(post) {
      post.increment("comments");
      return post.save();
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
});

Parse.Cloud.afterSave("MXTMessage", function(request) {
  var messageText = request.object.get('message');
  var usersReceived = request.object.get('receiver');
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('user', usersReceived);
  pushQuery.notEqualTo('user', request.user);
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
        "assignmentId": assignmentId,
        "title": title,
        "description": description
    }
  }, { useMasterKey: true}).then(() => {
      // Push was successful
      console.log('weeee!');
  }, (e) => {
      console.log(e);
  });
});
    */