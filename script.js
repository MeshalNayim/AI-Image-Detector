document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const predictBtn = document.getElementById('predictBtn');
    const predictionResult = document.getElementById('predictionResult');
    const confidenceResult = document.getElementById('confidenceResult');
    
    // IMPORTANT: Replace with your actual API Gateway URL from AWS
    const API_ENDPOINT = 'https://z0zc61prpb.execute-api.us-east-2.amazonaws.com/prod';

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

        // Fetch API to send the image to your backend
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
            alert('Failed to connect to the API.');
        });
    });

});

