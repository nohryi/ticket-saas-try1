#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building the application..."
npm run build

# Create a deployment directory
echo "📁 Creating deployment directory..."
rm -rf deploy
mkdir deploy

# Copy necessary files
echo "📋 Copying files..."
cp -r .next deploy/
cp -r public deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp next.config.mjs deploy/

# Create a production start script
echo "⚙️ Creating start script..."
cat > deploy/start.sh << 'EOL'
#!/bin/bash
npm ci --production
npm start
EOL
chmod +x deploy/start.sh

echo "✅ Build complete! Your deployment files are in the 'deploy' directory."
echo "To deploy:"
echo "1. Copy the contents of the 'deploy' directory to your hosting service"
echo "2. Set the environment variables (NEXT_PUBLIC_API_URL)"
echo "3. Run 'npm ci --production' to install dependencies"
echo "4. Run 'npm start' to start the server" 