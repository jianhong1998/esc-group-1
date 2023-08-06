# Engineering Science (ENS) - Group 1

## Pre-Request

Node version >= 18

NPM version >= 9.5.1

## Run Project

1. Create a file name and name it `.env`
2. In the `.env` file, fill in OpenAI API Key as `API_KEY`. Please referent to the `./.env.template` file. Eg: `API_KEY = abcde`
3. Run the command `npm install` to install all necessary modules.
4. Run the command `npm run dev` at the project root to start the project in dev mode.

## API Endpoints

### Crawl all possible useful URLs from the input URL

GET Request to `http://localhost:3001/api/news/urls?u=<input_url>`

-   Replace `<input_url>` with the CNA webpage URL, which contains `https://` in front.

### Get news content in the input URL

GET Request to `[http://localhost:3001/api/news/url/](http://localhost:3001/api/news/content?u=<input_url>`

-   Replace `<input_url>` with the CNA news webpage URL, which contains `https://` in front.

### Get multiple news content from the input URL by crawling all possible useful URLs

GET Request to `http://localhost:3001/api/news?u=<input_url>`

-   Replace `<input_url>` with the CNA webpage URL, which contains `https://` in front.

### Get summarized content (manual input content)

POST Request to `http://localhost:3001/api/summarize/` with body `{"message": "<news_content>"}`

-   Replace `<news_content>` with the content that is to be summarized.

### Get summarized multiple news contents (crawling from the CNA webpage)

GET Request to `http://localhost:3001/api/summarize/news?u=<input_url>`

-   Replace `<input_url>` with the CNA webpage URL, which contains `https://` in front.

### Get translated content (manual input content)

POST Request to `http://localhost:3001/api/translate` with body `{"content": "<news_content>"}`

-   Replace `<news_content>` with the content that is to be translated.

### Full function - Get Summarized and Translated news

GET Request to `http://localhost:3001/api/combine/?u=<input_url>`

-   Replace `<input_url>` with the CNA webpage URL, which contains `https://` in front.
