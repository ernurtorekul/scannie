document.addEventListener('DOMContentLoaded', function () {
    // qr scanner
    const scanner = new Instascan.Scanner({ video: document.getElementById('scanner-video') });

    scanner.addListener('scan', function (content) {
        document.getElementById('result').innerText = content;
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found !');
        }
    }).catch(function (e) {
        console.error(e);
    });

    // qr generator
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');

    generateBtn.addEventListener('click', function () {
        const textInput = document.getElementById('text-input').value;
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';

        if (textInput) {
            const qrcode = new QRCode(qrcodeContainer, textInput);

            downloadBtn.disabled = false;

            downloadBtn.addEventListener('click', function () {
                const imageDataUrl = qrcodeContainer.querySelector('img').src;
                const downloadLink = document.createElement('a');
                downloadLink.href = imageDataUrl;
                downloadLink.download = 'qrcode.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        } else {
            alert('Please enter your data');
        }
    });
});