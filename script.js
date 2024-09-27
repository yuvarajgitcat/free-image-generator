async function generateImage() {
    const apiKey = document.getElementById("apiKey").value;
    const prompt = document.getElementById("promptInput").value;
    const resultDiv = document.getElementById("result");
    
    // Clear previous results
    resultDiv.innerHTML = '';

    if (!apiKey || !prompt) {
        alert("Please enter both API key and prompt!");
        return;
    }

    try {
        // Call Unsplash API
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(prompt)}&client_id=${apiKey}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Failed to fetch image from Unsplash.');
        }

        // Extract image URL from response
        const data = await response.json();
        const imageUrl = data.urls.regular;

        // Display the fetched image
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}
