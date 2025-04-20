export const generateTasksFromPrompt = async (prompt) => {
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      console.log("GPT Response:", res);
      const { content } = await res.json();
      console.log("Raw GPT Output:", content);
  
      // Try to match and extract a valid JSON array from GPT's response
      const match = content.match(/\[\s*{[\s\S]*?}\s*\]/);
      if (!match) {
        console.error("No JSON array found in GPT response.");
        return [];
      }
  
      const parsed = JSON.parse(match[0]);
      console.log("Parsed Task List:", parsed);
      return parsed;
    } catch (err) {
      console.error("AI Task Generation Error:", err);
      return [];
    }
  };
  