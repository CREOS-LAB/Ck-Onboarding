const axios = require("axios")
require("dotenv").config()


const apiKey = String(process.env.YOUTUBE_API_KEY);

// Make a GET request to fetch video details
 const returnDescription = async (videoId = "N7-1AVAsWmg")=>{
    let description;

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
    .then((response) => {
    description = response.data.items[0].snippet.description;
    console.log(description)
  })
  .catch((error) => {
    console.error('Error fetching video description:', error);
  });

  return description
}

returnDescription("N7-1AVAsWmg")