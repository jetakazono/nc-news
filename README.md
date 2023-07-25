# NC NEWS
___
A social news aggregation, web content rating and discussion website. Northcoders News has articles which are divided into topics, and each article has user-curated ratings from upvotes and downvotes using the API. Users can also add comments about an article.

📰 Check the hosted version here: [NC NEWS UI](https://nc-news-by-jessica.netlify.app)

:octocat: Link to the backend repo: [NC NEWS API](https://github.com/jetakazono/nc-news-api)

🌐 Link to the hosted version of the backend API: [NC NEWS API](https://nc-news-api-tts7.onrender.com/api)

## Minimum Requirements:
- Node JS - ``` v20.2.0^ ```

## Built with
- React JS
- Vite
- Axios
- Tailwind CSS
- React Router
- React Hot Toast

## > Installing / > Getting Started
##### Clone the repository:
``` shell
 git clone https://github.com/jetakazono/nc-news
```
##### Install the dependencies:
Navigate to the project directory:
``` shell
cd nc-news
```
Install dependencies
```
npm install
```
##### Running the app:
```
npm run dev
```

## Features

#### 
* View a list of all articles
    * see a list of all articles.
* View an individual article
    * go to a new page to read an individual article.

* View a list of comments associated with an article
   * see the comments linked with an individual article alongside it.

* Vote on an article
   * vote on the article that they are reading.
 
* Post a new comment to an existing article
   * add a new comment to the article that they are reading.
     
* View a separate page for each topic with a list of related articles
   * view the different topics.
   * select a topic to view associated articles.

* Sort articles
   * sort how the articles are presented to them.
   * Queries to implement:
     * sort by date
     * sort by comment count
     * sort by votes
     * flip the order between ascending and descending

* Delete comments
  * delete their own comments only.

* Error handling
  * for a non-existent path.
  * for a non-existent article.
  * for a non-existent topic.
  * when posting a new comment if they have not provided all of the required information.   

### :rocket: Deploying / Publishing
* Hosting the App: [Netlify](https://vitejs.dev/guide/static-deploy.html#netlify)
    
### Wireframes:
https://www.figma.com/file/HHKJoK1nSOWreockDdcB66/NC-NEWS?type=whiteboard&node-id=0%3A1&t=becYc7RBkvFmzNBh-1

### Component tree:
https://mm.tt/app/map/2862824366?t=HHbEuJr18L

### Author
👩🏻‍💻 Jessica, with mentorship provided by [Northcoders](https://northcoders.com/)
