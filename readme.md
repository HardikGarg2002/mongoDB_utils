# @hardikgarg2002/mongodb_utils
![mongoDB_utils](https://socialify.git.ci/HardikGarg2002/mongoDB_utils/image?language=1&owner=1&name=1&stargazers=1&theme=Light)

A utility package for managing MongoDB connections using Mongoose. This package provides functions to initialize, check, disconnect, and retry connections to MongoDB in a robust and efficient manner.

## Installation

Install the package via npm:

```bash
npm install @hardikgarg2002/mongodb_utils
```

## ⚙️ Environment Variables

Ensure the following environment variables are set in your `.env` file for optimal functionality:

| Variable        | Description                                  | Required            | Default       |
|-----------------|----------------------------------------------|----------|---------------|
| `MONGO_URI`     | MongoDB connection URI                      | Yes      | N/A           |
| `MONGO_DB_NAME` | Database name to connect to                 | No       | N/A (from URI)|
| `MONGO_TIMEOUT` | MongoDB server selection timeout (in ms)    | No       | 15000         |
| `MONGO_DEBUG`   | Enable debug mode to log MongoDB queries    | No       | `false`       |


## 📚 Functions

### `initMongoDB()`

Initializes the MongoDB connection using Mongoose.
- Logs connection success or error messages.
- Enables Mongoose query debugging if `MONGO_DEBUG` is set to `true`.

#### Usage:

```javascript
import { initMongoDB } from "@hardikgarg2002/mongodb_utils";
await initMongoDB();
```

### `isMongoDBConnected()`

Checks if the MongoDB connection is active.

Returns true if connected, otherwise false.


#### Usage:

```javascript
import { isMongoDBConnected } from "@hardikgarg2002/mongodb_utils";

if (isMongoDBConnected()) {
  console.log("Database is connected");
} else {
  console.log("Database is not connected");
}
```

### `disconnectMongoDB()`
- Disconnects the MongoDB connection.
- Logs a message upon successful disconnection.

Usage:
```javascript
import { disconnectMongoDB } from "@hardikgarg2002/mongodb_utils";
disconnectMongoDB();
```
### retryMongoDBConnection()
- Retries connecting to MongoDB if not already connected.
- Logs the connection status and errors during the retry process.

Usage:

```javascript
import { retryMongoDBConnection } from "@hardikgarg2002/mongodb_utils";
await retryMongoDBConnection();
```

## 🛠️ Example
```javascript
import {
  initMongoDB,
  isMongoDBConnected,
  disconnectMongoDB,
  retryMongoDBConnection,
} from "@hardikgarg2002/mongodb_utils";

(async () => {
  await initMongoDB();

  if (isMongoDBConnected()) {
    console.log("MongoDB is connected!");
  } else {
    console.log("MongoDB is not connected, retrying...");
    await retryMongoDBConnection();
  }

  disconnectMongoDB();
})();
```
## License 📄
This package is licensed under the MIT License. See the LICENSE file for details.

## Author
### Hardik Garg

Feel free to contribute, suggest improvements, or report issues!