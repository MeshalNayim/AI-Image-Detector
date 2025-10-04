document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const predictBtn = document.getElementById('predictBtn');
    const predictionResult = document.getElementById('predictionResult');
    const confidenceResult = document.getElementById('confidenceResult');
    
    // IMPORTANT: Replace with your actual Elastic Beanstalk CNAME
    const API_ENDPOINT = 'https://Aidetector-env.eba-ugfn7pg2.us-west-2.elasticbeanstalk.com/predict';

    // Preview the selected image
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

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
        .then(response => response.json())
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
});

