# PowerShell install script: installs node modules and copies .env
Write-Host "Installing dependencies..."
npm install

if (-not (Test-Path -Path .env)) {
    Write-Host "Creating .env from .env.example"
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Skipping copy."
}

Write-Host "Installation complete. Run 'npm run dev' to start the dev server."
