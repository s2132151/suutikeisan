document.getElementById('startBtn').addEventListener('click', runSimulation);

function runSimulation() {
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    const tolerance = 1e-6;
    const maxIterations = 100;

    const bisectionResult = bisectionMethod(1, 2, tolerance, maxIterations);
    const newtonResult = newtonMethod(initialValue, tolerance, maxIterations);

    drawGraph(bisectionResult, newtonResult);
}

function bisectionMethod(a, b, tol, maxIter) {
    let results = [];
    for (let i = 0; i < maxIter; i++) {
        let m = (a + b) / 2;
        results.push(m);
        if (Math.abs(f(m)) < tol) break;
        if (f(a) * f(m) < 0) b = m;
        else a = m;
    }
    return results;
}

function newtonMethod(x0, tol, maxIter) {
    let results = [];
    let x = x0;
    for (let i = 0; i < maxIter; i++) {
        results.push(x);
        const fx = f(x);
        const dfx = df(x);
        if (Math.abs(fx) < tol) break;
        x = x - fx / dfx;
    }
    return results;
}

function f(x) {
    return Math.pow(x, 3) - x - 2;
}

function df(x) {
    return 3 * Math.pow(x, 2) - 1;
}


function drawGraph(bisectionData, newtonData) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.9);
    ctx.lineTo(width * 0.9, height * 0.9);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.9);
    ctx.lineTo(width * 0.1, height * 0.1);
    ctx.stroke();

    drawMethod(ctx, bisectionData, 'blue');
    drawMethod(ctx, newtonData, 'red');
}

function drawMethod(ctx, data, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        const x = 0.1 * ctx.canvas.width + 0.8 * ctx.canvas.width * (data[i] / 2);
        const y = 0.9 * ctx.canvas.height - 0.8 * ctx.canvas.height * (i / data.length);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}


function animateMethod(ctx, data, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    let i = 0;
    function animate() {
        if (i >= data.length) return;
        const x = 0.1 * ctx.canvas.width + 0.8 * ctx.canvas.width * (data[i] / 2);
        const y = 0.9 * ctx.canvas.height - 0.8 * ctx.canvas.height * (i / data.length);
        ctx.lineTo(x, y);
        ctx.stroke();
        i++;
        requestAnimationFrame(animate);
    }
    animate();
}

function drawGraph(bisectionData, newtonData) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.9);
    ctx.lineTo(width * 0.9, height * 0.9);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.9);
    ctx.lineTo(width * 0.1, height * 0.1);
    ctx.stroke();

    animateMethod(ctx, bisectionData, 'blue');
    animateMethod(ctx, newtonData, 'red');
}
