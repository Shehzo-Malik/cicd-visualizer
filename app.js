const triggerBtn = document.getElementById('trigger-btn');
const terminalLogs = document.getElementById('terminal-logs');
const pipelineStatusText = document.getElementById('pipeline-status-text');

const stages = [
    { id: 'stage-1', name: 'Source / Git', log: '[GIT] Cloning repository from GitHub (main branch)...\n[GIT] Latest commit hash: a7f8b92 - "Updated pipeline config"' },
    { id: 'stage-2', name: 'Build & Maven', log: '[MAVEN] Cleaning target directory...\n[MAVEN] Compiling 24 source files...\n[INFO] Build success! JAR file generated.' },
    { id: 'stage-3', name: 'Selenium Tests', log: '[SELENIUM] Initializing headless Chrome driver...\n[TEST] Running 14 integration test suites...\n[SUCCESS] All 14 tests passed successfully (0 failures).' },
    { id: 'stage-4', name: 'AWS Deploy', log: '[AWS] Authenticating with AWS IAM credentials...\n[AWS S3] Uploading build artifacts to bucket: wanderlust-prod-storage...\n[SUCCESS] Deployment complete! Live URL active.' }
];

triggerBtn.addEventListener('click', async function() {
    triggerBtn.disabled = true;
    terminalLogs.innerHTML = '[INFO] Pipeline triggered by Shehzal Malik...\n';
    pipelineStatusText.innerText = 'Status: RUNNING';
    pipelineStatusText.className = 'running';

    // Reset all stages to pending
    stages.forEach(stage => {
        const badge = document.querySelector(`#${stage.id} .status-badge`);
        badge.innerText = 'Pending';
        badge.className = 'status-badge pending';
    });

    for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        const cardBadge = document.querySelector(`#${stage.id} .status-badge`);
        
        // Set current stage to running
        cardBadge.innerText = 'Running...';
        cardBadge.className = 'status-badge running';
        
        terminalLogs.innerHTML += `\n----------------------------------------\n[STAGE] Starting ${stage.name}...\n`;
        
        // Simulate execution delay (1.5 seconds per stage)
        await delay(1500);

        terminalLogs.innerHTML += stage.log + '\n';
        terminalLogs.scrollTop = terminalLogs.scrollHeight;

        // Set current stage to success
        cardBadge.innerText = 'Success';
        cardBadge.className = 'status-badge success';
    }

    terminalLogs.innerHTML += `\n[PIPELINE] 🎉 All stages completed successfully! Application deployed.\n`;
    pipelineStatusText.innerText = 'Status: SUCCESS';
    pipelineStatusText.className = 'success';
    triggerBtn.disabled = false;
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}