async function testApi() {
  try {
    console.log("Testing POST /api/v1/campaigns/");
    const createRes = await fetch('http://localhost:5000/api/v1/campaigns/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Test Campaign",
        description: "Testing API Persistence"
      })
    });
    const createData = await createRes.json();
    console.log("Create Response:", createData);

    console.log("\nTesting GET /api/v1/campaigns/");
    const getRes = await fetch('http://localhost:5000/api/v1/campaigns/');
    const getData = await getRes.json();
    console.log("Get Response:", getData);
    
    // Check if JSON file was updated
    const fs = await import('fs');
    const path = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/campaigns.json";
    if (fs.existsSync(path)) {
      console.log("\ncampaigns.json exists!");
      const content = fs.readFileSync(path, 'utf8');
      console.log("File length:", content.length);
      console.log("File content snippet:", content.substring(0, 500));
    } else {
      console.log("\ncampaigns.json DOES NOT EXIST!");
    }
  } catch (error) {
    console.error("API Error:", error);
  }
}

testApi();
