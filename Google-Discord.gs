function sendToDiscord() {  
  const classroom = 0 /*insert classroom ID*/;  

  let announcements = Classroom.Courses.Announcements.list(classroom).announcements; //gets a list of ALL announcements
  let resources = Classroom.Courses.CourseWorkMaterials.list(classroom).courseWorkMaterial; //same but with RESOURCES

  //ANNOUNCEMENTS
  for(let i = 0; i < announcements.length; i++) //for each announcement
  { 
    let postDate = new Date(announcements[i].updateTime);    
    let dateNow = new Date(Date.now());
    dateNow.setMinutes(dateNow.getMinutes() - 1);
    
    if(dateNow < postDate) //if it has been posted in the last minute
    {
      var post = "" ;
      post+= announcements[i].text; //add the text of the announcement
      if(announcements[i].materials != null) //if it has materials
      {        
        for(let j = 0; j < announcements[i].materials.length; j++) //foreach material
        {
          if(announcements[i].materials[j].link != null) // if it is a link
          {
            post+= "\n" + announcements[i].materials[j].link.url + "\n"; //add link           
          }
          else if(announcements[i].materials[j].driveFile != null) //if it is a file
          {
            post+= "\n" + announcements[i].materials[j].driveFile.driveFile.alternateLink + "\n"; //add link to file            
          }      
          else 
          {
            send("ERROR", 13632027, "E") //otherwise send
          }
        }
      }
      Logger.log(post);
      send(post, 8311585, "A"); //send to function below with topic "A"
    }    
  }


  ////RESOURCES
  for(let i = 0; i < resources.length; i++) //foreach resource
  {    
    Logger.log(resources[i].topicId + " " + resources[i].title)

    let postDate = new Date(resources[i].updateTime);    
    let dateNow = new Date(Date.now());
    dateNow.setMinutes(dateNow.getMinutes() - 1);    

    if(dateNow < postDate) //if it has been posted in the last minute
    {
      var post = "";
      var topic = "";

      post+= ("## " + resources[i].title + "\n"); //add title [in large font]
      if(resources[i].description!= null) //if there is a description
      {
        post+=(resources[i].description + "\n"); //add description
      }

      //FILTERS BASED ON TOPIC
      if(resources[i].topicId == 0/*insert topic ID*/ ) 
      {
        topic = "X";
      }
      else
      {
        topic = "M";
      }

      if(resources[i].materials != null) //if it has materials
      {
        for(let j = 0; j < resources[i].materials.length; j++) //foreach material
        {
          if(resources[i].materials[j].link != null) //if it is a link
          {
            post+= "\n" + resources[i].materials[j].link.url + "\n"; //add link
          }
          else if(resources[i].materials[j].driveFile != null) //if it is a file
          {
            post+= "\n"+ resources[i].materials[j].driveFile.driveFile.alternateLink + "\n"; //add link to file
          }      
          else 
          {
            send("ERROR", 13632027, "E") //otherwise send an error to the test channel
          }  
        }
      }
      send(post, 8311585, topic) //send to function below with topic as sorted above
    }    
  }
}


function send(message, colour, topic)
{
  var discordUrl ="**INSERT WEBHOOK URL**";
  if(topic == "X")
  {
    discordUrl = "**INSERT WEBHOOK URL**";
  }
  else if (topic == "E")
  {
    discordUrl = "**INSERT WEBHOOK URL**";
  }  

  var payload = JSON.stringify({"content": "> \n\n", "embeds": [{"description": message,"color": colour}]});  
  Logger.log(payload);
  
  var params = {
    method: "POST",
    payload: payload,
    muteHttpExceptions: true,
    contentType: "application/json"
    };
  var response = UrlFetchApp.fetch(discordUrl, params);

}
