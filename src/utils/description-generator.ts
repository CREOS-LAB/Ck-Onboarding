import axios from "axios";
require("dotenv").config()

function extractVideoId(url : string) {
    try {
      const parsedUrl = new URL(url);
      const searchParams = new URLSearchParams(parsedUrl.search);
      const videoId = searchParams.get("v");
      return videoId;
    } catch (error) {
      // Handle invalid URLs or errors
      return null;
    }
}

const apiKey = String(process.env.YOUTUBE_API_KEY);

// Make a GET request to fetch video details
export const returnDescription = async (link: string)=>{
    let videoId = extractVideoId(link)
    let description;

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
    .then((response) => {
    description = response.data.items[0].snippet.description;
  })
  .catch((error) => {
    console.error('Error fetching video description:', error);
  });

  return description
}

