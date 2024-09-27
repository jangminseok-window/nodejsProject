const express = require('express');
const { connect } = require('./dbconn');

const app = express();
const port = 3000;

app.use(express.json());


// 새 문서 삽입 라우트
app.post('/documents', async (req, res) => {
  try {
    console.log('삽입 시작');

    client = await connect();
    console.log('DB 연결 성공');
    
    const db = client.db("myapp"); // 데이터베이스 이름을 지정해주세요
    const collection = db.collection('documents');

    console.log('컬렉션 접근');
    console.log('data:' + req.body);
    const insertResult = await collection.insertOne(req.body);
    console.log('삽입된 문서:', insertResult.insertedId);

    res.status(201).json({
      message: '문서가 성공적으로 삽입되었습니다.',
      insertedId: insertResult.insertedId
    });
  } catch (error) {
    console.error('MongoDB 처리중 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // 연결 종료
    await client.close();
  }
});

// 모든 문서 조회 라우트
app.get('/documents', async (req, res) => {
  let client;
  try {
    client = await connect();
    console.log('DB 연결 성공');
    
    const db = client.db("myapp"); // 데이터베이스 이름을 지정해주세요
    const collection = db.collection('documents');
    
    console.log('컬렉션 접근 성공');
    const documents = await collection.find().toArray();
    
    console.log(`${documents.length}개의 문서 조회됨`);
    res.json(documents);
  } catch (error) {
    console.error('MongoDB 처리중 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
      console.log('DB 연결 종료');
    }
  }
});
// 특정 이름으로 문서 조회 라우트
app.get('/documents/:name', async (req, res) => {
  try {
    const db = await connect();
    const collection = db.collection('documents');

    const document = await collection.findOne({ name: req.params.name });
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ message: '문서를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('MongoDB 처리중 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});