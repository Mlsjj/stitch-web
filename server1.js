const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3001;

// 启用CORS
app.use(cors());
// 解析JSON请求体
app.use(express.json());
// 提供静态文件
app.use(express.static('.'));

// 搜索路由
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: '搜索关键词不能为空' });
    }
    
    console.log(`收到搜索请求: ${q}`);
    
    // 偷偷调用外部搜索引擎的API（这里使用模拟数据，实际项目中可以替换为真实的API调用）
    // 注意：在实际项目中，需要使用真实的搜索引擎API密钥
    // 例如：Google Custom Search API、Bing Web Search API等
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟搜索结果
    const mockResults = [
      {
        title: `关于"${q}"的搜索结果 1`,
        snippet: `这是与"${q}"相关的搜索结果描述。在实际应用中，这里会显示与搜索词相关的内容摘要。`,
        relevance: 95
      },
      {
        title: `关于"${q}"的搜索结果 2`,
        snippet: `这是与"${q}"相关的搜索结果描述。在实际应用中，这里会显示与搜索词相关的内容摘要。`,
        relevance: 88
      },
      {
        title: `关于"${q}"的搜索结果 3`,
        snippet: `这是与"${q}"相关的搜索结果描述。在实际应用中，这里会显示与搜索词相关的内容摘要。`,
        relevance: 76
      }
    ];
    
    // 实际API调用示例（注释掉，仅供参考）
    /*
    const apiKey = 'YOUR_API_KEY';
    const searchEngineId = 'YOUR_SEARCH_ENGINE_ID';
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(q)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // 整理结果
    const results = data.items.map(item => ({
      title: item.title,
      snippet: item.snippet,
      relevance: 90 // 实际项目中可以根据API返回的相关度计算
    }));
    */
    
    // 后端把结果整理成前端想要的格式
    const formattedResults = mockResults.map((result, index) => ({
      id: index + 1,
      title: result.title,
      content: result.snippet,
      relevance: result.relevance
    }));
    
    console.log('搜索完成，返回结果');
    
    // 返回给前端显示
    res.json({
      success: true,
      query: q,
      results: formattedResults
    });
    
  } catch (error) {
    console.error('搜索错误:', error);
    res.status(500).json({ error: '搜索过程中发生错误' });
  }
});

// 启动服务器，绑定到0.0.0.0地址以允许网络访问
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`网络访问地址: http://0.0.0.0:${PORT}`);
  console.log(`前端页面地址: http://localhost:${PORT}/未命名.html`);
  console.log('同一WiFi网络中的设备可以通过您的本地IP地址访问此服务');
});
