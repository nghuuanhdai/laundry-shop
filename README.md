<h1 align="center">
    Laundry Shop
</h1>
<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/24937352/175799116-9f8424d9-034e-4bd8-be74-851240bee3ce.png" alt="Online tutor logo">
  <br/>
  <h4 align="center">A web application made with nextjs, mongodb, firebase auth for laundry shop management.</h4>
</p>

## Demo
### Live demo: [Laundry Shop Heroku](https://nnhhaadd-laundry-shop.herokuapp.com/)

### Deploy it yourself
  - **Clone this repo:** `git clone git@github.com:nghuuanhdai/laundry-shop.git`
  - **Setup environment variable:** This application uses Firebase, and MongoAtlas. To deploy the application yourself, make sure to populate all the environment variables in the following table.


| Key | Value |
|---|---|
| NEXT_PUBLIC_FB_API_KEY      | Firebase public API key |
| NEXT_PUBLIC_DB_AUTH_DOMAIN  | Firebase auth domain |
| NEXT_PUBLIC_PROJECT_ID      | Firebase project id |
| NEXT_PUBLIC_STORAGE_BUCKET  | Firebase storage bucket |
| NEXT_PUBLIC_MESSAGING_SENDER_ID | Firebase messaging sender ID |
| NEXT_PUBLIC_APP_ID          | Firebase public app ID |
| NEXT_PUBLIC_MEASUREMENT_ID  | Firebase measurement ID |
| FB_ADMIN_TYPE               | Firebase admin type -> set this to <service_account> |
| FB_ADMIN_PROJECT_ID         | Firebase project id for server side initialization |
| FB_ADMIN_PRIVATE_KEY_ID     | Firebase private id with new line escaped as \n |
| FB_ADMIN_CLIENT_EMAIL       | Firebase client email |
| FB_ADMIN_CLIENT_ID          | Firebase client ID |
| FB_ADMIN_AUTH_URI           | Firebase auth URI |
| FB_ADMIN_TOKEN_URI          | Firebase admin token URI |
| FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL | Firebase admin auth provider x509 certification URL |
| MONGODB_URI                 | MongoDB connection URI |

  - **Start the server with**  `npm run start` 
       
## Features
### Account authentication/authorization
This application uses Firebase Authentication service to provide login, register features.  
**Without an account users are treated as customers**

### Customer usage

|Feature|Preview|
|---|---|
|A Customer can use receipt ID or scan a QR code on their receipt to keep track of their request.<br>The website will try to open user device camera to scan the QR code|*Request tracking form*<br>![image](https://user-images.githubusercontent.com/24937352/175799174-97d20129-2cc5-41d1-b2e8-9cc393ec8b85.png)<br>*QR scanning popup*<br>![image](https://user-images.githubusercontent.com/24937352/175799235-9efd4a11-1863-4ed4-93f1-ef25ccb1364b.png)|
|User can view information about their request, or print out the receipt again if needed|*Request information*<br>!![image](https://user-images.githubusercontent.com/24937352/175799438-036193c3-5c51-4618-b797-af3fdc21e988.png)|

### Shop manager usage
|Feature|Preview|
|---|---|
| Shop manager can see request in a table format | ![image](https://user-images.githubusercontent.com/24937352/175799344-d48ac6f7-0248-4b04-b261-097cc0edf240.png) |
| Shop manager can click on edit or delete to update a request with the following form. Or use it to create new form | *new request form*<br>![image](https://user-images.githubusercontent.com/24937352/175799373-7a7a00c9-4bee-4ffc-be14-d2d812aad7bc.png)<br>*edit form*<br>![image](https://user-images.githubusercontent.com/24937352/175799387-05818039-7ce3-4e4d-9626-db851cf5d75d.png)|
|Shop manager can print out a receipt for their customers | ![image](https://user-images.githubusercontent.com/24937352/175799403-e15a43c3-2103-4fe5-a5fa-3f0eee40c3be.png) |
|Shop manager can scan QR or enter receipt ID to search for a request|![image](https://user-images.githubusercontent.com/24937352/175799421-706410e7-8da6-4c10-93be-733a098a52b1.png)|
