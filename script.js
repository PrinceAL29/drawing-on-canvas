function draw() {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth * 0.98;
    canvas.height = window.innerHeight * 0.92;

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const numberPic = document.getElementById("number")
        const saveBtn = document.getElementById("save")
        const clearBtn = document.getElementById("clear")
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        clearBtn.addEventListener("click", () => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        })

        saveBtn.addEventListener("click", () => {
            let image = canvas.toDataURL()
            let downloade = document.createElement("a")
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.-]/g, ""); // Remove special characters
            const fileName = `image_${timestamp}.jpg`;
            downloade.download = fileName
            downloade.href = image
            downloade.click()
        })

        numberPic.addEventListener('input', () => {
            ctx.lineWidth = numberPic.value;
        })
        const colorPic = document.getElementById("color")
        colorPic.addEventListener('input', () => {
            ctx.strokeStyle = colorPic.value;
        })
        let isDrawing = false
        let lastX = 0
        let lastY = 0

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true
            lastX = e.offsetX
            lastY = e.offsetY

            ctx.beginPath()
            ctx.moveTo(lastX, lastY)
        })

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return

            const currentX = e.offsetX
            const currentY = e.offsetY

            ctx.lineTo(currentX, currentY)
            ctx.stroke()

            lastX = currentX
            lastY = currentY
        })

        canvas.addEventListener('mouseup', () => {
            isDrawing = false
        })
        canvas.addEventListener('mouseleave', () => {
            isDrawing = false
        })
    }
}

draw();
