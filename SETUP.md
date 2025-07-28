# Setup Instructions

## System Requirements

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Operating System**: Windows 10+, macOS 10.15+, or Linux

## Step-by-Step Setup

### 1. Verify Prerequisites

Check if you have Node.js installed:
```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Project Setup

Extract the project files to your desired location:
```bash
cd /path/to/your/projects/smart-analytics-dashboard
```

### 3. Install Dependencies

Run the following command in the project root:
```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)
- ESLint (code linting)

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Verify Installation

You should see:
- A modern dashboard interface
- KPI cards with sample data
- Interactive charts
- Sidebar navigation
- Alert notifications

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# If port 5173 is busy, Vite will automatically use the next available port
# Check the terminal output for the actual URL
```

**Node Version Issues**
```bash
# Update Node.js to the latest LTS version
# Clear npm cache if needed
npm cache clean --force
```

**Permission Errors (macOS/Linux)**
```bash
# If you encounter permission errors, avoid using sudo
# Instead, configure npm to use a different directory
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

**Windows Path Issues**
```bash
# Ensure your PATH includes Node.js
# Restart your terminal after Node.js installation
```

### Development Tips

1. **Hot Reload**: The development server supports hot reload - changes will appear instantly
2. **TypeScript**: The project uses TypeScript for better development experience
3. **Linting**: Run `npm run lint` to check code quality
4. **Building**: Use `npm run build` to create production files

## Next Steps

1. **Explore the Code**: Start with `src/App.tsx` to understand the structure
2. **Customize Data**: Modify `src/hooks/useDashboardData.ts` for your data sources
3. **Styling**: Update Tailwind classes or add custom CSS
4. **Integration**: Connect to your actual backend APIs

## Production Deployment

When ready to deploy:

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your server to serve the `index.html` for all routes
4. Set up environment variables for production

## Getting Help

- Check the README.md for detailed documentation
- Review the code comments for implementation details
- TypeScript will help catch errors during development
- Use browser developer tools for debugging