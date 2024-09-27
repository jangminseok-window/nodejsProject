const { MongoClient } = require('mongodb');
const uri = "mongodb://midstar:dlalwjd5@localhost:27017/myapp";
const dbName = "myapp";

const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
});


async function connect() {
  

  try {
    // 데이터베이스에 연결
    console.log("1 connected to MongoDB");
    await client.connect();
    
    console.log("2 connected to MongoDB");
    // 연결 테스트를 위해 간단한 쿼리 실행
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
    
    return client;
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
    await client.close();
    throw error;
  }
}


module.exports = { connect };


