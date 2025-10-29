# Smart Travel & Inventory Analytics Dashboard

A comprehensive web-based dashboard system that provides real-time analytics, report generation, and alerts for travel booking and inventory management systems.

## Features

- **Real-time Analytics**: Live KPI monitoring with automatic data updates
- **Dual Mode Support**: Switch between Travel and Inventory analytics
- **Interactive Charts**: Custom-built line and bar charts with hover effects
- **Alert System**: Real-time notifications with acknowledgment capabilities
- **Report Generation**: Customizable reports with date range and metric selection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **AI-Powered Insights**: Intelligent recommendations for optimization

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or extract the project**
   ```bash
   cd smart-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── AlertPanel.tsx   # Alert notification system
│   ├── Chart.tsx        # Custom chart component
│   ├── KPICard.tsx      # KPI metric cards
│   ├── ReportGenerator.tsx # Report generation
│   └── Sidebar.tsx      # Navigation sidebar
├── hooks/               # Custom React hooks
│   └── useDashboardData.ts # Data management hook
├── types/               # TypeScript type definitions
│   └── dashboard.ts     # Dashboard-related types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Usage

### Dashboard Modes

The dashboard supports two primary modes:

1. **Travel Mode**: Analytics for airline booking systems
   - Booking trends and revenue tracking
   - Load factor and customer satisfaction metrics
   - Route performance analysis

2. **Inventory Mode**: Analytics for inventory management
   - Stock level monitoring and turnover rates
   - Low stock alerts and supplier performance
   - Cost analysis and demand forecasting

### Key Components

#### KPI Cards
- Real-time metric display with trend indicators
- Color-coded status indicators
- Hover animations and micro-interactions

#### Interactive Charts
- Custom-built line and bar charts
- Real-time data updates
- Responsive design with proper scaling

#### Alert System
- Real-time notifications for critical events
- Acknowledgment functionality
- Categorized by severity (success, warning, error, info)

#### Report Generator
- Customizable date ranges
- Metric selection for targeted reports
- Export functionality (JSON format)

## Customization

### Adding New Metrics

1. Update the `KPIMetric` interface in `src/types/dashboard.ts`
2. Modify the data generation in `src/hooks/useDashboardData.ts`
3. Add corresponding icons and colors

### Styling Modifications

The project uses Tailwind CSS for styling. Key design tokens:

- **Primary Colors**: Blue (#3B82F6), Emerald (#10B981)
- **Status Colors**: Amber (#F59E0B), Red (#EF4444)
- **Spacing**: 8px base unit system
- **Typography**: System font stack with proper hierarchy

### Chart Customization

Charts are built with HTML5 Canvas for optimal performance:

- Modify `src/components/Chart.tsx` for visual changes
- Update data structures in the dashboard hook
- Add new chart types by extending the Chart component

## Production Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Traditional Hosting**: Apache, Nginx

### Environment Configuration

For production deployments, consider:

- API endpoint configuration
- Authentication integration
- Real database connections
- Performance monitoring

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading for optimal initial load times
- Efficient re-rendering with React hooks
- Canvas-based charts for smooth animations
- Responsive images and optimized assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please refer to the documentation or create an issue in the project repository.
deploy: https://travel-inventory.vercel.app/
