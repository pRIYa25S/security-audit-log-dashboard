async function testBulkUpload() {
  const bulkLogs = [];
  console.log('Generating 10,000 mock log records...');
  
  for (let i = 1; i <= 10000; i++) {
    bulkLogs.push({
      action: i % 2 === 0 ? "DELETE USER" : "LOGIN",
      actor: `user${i}@company.com`,
      role: i % 5 === 0 ? "admin" : "engineer",
      resource: `/api/resources/${i}`,
      ipAddress: `192.168.1.${i % 255}`,
      region: "ap-south-1",
      severity: i % 3 === 0 ? "HIGH" : "INFO",
      status: i % 4 === 0 ? "Resolved" : "Unresolved",
      timestamp: new Date(Date.now() - i * 1000).toISOString()
    });
  }

  try {
    console.log(`Sending 10,000 logs to server... (this might take a few seconds)`);
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:5000/api/logs/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bulkLogs)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server returned an error:', errorText);
      return;
    }

    const result = await response.json();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Response from server (in ${duration}s):`, result);
  } catch (err) {
    console.error('Error during bulk upload test:', err);
  }
}

testBulkUpload();