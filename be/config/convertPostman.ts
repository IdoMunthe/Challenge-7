import postmanToOpenApi from "postman-to-openapi";

const collections = ["ch6-synrgy-idomunthe"];
const options = {
  defaultTag: "General",
  servers: [
    {
      url: "http://localhost:5000",
      description: "SYNRGY 7 Challenge 6 FSW 2 Ido Munthe",
    },
  ],
};

collections.forEach(async (collection) => {
  try {
    let collection_capitalize =
      collection.charAt(0) + collection.slice(1);

    let postmanCollection = `${__dirname.replace("config", "")}${collection_capitalize}.postman_collection.json`;

    let outputFile = `${__dirname.replace("config", "")}api-${collection}-docs.yaml`;

    await postmanToOpenApi(postmanCollection, outputFile, options);

    console.log(`Collection ${collection} berhasil diconvert.`);
  } catch (error) {
    console.log(error);
  }
});
