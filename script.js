// IMPORTANT: Replace with your actual Elastic Beanstalk endpoint
const API_ENDPOINT = 'https://d23m47uggfn3kw.cloudfront.net/predict';

// Handle prediction when button is clicked
predictBtn.addEventListener('click', function() {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Fetch API to send the image to your Elastic Beanstalk backend
    fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
            return;
        }
        predictionResult.textContent = data.prediction;
        confidenceResult.textContent = `${(data.confidence * 100).toFixed(2)}%`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to connect to the API. Make sure your Elastic Beanstalk environment is running and allows CORS from this domain.');
    });
});
